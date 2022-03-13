<?php

namespace App\Http\Controllers;

use App\Events\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\CategoryRequest;
use Illuminate\Validation\Validator;

class ChatController extends Controller
{
    public function message(Request $request)
    {
        $msgFields = $request->validate([
            'username' => 'required|string',
            'message' => 'required|string'
        ]);

        event(new Message($msgFields['username'], $msgFields['message']));

    }
}