<?php

namespace App\Http\Controllers\Laporan;

use App\Http\Controllers\Controller;
use App\Http\Resources\barangResource;
use App\Models\Barang;
use App\Models\BarangKeluar;
use App\Models\BarangMasuk;
use Illuminate\Http\Request;

class laporanController extends Controller
{
    public function laporanStok(Request $request){

        $request->validate([
            "filter_stok" => ['required', 'in:semua,minimum'],
        ]);
        
        $filter = $request->input("filter_stok");

        if ($filter == "semua"){
            $barang = Barang::with(['Stok', 'Kategori', 'Satuan'])->get();

            return response()->json([
                'message' => "berhasil mendapatkan data semua stok",
                'data' => barangResource::collection($barang)
            ]);
        }
        
        if ($filter == 'minimum'){
            $barang = Barang::with(['Stok', 'Kategori', 'Satuan'])
                ->whereHas('Stok', function ($query) {
                    $query->whereColumn('stok', '<', 'barang.batas_minimal_stok');
                })
                ->get();

            if ($barang == null) {
                return response()->json([
                    'message' => "tidak ada barang yang melebihi batas maksimum"
                ],200);
            }

            return response()->json([
                'message' => "berhasil mendapatkan data stok minimum",
                'data' => barangResource::collection($barang)
            ]);

        }
    }

    public function laporanBarangMasuk(Request $request) {
        $request->validate([
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_mulai',
        ]);

        $barangMasuk = BarangMasuk::whereBetween('tanggal', [
            $request->input('tanggal_mulai'),
            $request->input('tanggal_akhir')
        ])->with('barang.satuan')->get();

        if ($barangMasuk == null) {
            return response()->json([
                'message' => "Tidak ada data barang masuk dalam rentang tanggal tersebut"
            ]);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data barang masuk',
            'data' => $barangMasuk
        ]);
    }

    public function laporanBarangKeluar(Request $request) {
        $request->validate([
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_mulai',
        ]);

        $barangKeluar = BarangKeluar::whereBetween('tanggal', [
            $request->input('tanggal_mulai'),
            $request->input('tanggal_akhir')
        ])->with('barang.satuan')->get();

        if ($barangKeluar == null) {
            return response()->json([
                'message' => "barang keluar tidak ada"
            ]);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data barang keluar',
            'data' => $barangKeluar
        ]);
    }
    

}
