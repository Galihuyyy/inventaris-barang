<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\barangResource;
use App\Models\Barang;
use App\Models\Kategori;
use App\Models\Satuan;
use App\Models\User;
use Illuminate\Http\Request;

class dashboardController extends Controller
{
    public function index(Request $request) {

        $total_barang = Barang::count();
        $total_kategori = Kategori::count();
        $total_satuan = Satuan::count();
        $total_user = User::count();

        $barang_batas_min = Barang::with('Stok')->whereHas('Stok', function ($q) {
            $q->whereColumn('stok', '<', 'barang.batas_minimal_stok');
        })->get();

        if ($barang_batas_min->count() == 0) {
            return response()->json([
                'message' => "barang tidak ditemukan!"
            ], 404);
        }

        return response()->json([
            'data' => [
                'total_barang' => $total_barang,
                'total_kategori' => $total_kategori,
                'total_satuan' => $total_satuan,
                'total_user' => $total_user,
                'barang_batas_min' => $barang_batas_min,
            ]
        ]);
    }
}
