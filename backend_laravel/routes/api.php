<?php

use App\Http\Controllers\Authentication\authController;
use App\Http\Controllers\Barang\barangController;
use App\Http\Controllers\BarangKeluar\barangKeluarController;
use App\Http\Controllers\BarangMasuk\barangMasukController;
use App\Http\Controllers\Dashboard\dashboardController;
use App\Http\Controllers\Kategori\KategoriController;
use App\Http\Controllers\Laporan\laporanController;
use App\Http\Controllers\Satuan\SatuanController;
use App\Http\Controllers\User\userController;
use App\Http\Middleware\role;
use App\Http\Middleware\validId;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/v1/user-me', function (Request $request) {
    return auth()->user();
})->middleware('auth:sanctum');

Route::prefix('/v1')->group(function () {
    Route::post('/auth/login', [authController::class,'login']);
    Route::post('/auth/logut', [authController::class, 'logout']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [authController::class, 'logout']);
        
        Route::get('/dashboard', [dashboardController::class, 'index']);

        Route::get('/laporan-stok', [laporanController::class, 'laporanStok']);
        Route::get('/laporan-barang-masuk', [laporanController::class, 'laporanBarangMasuk']);
        Route::get('/laporan-barang-keluar', [laporanController::class, 'laporanBarangKeluar']);

        Route::middleware(role::class . ':administrator,admin gudang')->group(function () {
            Route::resource('/barang', barangController::class)->only(['index', 'store']);
            Route::resource('/barang', barangController::class)->except(['index', 'store'])->middleware(validId::class . ':Barang,barang');
            
            Route::resource('/satuan', SatuanController::class)->only(['index', 'store']);
            Route::resource('/satuan', satuanController::class)->except(['index', 'store'])->middleware(validId::class . ':Satuan,satuan');
    
            Route::resource('/kategori', KategoriController::class)->only(['index', 'store']);
            Route::resource('/kategori', kategoriController::class)->except(['index', 'store'])->middleware(validId::class . ':Kategori,kategori');

            Route::resource('/barang-masuk', barangMasukController::class)->only(['index', 'store']);
            Route::resource('/barang-masuk', barangMasukController::class)->except(['index', 'store'])->middleware(validId::class . ':BarangMasuk,barang_masuk');
    
            Route::resource('/barang-keluar', barangKeluarController::class)->only(['index', 'store']);
            Route::resource('/barang-keluar', barangKeluarController::class)->except(['index', 'store'])->middleware(validId::class . ':BarangKeluar,barang_keluar');
        });
        
        

        Route::resource('/user', userController::class)->only(['index', 'store'])->middleware(role::class . ':administrator');
        Route::resource('/user', userController::class)->except(['index', 'store'])->middleware([validId::class . ':User,user', role::class . ':administrator']);
        
        
    });
});
