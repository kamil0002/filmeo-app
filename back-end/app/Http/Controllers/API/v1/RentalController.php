<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Movie;
use App\Models\Rental;
use App\Models\User;
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
        // $user = auth()->user();
        $user = User::find($userId);

        $currentTime = time();

        $to = date('Y-m-d H:m:s', $currentTime + 1 * 48 * 60 * 60);
        
        $rental = Rental::create([
            'user_id' => $user->id,
            'expire_date' => $to,
            'cost' => $movie->cost
        ]);

        $rental->movies()->attach($movie);

        return response([
            'status' => 'success',
            'message' => 'Film został wypożyczony. Miłego oglądania!' ,
            'data' => [
                $rental
            ]
        ],201);
    }
}