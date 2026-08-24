package voxgigtypeformsdk

import (
	"github.com/voxgig-sdk/typeform-sdk/go/core"
	"github.com/voxgig-sdk/typeform-sdk/go/entity"
	"github.com/voxgig-sdk/typeform-sdk/go/feature"
	_ "github.com/voxgig-sdk/typeform-sdk/go/utility"
)

// Type aliases preserve external API.
type TypeformSDK = core.TypeformSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TypeformEntity = core.TypeformEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TypeformError = core.TypeformError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewFormEntityFunc = func(client *core.TypeformSDK, entopts map[string]any) core.TypeformEntity {
		return entity.NewFormEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTypeformSDK = core.NewTypeformSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewTypeformSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *TypeformSDK  { return NewTypeformSDK(nil) }
func Test() *TypeformSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
