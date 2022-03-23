<?php

namespace App\Http\Controllers\API\v1;

use App\Events\Message as MessageEvent;
use App\Models\Message;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{

    private function rules() {
        return [
            'message' => 'required|string'
        ];
    }
    
    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules());

        if($validator->fails()) {
            return response([
                'status' => 'failed',
                'message' => 'Nie podano treści wiadomości'
            ]);
        }

        $userId = auth()->user()->id;

        Message::create([
            'user_id' => $userId,
            'message' => $request['message']
        ]);

        event(new MessageEvent($userId, $request['message']));

        return [];
    }

    public function getMessages() {

        $currentTime = time();

        $to = date('Y-m-d');
        $from = date('2022-03-22', $currentTime - 12 * 60 * 60);

        //* Get Messages From Last 12 hours
        $messages = Message::whereDate('created_at', '>=', $from)->whereDate('created_at', '<=', $to)
        ->with('user')->get();

        return response([
            'status' => 'success',
            'data' => [
                $messages
            ]
        ]);
    }
}