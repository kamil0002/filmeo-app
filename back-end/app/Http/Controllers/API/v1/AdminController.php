<?php

namespace App\Http\Controllers\API\v1;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function banUser($userId) {
        $user = User::find($userId);

        $user->update([
            'banned' => true
        ]);

        return response([
            'status' => 'success',
            'message' => 'Użytkownik '.$user->name.' został zbanowany'
        ]);
    }

    public function muteUser($userId) {
        $user = User::find($userId);

        $user->update([
            'muted' => true
        ]);

        return response([
            'status' => 'success',
            'message' => 'Użytkownik '.$user->name.' został zmutowany'
        ]);
    }

    public function unbanUser($userId) {
        $user = User::find($userId);

        $user->update([
            'banned' => false
        ]);

        return response([
            'status' => 'success',
            'message' => 'Użytkownik '.$user->name.' został odbanowany'
        ]);
    }

        public function unmuteUser($userId) {
        $user = User::find($userId);

        $user->update([
            'muted' => false
        ]);

        return response([
            'status' => 'success',
            'message' => 'Użytkownik '.$user->name.' został odmutowany'
        ]);
    }
}
