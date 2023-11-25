<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public function listings()
    {
        return $this->belongsToMany(Listing::class, 'group_contacts');
    }
}
