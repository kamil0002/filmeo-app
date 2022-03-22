<?php

namespace Database\Seeders;

use App\Models\Genre;
use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Cviebrock\EloquentSluggable\Services\SlugService;

use File;
use Illuminate\Support\Facades\DB;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/dev-data/movies-data.json");
        $movies = json_decode($json);

        
        foreach($movies as $key => $val) {
            $movies[$key]->slug = SlugService::createSlug(Movie::class, 'slug', $val->title);


            $genresIds = [];

            foreach($movies[$key]->genres as $movieGenre) {
                $genre = Genre::where('name','=',$movieGenre)->select('id')->get();
                array_push($genresIds, $genre[0]->id);
            }

            
            $genres = Genre::find($genresIds);


            $movie = Movie::create([
                'title' => $val->title,
                'slug' => $val->slug,
                'description' => $val->description,
                'short_description' => $val->short_description,
                'director' => $val->director,
                'release_date' => $val->release_date,
                'running_time' => $val->running_time,
                'poster' => $val->poster,
                'movie_link' => $val->movie_link,
                'trailer_link' => $val->trailer_link,
                'details_link' => $val->details_link,
                'cost' => $val->cost
            ]);

            
           $movie->genres()->attach($genres);

        }
    }
    
}