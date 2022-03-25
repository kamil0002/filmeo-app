<?php

namespace App\Http\Controllers\API\v1;

use App\Models\Genre;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Rental;
use App\Models\Review;
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
            'cost' => 'required|numeric',
            'genres' => 'required|array|min:1'
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
            'cost' => 'numeric',
            'genres' => 'array|min:1'
        ];
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getMovies(Request $request)
    {

        define('filters', ['id', 'title', 'rating_quantity', 'short_description', 'poster', 'slug']);

        if($request->genres)
            $movies = Movie::whereHas('genres')->with('genres')->select(constant('filters'))->get();
        else $movies = Movie::select(constant('filters'))->get();
        
        //* If user use a query filter text
        if($request->search) {
            $filteredMovies = Movie::where('title', 'like', '%'.$request->search.'%')->select(constant('filters'))->get();

            $movies = $filteredMovies;
        }

        //* If user query for genres
        if($request->genre) {
            $filteredMovies = [];

            foreach($movies as $movie) {
                foreach($movie->genres as $movieGenre) {
                    if(strtolower($request->genre) === strtolower($movieGenre->name)) {
                        array_push($filteredMovies, $movie);
                        break;
                    }
                }
            }

            $movies = $filteredMovies;
        }


        if(count($movies) === 0) {
            return response([
                'status' => 'error',
                'message' => 'Nie znaleziono żadnych wyników'
            ], 404);
        }

        foreach($movies as $movie) {
            $reviews = Review::where('movie_id', '=', $movie->id)->select('rating')->get();

            $movie['rating_average'] = floatval(floor($reviews->avg('rating')) . substr(str_replace(floor($reviews->avg('rating')), '', $reviews->avg('rating')), 0, 2 + 1)) ?? 0;
        }

        return response([
            'status' => 'success',
            'results' => count($movies),
            'data' => [
                $movies
            ]
            ]);
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

        $genresIds = [];

        //Loop over all genres and find their ids
        foreach($request->genres as $movieGenre) {
            $genre = Genre::where('name','=',$movieGenre)->select('id')->get();
            array_push($genresIds, $genre[0]->id);
        }

        // Find Genres in Genres table
        $genres = Genre::find($genresIds);

        $movie = Movie::create($request->all());

        // Assign appropriate genres to movie
        $movie->genres()->attach($genres);
        

        return response([
            'status' => 'success',
            'data' => [
                $movie
            ]
            ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getMovie(Request $request, int $movieId)
    {
        //* Get Filters

        $movie = Movie::find($movieId);

        if(!$movie) {
            return response([
                'status' => 'fail',
                'message' => 'Film o podanym ID nie istnieje.'
            ], 404);
        }

        $movie = $movie->where('id', '=', $movieId)->with('genres')->with('reviews')->first();

        $reviews = Review::where('movie_id', '=', $movieId)->select('rating')->get();

        $movie['rating_average'] = floatval(floor($reviews->avg('rating')) . substr(str_replace(floor($reviews->avg('rating')), '', $reviews->avg('rating')), 0, 2 + 1)) ?? 0;

        //* Check if user rented this movie already

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
    public function updateMovie(Request $request, int $movieId)
    {
        $movie = Movie::find($movieId);

        if(!$movie) {
            return response([
                'status' => 'error',
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
                'status' => 'error',
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

    //* Aggregations

    public function frequentlyRented() {

        $movies = Movie::orderBy('rentals_number', 'desc')->paginate(5);
        
        return response([
            'status' => 'success',
            'results' => count($movies),
            'data' => [
                $movies
            ]
        ]);
    }

    public function topRated() {

        $movies = Movie::all();

        foreach($movies as $movie) {
            $reviews = Review::where('movie_id', '=', $movie['id'])->select('rating')->get();

            $movie['rating_average'] = floatval(floor($reviews->avg('rating')) . substr(str_replace(floor($reviews->avg('rating')), '', $reviews->avg('rating')), 0, 2 + 1)) ?? 0;
        }

        $movies = $movies->toArray();

        //* Sort Movie By Rating
        usort($movies, function($a, $b) {
            if ($a['rating_average'] == $b['rating_average']) {
                return 0;
            }
            return ($a['rating_average'] > $b['rating_average']) ? -1 : 1;
        });

        $movies = array_slice($movies,0,5, true);

        return response([
            'status' => 'success',
            'results' => count($movies),
            'data' => $movies
            ]
        );
    }

    public function lastAdded() {
        $movies = Movie::orderBy('created_at', 'asc')->paginate(5);
        
        return response([
            'status' => 'success',
            'results' => count($movies),
            'data' => [
                $movies
            ]
        ]);
    }

}
