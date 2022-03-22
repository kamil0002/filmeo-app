<?php

namespace App\Http\Controllers\API\v1;


use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{

    public function rules()
    {
        return [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function uploadAvatar(Request $request) {
        error_log($request->hasFile('avatar'));
        $file = $request->hasFile('avatar');
        if($file) {
            error_log("HELLO");
            $avatar = $request->file('avatar');
            // $filename = time().$avatar->getClientOriginalName();

            $fileName = time().$avatar->getClientOriginalName();
    
            $avatar->move(public_path('images/avatars'), $fileName);

            return response([
                'status' => 'success'
            ]);
        }
    }
}
