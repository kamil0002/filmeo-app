<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StripeController extends Controller
{
    function getSession(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_API_KEY'));

        $checkout_session = $stripe->checkout->sessions->create([
        'line_items' => [[
            # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
            'price_data' => [
                'currency' => 'usd',
                'unit_amount' => 500,
                'product_data' => [
                    'name' => 'Coll stripe checkout',
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
