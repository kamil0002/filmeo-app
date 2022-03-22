<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;


use App\Models\User;


class AuthController extends Controller
{

    // public function __construct() {
    //     $this->middleware(['auth', 'verified']);
    // }


    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'surname' => 'required|string',
            'address' => 'required|string',
            'birth_date' => 'required|date',
            'role' => 'string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $fields['role'] = $fields['role'] ?? 'user';


        //* Create User
        $user = User::create([
            'name' => $fields['name'],
            'surname' => $fields['surname'],
            'address' => $fields['address'],
            'birth_date' => $fields['birth_date'],
            'role' => $fields['role'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        $token = $user->createToken('user_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];


        //* Send Welcome Mail To a User
        Mail::to($fields['email'])->send(new WelcomeMail($fields['name']));

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ], [
            'email.required' => 'Aby się zalogować podaj e-mail oraz hasło',
            'password.required' => 'Aby się zalogować podaj e-mail oraz hasło'
        ]);


        //* Check Email
        $user = User::where('email', $fields['email'])->first();


        //* Check Password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Niepoprawny e-mail lub hasło'
            ], 401);
        }

        $token = $user->createToken('user_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout() {
        
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
        ], 200);
    }
}
