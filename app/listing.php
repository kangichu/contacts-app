<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class listing extends Model
{
    public  function user(){
        return $this->belongsTo('App\User');
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_contacts');
    }

    public function profileImageUpload()
    {
        return $this->hasOne(ProfileImageUpload::class);
    }
}
