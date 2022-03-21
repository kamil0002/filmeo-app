<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChatController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\NewMovieNotificationController;
use App\Mail\WelcomeMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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


//* Payments with Stripe
Route::get('/getSession/{movieId}', [StripeController::class, 'getSession']);

//* Register User

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);


//* Movie
Route::post('/movies', [MovieController::class, 'createMovie']);
Route::get('/movies', [MovieController::class, 'getAllMovies']);
Route::get('/movies/{movieId}', [MovieController::class, 'getMovie']);
Route::put('/movies/{movieId}', [MovieController::class, 'updateMovie']);
Route::delete('/movies/{movieId}', [MovieController::class, 'deleteMovie']);
Route::get('/movies/search/{filterText}', [MovieController::class, 'filterMovies']);





//* Proteced routes
Route::group(['middleware' => ['auth:sanctum']], function () {
  //* User Routes
  Route::get('/users', [UserController::class, 'index']);
  Route::post('/logout', [AuthController::class, 'logout']);
});
