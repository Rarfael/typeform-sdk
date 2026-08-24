<?php
declare(strict_types=1);

// Typeform SDK utility: prepare_body

class TypeformPrepareBody
{
    public static function call(TypeformContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
