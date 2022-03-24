<?php

use App\Http\Controllers\API\v1\AdminController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\v1\ChatController;
use App\Http\Controllers\API\v1\StripeController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\GenreController;
use App\Http\Controllers\API\v1\ImageController;
use App\Http\Controllers\API\v1\MovieController;
use App\Http\Controllers\API\v1\RentalController;
use App\Http\Controllers\API\v1\ReviewController;

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
Route::get('/users/{userId}', [UserController::class, 'getUser']);


//* Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


//* Movie
Route::post('/movies', [MovieController::class, 'createMovie']);
Route::get('/movies', [MovieController::class, 'getAllMovies']);
Route::get('/movies/{movieId}', [MovieController::class, 'getMovie']);
Route::put('/movies/{movieId}', [MovieController::class, 'updateMovie']);
Route::get('/movies/search/{filterText}', [MovieController::class, 'filterMovies']);

Route::get('/movies/genre/{genre}', [MovieController::class, 'getMoviesByGenre']);

//* Genre
Route::post('/genres', [GenreController::class, 'createGenre']);
Route::get('/genres', [GenreController::class, 'getAllGenres']);
Route::get('/genres/{genreId}', [GenreController::class, 'getGenre']);

//* Get Messages
Route::get('/getMessages', [ChatController::class, 'getMessages']);

//* Reviews
Route::get('/reviews', [ReviewController::class, 'getAllReviews']);
Route::get('/reviews{reviewId}', [ReviewController::class, 'getReview']);

//* Payments with Stripe
Route::get('/getSession/{movieId}', [RentalController::class, 'getCheckoutSession']);
Route::get('/rentMovie/{movieId}/{userId}', [RentalController::class, 'rentMovie']);



//* Proteced routes
Route::group(['middleware' => ['auth:sanctum']], function () {
  //* User Routes
  Route::post('/logout', [AuthController::class, 'logout']);

  //* Update User
  Route::put('/updateMyPassword', [AuthController::class, 'updateMyPassword']);
  Route::put('/updateMyProfile', [UserController::class, 'updateUserData']);

  //*Upload Photo
  Route::post('/uploadAvatar', [ImageController::class, 'uploadAvatar']);

  //* Messages
  Route::post('/message', [ChatController::class, 'sendMessage']);

  //* Review
  Route::post('/reviews/{movieId}', [ReviewController::class, 'createReview']);

  Route::delete('/reviews/{reviewId}', [ReviewController::class, 'deleteReview']);

  
  //* Admin func
  Route::middleware('restrictToAdmin')->group(function() {
    Route::post('/user/reviews', [ReviewController::class, 'getAllUserReviews']);
    Route::delete('/movies/{movieId}', [MovieController::class, 'deleteMovie']);
    Route::get('/admin/ban/{userId}', [AdminController::class, 'banUser']);
    Route::get('/admin/unban/{userId}', [AdminController::class, 'unbanUser']);
  });

    Route::middleware('restrictToModerator')->group(function() {
    Route::get('/admin/unmute/{userId}', [AdminController::class, 'unmuteUser']);
    Route::get('/admin/mute/{userId}', [AdminController::class, 'muteUser']);
  });
  
});
