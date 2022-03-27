<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Movie;
use App\Models\Rental;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            return response([
                'status' => 'failed',
                'message' => 'Film do którego chcesz dodać opinię nie istnieje!'
            ]);
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
                    error_log('VEIFIED!');
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

        if(count($reviews) === 0) {
            return response([
                'status' => 'error',
                'message' => 'Nie znaleziono żadnych wyników'
            ], 404);
        }

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
    public function deleteReview($reviewId) {

        $user = auth()->user();

        $review = Review::find($reviewId)->first();

        //* Check if current review is the auth user review or if user isn't admin
        if($review->user_id !== $user->id && $user->role !== 'administrator') {
            return response([
                'status' => 'error',
                'message' => 'Możesz usuwać tylko własne opinie użytkowniku!'
            ]);
        }
        

        $review = Review::destroy($reviewId);

        if(!$review) {
            return response([
                'status' => 'error',
                'message' => 'Film o podanym ID nie istnieje'
            ],404);
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
            return response([
                'status' => 'failed',
                'message' => 'Nie znaleziono użytkownika'
            ]);
        }

        $reviews = Review::where('user_id', '=', $userId)->get();

        if(count($reviews) === 0) {
            return response([
                'status' => 'failed',
                'message' => 'Nie znaleziono żadnych opinii.'
            ], 404);
        }

        return response([
            'status' => 'success',
            'results' => count($reviews),
            'data' => [
                $reviews
            ]
        ]);
    }
}
