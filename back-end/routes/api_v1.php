<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\v1\ChatController;
use App\Http\Controllers\API\v1\StripeController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\GenreController;
use App\Http\Controllers\API\v1\ImageController;
use App\Http\Controllers\API\v1\MovieController;
use App\Http\Middleware\CheckStatus;
use Illuminate\Support\Facades\File;

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

Route::get('/users', [UserController::class, 'getAllUsers']);


//* Payments with Stripe
Route::get('/getSession/{movieId}', [StripeController::class, 'getSession']);

//* Authentication

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


//*Upload Photo
Route::post('/uploadAvatar', [ImageController::class, 'uploadAvatar']);

//* Movie
Route::post('/movies', [MovieController::class, 'createMovie']);
Route::get('/movies', [MovieController::class, 'getAllMovies']);
Route::get('/movies/{movieId}', [MovieController::class, 'getMovie']);
Route::put('/movies/{movieId}', [MovieController::class, 'updateMovie']);
Route::delete('/movies/{movieId}', [MovieController::class, 'deleteMovie']);
Route::get('/movies/search/{filterText}', [MovieController::class, 'filterMovies']);

//* Genre
Route::post('/genres', [GenreController::class, 'createGenre']);
Route::get('/genres', [GenreController::class, 'getAllGenres']);
Route::get('/genres/{genreId}', [GenreController::class, 'getGenre']);



//* Proteced routes
Route::group(['middleware' => ['auth:sanctum']], function () {
  //* User Routes
  Route::post('/logout', [AuthController::class, 'logout']);


  //* Update User
  Route::put('/updateMyPassword/{userId}', [AuthController::class, 'updateMyPassword']);
  Route::put('/updateProfile/{userId}', [UserController::class, 'updateUserData']);
});
