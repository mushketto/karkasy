<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = ['subscriber_id', 'name'];

    // Связь с моделью Subscriber
    public function subscriber()
    {
        return $this->belongsTo(Subscriber::class); // Указываем, что подписка принадлежит подписчику
    }
}
