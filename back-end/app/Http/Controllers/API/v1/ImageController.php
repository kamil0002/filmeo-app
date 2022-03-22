<?php

namespace App\Http\Controllers\API\v1;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{

    public function rules()
    {
        return [
            'avatar' => 'required|image|mimes:jpeg,png,jpg|max:800',
        ];
    }

    public function uploadAvatar(Request $request) {

        $file = $request->hasFile('avatar');

        $validator = Validator::make($request->all, $this->rules());

        if($validator->fails()) {
            return response([
                'status' => 'error',
                'message' => 'Niepoprawne zdjęcie, dostępne formaty to: jpeg,png,jpg, a maksymalny rozmiar to 800px '
            ]);
        }


        if($file) {
            $avatar = $request->file('avatar');


            $fileName = time().$avatar->getClientOriginalName();
    
            $avatar->move(public_path('images/avatars'), $fileName);

            return response([
                'status' => 'success'
            ]);
        }

        if($file) {
            return response([
                'status' => 'error',
                'message' => 'Niepoprawne zdjęcie'
            ],500);
        }
    }
}
