<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\v1\ChatController;
use App\Http\Controllers\API\v1\StripeController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\GenreController;
use App\Http\Controllers\API\v1\ImageController;
use App\Http\Controllers\API\v1\MovieController;
use App\Http\Controllers\API\v1\ReviewController;
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


Route::get('/users', [UserController::class, 'getAllUsers']);


//* Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


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

//* Get Messages
Route::get('/getMessages', [ChatController::class, 'getMessages']);

//* Reviews
Route::get('/reviews', [ReviewController::class, 'getAllReviews']);
Route::get('/reviews{reviewId}', [ReviewController::class, 'getReview']);



//* Proteced routes
Route::group(['middleware' => ['auth:sanctum']], function () {
  //* User Routes
  Route::post('/logout', [AuthController::class, 'logout']);

  //* Update User
  Route::put('/updateMyPassword', [AuthController::class, 'updateMyPassword']);
  Route::put('/updateMyProfile', [UserController::class, 'updateUserData']);

  //*Upload Photo
  Route::post('/uploadAvatar', [ImageController::class, 'uploadAvatar']);

  //* Payments with Stripe
  Route::get('/getSession/{movieId}', [StripeController::class, 'getSession']);

  //* Messages
  Route::post('/message', [ChatController::class, 'sendMessage']);

  //* Review
  Route::post('/reviews/{movieId}', [ReviewController::class, 'createReview']);
});
