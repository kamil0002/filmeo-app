<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Movie;
use App\Models\Rental;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\API\v1\ErrorController;


class ReviewController extends Controller
{
    
    /**
     * rules
     *
     * @return array walidacja dla recenzji filmu
     */
    private function rules() {
        return [
            'title' => 'required|string|min:3|max:30',
            'description' => 'required|string|min:20|max:100',
            'rating' => 'required|numeric|between:0,5',
            'user_id' => 'exists:users,id',
            'movie_id' => 'exists:movies,id',
        ];
    }
    
    /**
     * createReview
     *
     * @param  mixed $request
     * @param  mixed $movieId id filmu
     * @return json stworzoną opinię
     */
    public function createReview(Request $request, int $movieId) {

        $movie = Movie::find($movieId);

        if(!$movie) {
            return ErrorController::handleError('Film do którego chcesz dodać opinię nie istnieje!', 400, 'failed');
        }
        
        $validator = Validator::make($request->all(), $this->rules());

        if($validator->fails()) {
            return response()->json($validator->errors(),500);
        }

        $userId = auth()->user()->id;

        //* Check if current movie is owned by a user
        $rentals = Rental::where('user_id', '=', $userId)->with('movies')->get();
        $reviewVerified = false;

        foreach($rentals as $rental) {
            foreach($rental->movies as $rentedMovie) {
                if($rentedMovie->id === $movieId) {
                    $reviewVerified = true;
                    break 2;
                }
            }
        }

        $review = Review::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'rating' => $request['rating'],
            'user_id' => $userId,
            'movie_id' => $movieId,
            'verified' => $reviewVerified
        ]);


        $movie->update([
            'rating_quantity' => $movie->rating_quantity++
        ]);

        return response([
            'status' => 'success',
            'data' => [
                $review
            ]
        ],201);
    }
    
    /**
     * getMovieReviews
     *
     * @param  mixed $movieId id filmu
     * @return json wszystkie recenzje dla filmu o $movieId
     */
    public function getMovieReviews(int $movieId) {
        $reviews = Review::where('movie_id', '=', $movieId)->get();

        return response([
            'status' => 'success',
            'results' => count($reviews),
            'data' => [
                $reviews
            ]
        ]);
    }
    
    /**
     * deleteReview
     *
     * @param  mixed $reviewId id recenzji
     * @return void
     */
    public function deleteReview(int $reviewId) {

        $user = auth()->user();

        $review = Review::find($reviewId)->first();

        //* Check if current review is the auth user review or if user isn't admin
        if($review->user_id !== $user->id && $user->role !== 'administrator') {
            return ErrorController::handleError('Możesz usuwać tylko własne opinie użytkowniku!', 403);
        }
        

        $review = Review::destroy($reviewId);

        if(!$review) {
            return ErrorController::handleError('Film o podanym ID nie istnieje!', 404);
        }


        return response([
        'status' => 'success',
        'data' => [
            null
        ]
        ], 204);
    }
    
    /**
     * getMyReviews
     *
     * @return json recenzje użytkownika
     */
    public function getMyReviews() {

        $userId = auth()->user()->id;
        
        if(!$userId) {
            return ErrorController::handleError('Nie znaleziono użytkownika', 404, 'failed');
        }

        $reviews = Review::where('user_id', '=', $userId)->get();

        return response([
            'status' => 'success',
            'results' => count($reviews),
            'data' => [
                $reviews
            ]
        ]);
    }
}
