<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChatController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

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

//* Public
Route::post('/message', [ChatController::class, 'message']);

Route::post('/register', [AuthController::class, 'register']);

Route::get('/getSession/{movieId}', [StripeController::class, 'getSession']);

//* Register User

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);




//* Proteced routes
Route::group(['middleware' => ['auth:sanctum']], function () {
  //* User Routes
  Route::get('/users', [UserController::class, 'index']);
  Route::post('/logout', [AuthController::class, 'logout']);
});
