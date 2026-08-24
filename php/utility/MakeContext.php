<?php
declare(strict_types=1);

// Typeform SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TypeformMakeContext
{
    public static function call(array $ctxmap, ?TypeformContext $basectx): TypeformContext
    {
        return new TypeformContext($ctxmap, $basectx);
    }
}
