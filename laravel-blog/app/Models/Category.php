<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];
    
    // Relation avec les articles (à implémenter plus tard)
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
