<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('subscriber_id'); // добавляем поле для subscriber_id
            $table->string('name'); // поле для имени
            $table->timestamps();

            // Добавляем внешний ключ
            $table->foreign('subscriber_id')->references('id')->on('subscribers')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        // Откатываем изменения и удаляем таблицу
        Schema::dropIfExists('subscriptions');
    }
};
