# Typed models for the Typeform SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Form(TypedDict, total=False):
    created_at: str
    fields: list
    id: str
    last_updated_at: str
    links: dict
    published_at: str
    settings: dict
    theme: dict
    title: str
    type: str
    workspace: dict


class FormLoadMatch(TypedDict):
    id: str


class FormListMatch(TypedDict, total=False):
    created_at: str
    fields: list
    id: str
    last_updated_at: str
    links: dict
    published_at: str
    settings: dict
    theme: dict
    title: str
    type: str
    workspace: dict


class FormCreateData(TypedDict, total=False):
    created_at: str
    fields: list
    id: str
    last_updated_at: str
    links: dict
    published_at: str
    settings: dict
    theme: dict
    title: str
    type: str
    workspace: dict


class FormUpdateDataRequired(TypedDict):
    id: str


class FormUpdateData(FormUpdateDataRequired, total=False):
    created_at: str
    fields: list
    last_updated_at: str
    links: dict
    published_at: str
    settings: dict
    theme: dict
    title: str
    type: str
    workspace: dict


class FormRemoveMatch(TypedDict):
    id: str
