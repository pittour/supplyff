<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlyffapiItem extends Model
{
    use HasFactory;

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function class()
    {
        return $this->belongsTo(FlyffapiClass::class, 'class_id', 'flyff_api_id');
    }
}