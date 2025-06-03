<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('barang', function (Blueprint $table) {
            $table->id();
            $table->string('foto_barang');
            $table->string('name');
            $table->foreignId('kategori_id')->constrained('kategori')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('satuan_id')->constrained('satuan')->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('batas_minimal_stok');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barang');
    }
};
