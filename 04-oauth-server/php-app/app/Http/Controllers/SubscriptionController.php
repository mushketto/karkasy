<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    // Получить все подписки
    public function index()
    {
        // Возвращаем все подписки с подгруженными подписчиками
        return response()->json(Subscription::with('subscriber')->get());
    }

    // Создать новую подписку
    public function store(Request $request)
    {
        // Валидация данных
        $validated = $request->validate([
            'subscriber_id' => 'nullable|exists:subscribers,id', // subscriber_id может быть null или существовать
            'name' => 'required|string|max:255',
        ]);

        // Если subscriber_id существует и валиден
        $subscriber_id = isset($validated['subscriber_id']) && $validated['subscriber_id']
            ? $validated['subscriber_id']
            : null; // Если не существует, ставим null

        // Создание новой подписки
        $subscription = Subscription::create([
            'subscriber_id' => $subscriber_id, // Привязываем к подписчику или оставляем null
            'name' => $validated['name'],
        ]);

        // Возвращаем успешный ответ
        return response()->json($subscription->load('subscriber'), 201);
    }

    // Обновить существующую подписку
    public function update(Request $request, $id)
    {
        // Находим подписку по ID
        $subscription = Subscription::findOrFail($id);

        // Валидация данных
        $validated = $request->validate([
            'subscriber_id' => 'nullable|exists:subscribers,id', // subscriber_id может быть null или существовать
            'name' => 'sometimes|required|string|max:255',
        ]);

        // Если subscriber_id существует и валиден
        $subscriber_id = isset($validated['subscriber_id']) && $validated['subscriber_id']
            ? $validated['subscriber_id']
            : null; // Если не существует, ставим null

        // Обновляем данные подписки
        $subscription->update([
            'subscriber_id' => $subscriber_id, // Обновляем subscriber_id
            'name' => $validated['name'] ?? $subscription->name, // Если имя не передано, сохраняем старое
        ]);

        // Возвращаем обновленную подписку с подгруженным подписчиком
        return response()->json($subscription->load('subscriber'));
    }

    // Удалить подписку
    public function destroy($id)
    {
        // Находим подписку по ID
        $subscription = Subscription::findOrFail($id);

        // Удаляем подписку
        $subscription->delete();

        // Возвращаем успешный ответ
        return response()->json(null, 204);
    }
}
