package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/typeform-sdk/go"
	"github.com/voxgig-sdk/typeform-sdk/go/core"

	vs "github.com/voxgig-sdk/typeform-sdk/go/utility/struct"
)

func TestFormEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Form(nil)
		if ent == nil {
			t.Fatal("expected non-nil FormEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"form": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Form(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Form(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := formBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "form." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set TYPEFORM_TEST_FORM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		formRef01Ent := client.Form(nil)
		formRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "form"}, setup.data), "form_ref01"))

		formRef01DataResult, err := formRef01Ent.Create(formRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		formRef01Data = core.ToMapAny(entityData(formRef01DataResult))
		if formRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if formRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		formRef01Match := map[string]any{}

		formRef01ListResult, err := formRef01Ent.List(formRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		formRef01List, formRef01ListOk := formRef01ListResult.([]any)
		if !formRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", formRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(formRef01List), map[string]any{"id": formRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		formRef01DataUp0Up := map[string]any{
			"id": formRef01Data["id"],
		}

		formRef01MarkdefUp0Name := "created_at"
		formRef01MarkdefUp0Value := fmt.Sprintf("Mark01-form_ref01_%d", setup.now)
		formRef01DataUp0Up[formRef01MarkdefUp0Name] = formRef01MarkdefUp0Value

		formRef01ResdataUp0Result, err := formRef01Ent.Update(formRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		formRef01ResdataUp0 := core.ToMapAny(entityData(formRef01ResdataUp0Result))
		if formRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if formRef01ResdataUp0["id"] != formRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if formRef01ResdataUp0[formRef01MarkdefUp0Name] != formRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", formRef01MarkdefUp0Name, formRef01ResdataUp0[formRef01MarkdefUp0Name])
		}

		// LOAD
		formRef01MatchDt0 := map[string]any{
			"id": formRef01Data["id"],
		}
		formRef01DataDt0Loaded, err := formRef01Ent.Load(formRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		formRef01DataDt0LoadResult := core.ToMapAny(entityData(formRef01DataDt0Loaded))
		if formRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if formRef01DataDt0LoadResult["id"] != formRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		formRef01MatchRm0 := map[string]any{
			"id": formRef01Data["id"],
		}
		_, err = formRef01Ent.Remove(formRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		formRef01MatchRt0 := map[string]any{}

		formRef01ListRt0Result, err := formRef01Ent.List(formRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		formRef01ListRt0, formRef01ListRt0Ok := formRef01ListRt0Result.([]any)
		if !formRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", formRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(formRef01ListRt0), map[string]any{"id": formRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func formBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "form", "FormTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read form test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse form test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"form01", "form02", "form03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("TYPEFORM_TEST_FORM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TYPEFORM_TEST_FORM_ENTID": idmap,
		"TYPEFORM_TEST_LIVE":      "FALSE",
		"TYPEFORM_TEST_EXPLAIN":   "FALSE",
		"TYPEFORM_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["TYPEFORM_TEST_FORM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TYPEFORM_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["TYPEFORM_APIKEY"],
			},
			extra,
		})
		client = sdk.NewTypeformSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TYPEFORM_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TYPEFORM_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
