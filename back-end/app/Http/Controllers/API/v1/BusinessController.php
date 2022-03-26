<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BusinessController extends Controller
{
    public function getUserBaseStats() {
        $user = auth()->user();
        $spentMoney = Payment::where('user_id', '=', $user->id)->select('amount')->sum('amount');

        return response([
            'payments' => $spentMoney
        ]);
    }
}
