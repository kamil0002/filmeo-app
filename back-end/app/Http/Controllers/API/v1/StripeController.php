<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;

class StripeController extends Controller
{
    function getSession(Request $request, $movieId)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_API_KEY'));

        $checkout_session = $stripe->checkout->sessions->create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
            'price_data' => [
                'currency' => 'pln',
                'unit_amount' => 500,
                'product_data' => [
                    'name' => 'Test Stripe Checkout',
                ]
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => 'http://localhost:3000',
        'cancel_url' => 'http://localhost:3000',
        ]);


        return $checkout_session;
    }
}
