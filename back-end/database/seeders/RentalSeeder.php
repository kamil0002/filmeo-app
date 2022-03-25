<?php

namespace Database\Seeders;

use App\Models\Movie;
use App\Models\Rental;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use File;

class RentalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $json = File::get("database/dev-data/rentals-data.json");
        $rentals = json_decode($json);

        foreach($rentals as $key => $val) {

            $movie = Movie::find($val->movie_id);

            $currentTime = time();

            $rentalActive = true;

            $rentedTo = date('Y-m-d H:m:s', $currentTime + 1 * 48 * 60 * 60);

            //* Start Point Of The Date
            $start = strtotime("10 December 2021 00:00:00");

            //* End Point Point Of The Date
            $end = strtotime("04 March 2022 00:00:00");

            //* Custom Date Range.
            $timestamp = mt_rand($start, $end);

            //* Random Date
            $date = date("Y-m-d H:m:s", $timestamp);

            if($timestamp % 3 === 0) {
                $rentalActive = false;
            }

        
            $rental = Rental::create([
                'user_id' => $val->user_id,
                'expire_date' => $rentedTo,
                'cost' => $movie->cost,
                'active' => $rentalActive,
                'created_at' => $date
            ]);

            $rental->movies()->attach($movie);
        }
    }
}
