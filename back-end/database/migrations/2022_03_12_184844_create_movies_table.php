<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('genre_id');
            $table->string('description');
            $table->string('director');
            $table->date('release_date');
            $table->integer('running_time');
            $table->string('poster_link');
            $table->string('video_link');
            $table->decimal('rating_quantity', 5, 1);
            $table->decimal('cost', 5, 2);
            $table->decimal('rating_average',5,1);
            $table->string('details_site');
            $table->integer('rentings_number');
            $table->date('date_added');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movies');
    }
};
