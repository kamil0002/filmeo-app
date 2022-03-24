<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;



use App\Models\User;
use Error;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    // public function __construct() {
    //     $this->middleware(['auth', 'verified']);
    // }

    private function registerRules() {
        return [
            'name' => 'required|string',
            'surname' => 'required|string',
            'address' => 'required|string',
            'birth_date' => 'required|date',
            'role' => 'string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ];
    }

    private function updatePasswordRules() {
        return [
            'old_password' => 'required|string',
            'password' => 'required|string|confirmed'
        ];
    }


    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), $this->registerRules());

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        //* Check if user is banned

        $request['role'] = $request['role'] ?? 'user';


        //* Create User
        $user = User::create([
            'name' => $request['name'],
            'surname' => $request['surname'],
            'address' => $request['address'],
            'birth_date' => $request['birth_date'],
            'role' => $request['role'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ]);

        $token = $user->createToken('user_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];


        // TODO ENABLE EMAIL
        //* Send Welcome Mail To a User
        // Mail::to($fields['email'])->send(new WelcomeMail($fields['name']));

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

        if($user?->banned) {
            return response([
                'status' => 'error',
                'message' => 'Przykro nam, lecz zostałeś zbanowany. W celu wyjaśnienia przyczyna skontaktuj się z'.env('MAIL_FROM_ADDRESS').'.'
            ],401);
        }



        //* Check Password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Niepoprawny e-mail lub hasło'
            ], 401);
        }

        $token = $user->createToken('user_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 202);
    }

    public function logout() {
        
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
        ], 200);
    }

    public function updateMyPassword(Request $request) {

        $user = auth()->user();

        //* Check if old password is correct
        if (!$user || !Hash::check($request['old_password'], $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Niepoprawne stare hasło'
            ], 401);
        }


        $validator = Validator::make($request->all(), $this->updatePasswordRules());

        if($validator->fails()) {
            return response([
                'status' => 'error',
                'message' => $validator->errors()
            ]);
        }

        $user->update([
            'password' => bcrypt($request['password']),
        ]);

        return response([
            'status' => 'success'
        ]);
    }

}
