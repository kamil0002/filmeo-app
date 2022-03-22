<?php

namespace App\Http\Controllers\API\v1;

use App\Events\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function message(Request $request)
    {
        $msgFields = $request->validate([
            'username' => 'required|string',
            'message' => 'required|string'
        ]);

        event(new Message($msgFields['username'], $msgFields['message']));

        return [];
    }
}