<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    use HasFactory;

    protected $table = 'rentals';

    protected $primaryKey = 'id';

    public function users() {
        return $this->hasMany(User::class);
    }

    public function movies() {
        return $this->belongsToMany(Movie::class);
    }
}
