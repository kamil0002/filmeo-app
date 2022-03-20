<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'reviews';

    protected $primaryKey = 'id';

    public function users() {
        return $this->hasMany(User::class);
    }

    public function movies() {
        return $this->hasMany(Movie::class);
    }
}
