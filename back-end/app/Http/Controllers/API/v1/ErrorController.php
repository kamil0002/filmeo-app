<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Support\Facades\Response;

class ErrorController extends Controller
{
    public static function handleError(string $errorMsg, int $statusCode, string $status = 'error') {
        return Response::json([
                'status' => $status,
                'message' => $errorMsg
            ])->status($statusCode);
    }
}
