<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProfileImageUpload extends Model
{
    protected $fillable = [
        'listing_id', 'image_name',
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
    
}
