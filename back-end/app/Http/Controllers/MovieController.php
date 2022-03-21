<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{

    private function createRules()
    {
        return [
            'title' => 'bail|required|string|unique:movies',
            'description' => 'required|string',
            'short_description' => 'required|string',
            'director' => 'required|string',
            'release_date' => 'required|date|before:today',
            'running_time' => 'required|numeric',
            'poster' => 'required|string',
            'movie_link' => 'required|string',
            'trailer_link' => 'required|string',
            'details_link' => 'required|string',
            'cost' => 'required|numeric'
        ];
    }

        private function updateRules()
    {
        return [
            'title' => 'bail|string|unique:movies',
            'description' => 'string',
            'short_description' => 'string',
            'director' => 'string',
            'release_date' => 'date|before:today',
            'running_time' => 'numeric',
            'poster' => 'string',
            'movie_link' => 'string',
            'trailer_link' => 'string',
            'details_link' => 'string',
            'cost' => 'numeric'
        ];
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllMovies()
    {
        return Movie::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createMovie(Request $request)
    {

        $validator = Validator::make($request->all(), $this->createRules());

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $request['slug'] = SlugService::createSlug(Movie::class, 'slug', $request->title);

        $movie = Movie::create($request->all());

        return response([
            'status' => 'success',
            'data' => [
                $movie
            ]
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getMovie($movieId)
    {
        $movie = Movie::find($movieId);

        if(!$movie) {
            return response([
                'status' => 'fail',
                'message' => 'Film o podanym ID nie istnieje.'
            ], 404);
        }

        return response([
            'status' => 'success',
            'data' => [
                $movie
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateMovie(Request $request, $movieId)
    {
        $movie = Movie::find($movieId);

        if(!$movie) {
            return response([
                'status' => 'fail',
                'message' => 'Film o podanym ID nie istnieje.'
            ], 404);
        }

        
        $validator = Validator::make($request->all(), $this->updateRules());
        
        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $request['title'] && $request['slug'] = SlugService::createSlug(Movie::class, 'slug', $request->title);

        $movie->update($request->all());

        return response([
            'status' => 'success',
            'data' => [
                $movie
                ]
            ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deleteMovie($movieId) {

        $movie = Movie::destroy($movieId);

        if(!$movie) {
            return response([
                'status' => 'fail',
                'message' => 'Film o podanym ID nie istnieje'
            ],404);
        }

        return response([
            'status' => 'success',
            'data' => [
                null
            ]
            ], 204);
    }

    public function filterMovies($filterText) {
        $filteredMovies = Movie::where('title', 'like', '%'.$filterText.'%')->get();


        if(count($filteredMovies) === 0) {
            return response([
                'status' => 'fail',
                'message' => 'Nie znaleziono żadnego filmu o podanym tytule.'
            ],404);
        }

        return response([
            'status' => 'success',
            'results' => count($filteredMovies),
            'data' => [
                $filteredMovies
            ]
            ]);
    }
}
