-- Typed models for the Typeform SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Form
---@field created_at? string
---@field fields? table
---@field id? string
---@field last_updated_at? string
---@field links? table
---@field published_at? string
---@field settings? table
---@field theme? table
---@field title? string
---@field type? string
---@field workspace? table

---@class FormLoadMatch
---@field id string

---@class FormListMatch
---@field created_at? string
---@field fields? table
---@field id? string
---@field last_updated_at? string
---@field links? table
---@field published_at? string
---@field settings? table
---@field theme? table
---@field title? string
---@field type? string
---@field workspace? table

---@class FormCreateData
---@field created_at? string
---@field fields? table
---@field id? string
---@field last_updated_at? string
---@field links? table
---@field published_at? string
---@field settings? table
---@field theme? table
---@field title? string
---@field type? string
---@field workspace? table

---@class FormUpdateData
---@field id string
---@field created_at? string
---@field fields? table
---@field last_updated_at? string
---@field links? table
---@field published_at? string
---@field settings? table
---@field theme? table
---@field title? string
---@field type? string
---@field workspace? table

---@class FormRemoveMatch
---@field id string

local M = {}

return M
