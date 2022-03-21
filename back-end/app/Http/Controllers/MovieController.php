<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use Cviebrock\EloquentSluggable\Services\SlugService;

class MovieController extends Controller
{
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
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'bail|required|string|unique:movies',
            'description' => 'required|string',
            'short_description' => 'required|string',
            'director' => 'required|string',
            'release_date' => 'required|date|date_format:d-m-Y|before:today',
            'running_time' => 'required|numeric',
            'poster' => 'required|string',
            'movie_link' => 'required|string',
            'trailer_link' => 'required|string',
            'details_link' => 'required|string',
            'cost' => 'required|numeric'
        ]);

        $fields['slug'] = SlugService::createSlug(Movie::class, 'slug', $request->title);

        $movie = Movie::create([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'short_description' => $fields['short_description'],
            'director' => $fields['director'],
            'release_date' => $fields['release_date'],
            'running_time' => $fields['running_time'],
            'poster' => $fields['poster'],
            'movie_link' => $fields['movie_link'],
            'trailer_link' => $fields['trailer_link'],
            'details_link' => $fields['details_link'],
            'cost' => $fields['cost'],
            'slug' => $fields['slug'],
        ]);

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
}
