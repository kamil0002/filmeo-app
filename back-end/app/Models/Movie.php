<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Cviebrock\EloquentSluggable\Sluggable;

class Movie extends Model
{
    use HasFactory, Sluggable;

     protected $fillable = [
        'title',
        'slug',
        'description',
        'short_description',
        'director',
        'release_date',
        'running_time',
        'poster',
        'movie_link',
        'trailer_link',
        'details_link',
        'cost',
    ];

    protected $attributes = [
        'rating_quantity' => 0,
    ];

    public function sluggable() : array {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    protected $table = 'movies';

    protected $primaryKey = 'id';
    

    public function review() {
        return $this->belongsTo(Review::class);
    }

    public function rentals() {
        return $this->belongsToMany(Rental::class);
    }

    public function genres() {
        return $this->belongsToMany(Genre::class);
    }
}
