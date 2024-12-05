<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    // Получить всех подписчиков
    public function index()
    {
        // Возвращаем всех подписчиков
        return response()->json(Subscriber::all());
    }

    // Создать нового подписчика
    public function store(Request $request)
    {
        // Валидация данных
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:subscribers,email',
        ]);

        // Создание нового подписчика
        $subscriber = Subscriber::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        // Возвращаем успешный ответ
        return response()->json($subscriber, 201);
    }

    // Обновить существующего подписчика
    public function update(Request $request, $id)
    {
        // Находим подписчика по ID
        $subscriber = Subscriber::findOrFail($id);

        // Валидация данных
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:subscribers,email,' . $id,
        ]);

        // Обновляем данные подписчика
        $subscriber->update($validated);

        // Возвращаем обновленного подписчика
        return response()->json($subscriber);
    }

    // Удалить подписчика
    public function destroy($id)
    {
        // Находим подписчика по ID
        $subscriber = Subscriber::findOrFail($id);

        // Удаляем подписчика
        $subscriber->delete();

        // Возвращаем успешный ответ
        return response()->json(null, 204);
    }
}
