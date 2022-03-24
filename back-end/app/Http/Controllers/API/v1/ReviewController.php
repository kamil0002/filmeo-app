<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Movie;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{

    private function rules() {
        return [
            'title' => 'required|string|min:3|max:30',
            'description' => 'required|string|min:20|max:100',
            'rating' => 'required|numeric|between:0,5',
            'user_id' => 'exists:users,id',
            'movie_id' => 'exists:movies,id',
        ];
    }

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

        $review = Review::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'rating' => $request['rating'],
            'user_id' => $userId,
            'movie_id' => $movieId
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

    public function getAllReviews() {
        $reviews = Review::all();

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

    public function deleteReview($reviewId) {


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

    public function getAllUserReviews(Request $request) {

        $email = $request->validate(['email' => 'required|string']);

        $userId = User::where('email', '=', $email)->select('id')->first()->id;
        
        if(!$userId) {
            return response([
                'status' => 'failed',
                'message' => 'Nie znaleziono użytkownika'
            ]);
        }

        $reviews = Review::where('user_id', '=', $userId)->get();

        if(count($reviews) === 0) {
            return response([
                'status' => 'error',
                'message' => 'Nie znaleziono żadnych opinii dla podanego użytkownika'
            ]);
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
