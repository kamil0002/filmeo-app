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
            'email' => 'string|unique:users,email',
        ];
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllUsers()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

        public function updateUserData(Request $request, int $userId) {

        if($request['password'] || $request['password_confirmation']) {
            return response([
                'status' => 'error',
                'message' => 'Ten route nie służy do zmiany hasła!'
            ],400);
        }

        $user = User::find($userId);

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
