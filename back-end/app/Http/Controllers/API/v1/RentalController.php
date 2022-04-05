<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Movie;
use App\Models\Payment;
use App\Models\Rental;

use App\Http\Controllers\API\v1\ErrorController;
use App\Models\Review;

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
                    return ErrorController::handleError('Ten film jest już przez Ciebie wypożyczony!', 400, 'failed');

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
        
        if(!$rental) {
            return ErrorController::handleError('Ten film nie został przez Ciebie wcześniej wypożyczony', 400, 'failed');
        }


        if($userId !== $rental->user_id) {
            return ErrorController::handleError('Ten film nie należy do Ciebie!', 400);
        }

        if($rental->active) {
            return ErrorController::handleError('Aktualnie posiadasz już ten film w swojej kolekcji, odnów go po czasie wygaśnięcia.', 400, 'failed');

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
                $reviews = Review::where('movie_id', '=', $movie->id)->select('rating')->get();

                $movie->expire_date = $rental->expire_date;

                $movie['rating_average'] = floatval(floor($reviews->avg('rating')) . substr(str_replace(floor($reviews->avg('rating')), '', $reviews->avg('rating')), 0, 2 + 1)) ?? 0;

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