<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email']; // или другие поля

    // Связь с таблицей подписок
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class); // Указываем, что у подписчика может быть несколько подписок
    }
}
