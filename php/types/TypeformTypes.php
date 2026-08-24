<?php
declare(strict_types=1);

// Typed models for the Typeform SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Form entity data model. */
class Form
{
    public ?string $created_at = null;
    public ?array $fields = null;
    public ?string $id = null;
    public ?string $last_updated_at = null;
    public ?array $links = null;
    public ?string $published_at = null;
    public ?array $settings = null;
    public ?array $theme = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?array $workspace = null;
}

/** Request payload for Form#load. */
class FormLoadMatch
{
    public string $id;
}

/** Request payload for Form#list. */
class FormListMatch
{
    public ?string $created_at = null;
    public ?array $fields = null;
    public ?string $id = null;
    public ?string $last_updated_at = null;
    public ?array $links = null;
    public ?string $published_at = null;
    public ?array $settings = null;
    public ?array $theme = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?array $workspace = null;
}

/** Request payload for Form#create. */
class FormCreateData
{
    public ?string $created_at = null;
    public ?array $fields = null;
    public ?string $id = null;
    public ?string $last_updated_at = null;
    public ?array $links = null;
    public ?string $published_at = null;
    public ?array $settings = null;
    public ?array $theme = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?array $workspace = null;
}

/** Request payload for Form#update. */
class FormUpdateData
{
    public string $id;
    public ?string $created_at = null;
    public ?array $fields = null;
    public ?string $last_updated_at = null;
    public ?array $links = null;
    public ?string $published_at = null;
    public ?array $settings = null;
    public ?array $theme = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?array $workspace = null;
}

/** Request payload for Form#remove. */
class FormRemoveMatch
{
    public string $id;
}

