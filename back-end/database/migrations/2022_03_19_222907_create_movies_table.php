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
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->string('short_description');
            $table->string('director');
            $table->date('release_date');
            $table->integer('running_time');
            $table->string('poster');
            $table->string('video_link');
            $table->string('trailer_link');
            $table->string('details_page');
            $table->decimal('rating_average',5,1);
            $table->integer('rating_quantity');
            $table->decimal('cost',5,2);
            $table->integer('rentings_number')->nullable();
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
