<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['author_name', 'author_email', 'content', 'article_id'];

    /**
     * Relation avec l'article
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
