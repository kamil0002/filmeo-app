<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $table = 'movies';

    protected $primaryKey = 'id';


    public function review() {
        return $this->belongsTo(Review::class);
    }

    public function rentals() {
        return $this->belongsToMany(Rental::class);
    }

    public function genre() {
        return $this->belongsTo(Genre::class);
    }
}
