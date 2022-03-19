<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChatController;
use App\Http\Controllers\StripeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//* Global routes
Route::post('/message', [ChatController::class, 'message']);

Route::post('/register', [AuthController::class, 'register']);

Route::get('/getSession', [StripeController::class, 'getSession']);


//* Proteced routes
Route::group(['middleware' => ['auth:sanctum']],
function () {});
