<?php
declare(strict_types=1);

// Typeform SDK utility: result_body

class TypeformResultBody
{
    public static function call(TypeformContext $ctx): ?TypeformResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
