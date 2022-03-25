<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Movie;
use App\Models\Rental;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;

class RentalController extends Controller
{
    function getCheckoutSession(int $movieId) {

        $movie = Movie::find($movieId);;

        $stripe = new \Stripe\StripeClient(env('STRIPE_API_KEY'));

        $session = $stripe->checkout->sessions->create([
        'payment_method_types' => ['card'],
        'mode' => 'payment',
        'success_url' => 'http://localhost:3000/film/Uncharted-payment_success?user='.$movie->id.'&movie='.$movie->id,
        'cancel_url' => 'http://localhost:3000/filmy/'.$movie->slug.'payment_failed',
        'customer_email' => 'kamil@example.com',
        'line_items' => [[
            # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
            'price_data' => [
                'currency' => 'pln',
                'unit_amount' => $movie->cost * 100,
                'product_data' => [
                    'name' => $movie->title,
                    'images' => ['https://www.thewrap.com/wp-content/uploads/2022/01/The-Batman-Poster-Bat-and-Cat-1024x1024.jpg'],
                    'description' => $movie->short_description,
                ],
            ],
            'quantity' => 1
        ]],
        ]);


        return $session;
    }

    public function rentMovie(int $movieId, int $userId) {
        
        $movie = Movie::find($movieId);

        //TODO Later get auth user
        // $user = auth()->user();
        $user = User::find($userId);

        //* Check if current movie is owned by a user
        $rentals = Rental::where('user_id', '=', $userId)->with('movies')->get();

        foreach($rentals as $rental) {
            foreach($rental->movies as $rentedMovie) {
                if($rentedMovie->id === $movieId) {
                    return response([
                        'status' => 'fail',
                        'message' => 'Ten film jest już przez Ciebie wypożyczony!'
                    ]);
                }
            }
        }

        $currentTime = time();
        $rentedTo = date('Y-m-d H:m:s', $currentTime + 1 * 48 * 60 * 60);
        
        $rental = Rental::create([
            'user_id' => $user->id,
            'expire_date' => $rentedTo,
            'cost' => $movie->cost,
            'active' => true
        ]);

        $rental->movies()->attach($movie);

        return response([
            'status' => 'success',
            'message' => 'Film został wypożyczony. Miłego oglądania!' ,
            'data' => [
                $rentals
            ]
        ],201);
    }

    public function renewRental(int $rentalId) {

        //TODO Later get auth user
        // $user = auth()->user();

        $rental = Rental::where('id', '=', $rentalId)->first();
        
        if(!$rental) 
            return response([
            'status' => 'error',
            'message' => 'Ten film nie został przez Ciebie wcześniej wypożyczony'
        ], 404);

        $currentTime = time();
        $rentedTo = date('Y-m-d H:m:s', $currentTime + 1 * 48 * 60 * 60);
        
        if(!$rental->active) {
            $rental->update([
                'active' => true,
                'expire_date' => $rentedTo
            ]);
        }

        return [
            'status' => 'success',
            'rental' => [
                $rental
            ]
        ];
    }


    public function getUserMovies(int $userId) {

        $movies = Movie::whereHas('rentals')->with('rentals')->get();
        $userMovies = [];

        $today = date('Y-m-d H:m:s');

        foreach($movies as $movie) {
            foreach($movie->rentals as $rental) {

                //* If rental expired make active status as false
                if($rental->expire_date < $today) {
                    $rental->update([
                        'active' => false
                    ]);
                }    
                //* Check all user rented movies
                if($rental->user_id === $userId) {
                $movie = Movie::find($movie->id);

                //* Add bonus field if movie is not active or not
                $movie['active'] = $rental->active;
                array_push($userMovies, $movie);
                break;
                }
            }
        }
        
        return [
            'status' => 'success',
            'results' => count($userMovies),
            'data' => [
                $userMovies
            ], 201
        ];
    }
}