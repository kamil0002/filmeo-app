<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Genre;

use Illuminate\Support\Facades\Storage;

class GenreController extends Controller
{
    private function rules() {
        return ['name' => 'required|string'];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllGenres()
    {
        $genres =  Genre::all();

        if(!$genres) {
            return response([
                'status' => 'error',
                'message' => 'Nie znaleziono żadnych wyników'
            ], 404);
        }

        return response([
            'status' => 'success',
            'data' => [
                $genres
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createGenre(Request $request)
    {

        $validator = Validator::make($request->all(), $this->rules());

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }


        $genre = Genre::create($request->all());



        return response([
            'status' => 'success',
            'data' => [
                $genre
         ]
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getGenre($genreId)
    {
        
        $genre = Genre::find($genreId);

        if(!$genre) {
            return response([
                'status' => 'fail',
                'message' => 'Gatunek o podanym ID nie istnieje.'
            ], 404);
        }

        return response([
            'status' => 'success',
            'data' => [
                $genre
            ]
        ]);
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
}
