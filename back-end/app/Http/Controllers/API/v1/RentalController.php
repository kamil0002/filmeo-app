<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Movie;
use App\Models\Payment;
use App\Models\Rental;


class RentalController extends Controller
{    
    /**
     * getCheckoutSession
     *
     * @param  mixed $movieId id filmu
     * @return object sesja transakcji
     */
    public function getCheckoutSession(int $movieId) {

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
    
    /**
     * rentMovie
     *
     * @param  mixed $movieId id filmu
     * @return json wiadomość z komunikatem
     */
    public function rentMovie(int $movieId) {
        
        $movie = Movie::find($movieId);

        //TODO Later get auth user
        $userId = auth()->user()->id;

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

        
        $rentedTo = date('Y-m-d H:i:s', strtotime('+48 hours'));
        
        $rental = Rental::create([
            'user_id' => $userId,
            'expire_date' => $rentedTo,
            'active' => true
        ]);

        Payment::create([
                'user_id' => $userId,
                'rental_id' => $rental->id,
                'amount' => $movie->cost,
            ]);

        $rental->movies()->attach($movie);

        return response([
            'status' => 'success',
            'message' => 'Film został wypożyczony. Miłego oglądania!' ,
        ],201);
    }

    
    /**
     * renewRental
     *
     * @param  mixed $rentalId id wypożyczenia
     * @param  mixed $movieId id filmu
     * @return json wiadomość z komunikatem
     */
    public function renewRental(int $rentalId, $movieId) {

        $userId = auth()->user()->id;

        $rental = Rental::where('id', '=', $rentalId)->first();

        $movieCost = Movie::find($movieId)->cost;
        
        if(!$rental) 
            return response([
            'status' => 'error',
            'message' => 'Ten film nie został przez Ciebie wcześniej wypożyczony'
        ], 404);

        if($userId !== $rental->user_id) {
            return  response([
                'status' => 'error',
                'message' => 'To wypożyczenie nie należy do Ciebie!'
            ],403);
        }

        if($rental->active) {
            return response([
                'status' => 'failed',
                'message' => 'Aktualnie posiadasz już ten film w swojej kolekcji, odnów go po czasie wygaśnięcia.'
            ]);
        }

        $rentedTo = date('Y-m-d H:i:s', strtotime('+48 hours'));
        
        if(!$rental->active) {
            $rental->update([
                'active' => true,
                'expire_date' => $rentedTo,
                'renewals_quantity' => $rental->renewals_quantity = $rental->renewals_quantity + 1
            ]);

            Payment::create([
                'user_id' => $userId,
                'rental_id' => $rental->id,
                'amount' => $movieCost,
            ]);
        }

        return [
            'status' => 'success',
            'message' => 'Status wypożyczenia został odnowiony. Miłego oglądania!'
        ];
    }

    
    /**
     * getUserMovies
     *
     * @return json ilość wyników, filmy użytkownika
     */
    public function getUserMovies() {

        $movies = Movie::whereHas('rentals')->with('rentals')->get();
        $userMovies = [];

        $userId = auth()->user()->id;

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
                $movie['rental_id'] = $rental->id;
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
            ]
        ];
    }
}