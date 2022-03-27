<?php

namespace App\Http\Controllers\API\v1;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function addModerator(Request $request) {
        $user = User::find($request['userId']);

        if(!$user) {
            return response([
                'status' => 'error',
                'message' => 'Nie znaleziono użytkownika'
            ],404);
        }

        $user->update([
            'role' => 'moderator'
        ]);

        return response([
            'status' => 'success',
            'message' => 'Użytkownik '.$user->name.' został moderatoem'
        ]);
    }

        public function deleteModerator(Request $request) {
        $user = User::find($request['userId']);

        if(!$user) {
            return response([
                'status' => 'error',
                'message' => 'Nie znaleziono użytkownika'
            ],404);
        }

        $user->update([
            'role' => 'user'
        ]);

        return response([
            'status' => 'success',
            'message' => 'Rola moderatora użytkownikowi '.$user->name.' została odebrana'
        ]);
    }


    public function banUser(Request $request) {

        $user = User::find($request['userId']);

        $user->update([
            'banned' => true
        ]);

        return response([
            'status' => 'success',
            'message' => 'Użytkownik '.$user->name.' został zbanowany'
        ]);
    }

    public function muteUser(Request $request) {
        $user = User::find($request['userId']);

        $user->update([
            'muted' => true
        ]);

        return response([
            'status' => 'success',
            'message' => 'Użytkownik '.$user->name.' został zmutowany'
        ]);
    }

    public function unbanUser(Request $request) {
        $user = User::find($request['userId']);

        $user->update([
            'banned' => false
        ]);

        return response([
            'status' => 'success',
            'message' => 'Użytkownik '.$user->name.' został odbanowany'
        ]);
    }

        public function unmuteUser(Request $request) {
        $user = User::find($request['userId']);

        $user->update([
            'muted' => false
        ]);

        return response([
            'status' => 'success',
            'message' => 'Użytkownik '.$user->name.' został odmutowany'
        ]);
    }
}
