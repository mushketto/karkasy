<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\SubscriptionController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Группа маршрутов, доступных только для роли "admin"
Route::group(['middleware' => ['keycloak:admin']], function () {
    Route::get('/subscribers', [SubscriberController::class, 'index']);
    Route::post('/subscribers', [SubscriberController::class, 'store']); 
    Route::put('/subscribers/{id}', [SubscriberController::class, 'update']); 
    Route::delete('/subscribers/{id}', [SubscriberController::class, 'destroy']); 
     
});

// Группа маршрутов, доступных для роли "user"
Route::group(['middleware' => ['keycloak:user']], function () {
    Route::get('/subscriptions', [SubscriptionController::class, 'index']); 
    Route::post('/subscriptions', [SubscriptionController::class, 'store']);
    Route::put('/subscriptions/{id}', [SubscriptionController::class, 'update']);
    Route::delete('/subscriptions/{id}', [SubscriptionController::class, 'destroy']); 
});
