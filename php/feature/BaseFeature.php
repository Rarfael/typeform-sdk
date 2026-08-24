<?php
declare(strict_types=1);

// Typeform SDK base feature

class TypeformBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TypeformContext $ctx, array $options): void {}
    public function PostConstruct(TypeformContext $ctx): void {}
    public function PostConstructEntity(TypeformContext $ctx): void {}
    public function SetData(TypeformContext $ctx): void {}
    public function GetData(TypeformContext $ctx): void {}
    public function GetMatch(TypeformContext $ctx): void {}
    public function SetMatch(TypeformContext $ctx): void {}
    public function PrePoint(TypeformContext $ctx): void {}
    public function PreSpec(TypeformContext $ctx): void {}
    public function PreRequest(TypeformContext $ctx): void {}
    public function PreResponse(TypeformContext $ctx): void {}
    public function PreResult(TypeformContext $ctx): void {}
    public function PreDone(TypeformContext $ctx): void {}
    public function PreUnexpected(TypeformContext $ctx): void {}
}
