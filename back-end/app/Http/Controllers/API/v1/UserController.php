<?php

namespace App\Http\Controllers\API\v1;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    private function updateRules() {
        return [
            'name' => 'string',
            'surname' => 'string',
            'address' => 'string',
            'birth_date' => 'date',
            'email' => 'email|unique:users,email',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getAllUsers() {
        return User::all();
    }

    public function getUser($userId) {
        $user = User::find($userId);

        if(!$user) {
            return response([
                'status' => 'failed',
                'message' => 'Nie znaleziono podanego użytkownika'
            ]);
        }

        return response([
            'status' => 'success',
            'data' => [
                $user
            ]
        ]);
    }

    public function updateUserData(Request $request) {

    if($request['password'] || $request['password_confirmation']) {
        return response([
            'status' => 'error',
            'message' => 'Ten route nie służy do zmiany hasła!'
        ],400);
    }

    $user = auth()->user();

    $validator = Validator::make($request->all(), $this->updateRules());

    if($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    
    $user->update($request->all());

    return response([
        'status' => 'succes',
        'data' => [
            $user
        ]
    ]);
    }
}
