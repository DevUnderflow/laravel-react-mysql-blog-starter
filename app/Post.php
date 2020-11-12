<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $appends = ["image_url", "date_formatted", "excerpt"];

    public function getImageUrlAttribute()
    {
        return $this->image!=""?url("uploads/" . $this->image):"";
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function getDateFormattedAttribute()
    {
        return \Carbon\Carbon::parse($this->created_at)->format('F d, Y');
    }

    public function getExcerptAttribute()
    {
        return substr(strip_tags($this->content), 0, 100);
    }
}
