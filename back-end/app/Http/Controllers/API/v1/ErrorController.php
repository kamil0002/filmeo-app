<?php

namespace App\Http\Controllers\API\v1;


class ErrorController extends Controller
{
    public static function handleError(string $errorMsg, int $statusCode, string $status = 'error') {
        return response([
                'status' => $status,
                'message' => $errorMsg
            ], $statusCode);
    }
}
