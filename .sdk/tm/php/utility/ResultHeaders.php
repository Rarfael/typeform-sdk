<?php
declare(strict_types=1);

// Typeform SDK utility: result_headers

class TypeformResultHeaders
{
    public static function call(TypeformContext $ctx): ?TypeformResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
