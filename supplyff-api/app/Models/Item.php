<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $guarded = [
        'id',
    ];
    public $timestamps = false;

    public function flyffItem()
    {
        return $this->belongsTo(FlyffapiItem::class, 'flyff_api_id', 'flyffapi_item_id');
    }

    public function classified()
    {
        return $this->belongsTo(Classified::class);
    }
}
