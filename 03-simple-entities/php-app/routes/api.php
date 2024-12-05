<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\SubscriptionController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/subscribers', [SubscriberController::class, 'index']);
Route::post('/subscribers', [SubscriberController::class, 'store']); // Для POST
Route::put('/subscribers/{id}', [SubscriberController::class, 'update']); // Для PUT
Route::delete('/subscribers/{id}', [SubscriberController::class, 'destroy']); // Для DELETE

Route::get('/subscriptions', [SubscriptionController::class, 'index']); // Получить все подписки
Route::post('/subscriptions', [SubscriptionController::class, 'store']); // Создать подписку
Route::put('/subscriptions/{id}', [SubscriptionController::class, 'update']); // Обновить подписку
Route::delete('/subscriptions/{id}', [SubscriptionController::class, 'destroy']); // Удалить подписку
