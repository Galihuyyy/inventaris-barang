<?php

namespace App\Http\Controllers\BarangKeluar;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\BarangKeluar;
use Illuminate\Http\Request;

class barangKeluarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = BarangKeluar::with('barang.satuan')->orderBy('tanggal', 'desc')->get();

        return response()->json([
            'message' => 'List data barang keluar',
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'barang_id' => ['required', 'exists:barang,id'],
            'tanggal' => ['required', 'date'],
            'jumlah' => ['required', 'integer', 'min:1'],
        ]);

        $barangKeluar = BarangKeluar::create([
            'barang_id' => $request->input('barang_id'),
            'tanggal' => $request->input('tanggal'),
            'jumlah' => $request->input('jumlah'),
        ]);

        if ($barangKeluar) {
            $barang = Barang::with('stok')->find($barangKeluar->barang_id);

            if ($barang && $barang->Stok) {
                $barang->Stok->stok -= $barangKeluar->jumlah;
                $barang->Stok->save();
            }
        }

        return response()->json([
            'message' => 'Data barang keluar berhasil ditambahkan',
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $barangKeluar = BarangKeluar::find($id);

        $request->validate([
            'tanggal' => ['required', 'date'],
            'jumlah' => ['required', 'integer', 'min:1'],
        ]);

        $jumlah_before = $barangKeluar->jumlah;
        $jumlah_after = $request->input('jumlah');
        $selisih = $jumlah_after - $jumlah_before;

        $barangKeluar->update([
            'tanggal' => $request->input('tanggal'),
            'jumlah' => $jumlah_after,
        ]);


        if ($barangKeluar) {
            $barang = Barang::with('stok')->find($barangKeluar->barang_id);

            if ($barang && $barang->Stok) {
                $barang->Stok->stok -= $selisih;
                $barang->Stok->save();
            }
        }

        return response()->json([
            'message' => 'Data barang keluar berhasil diupdate',
            'data' => $barangKeluar
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $barangMasuk = BarangKeluar::find($id);

        if ($barangMasuk) {
            $barang = Barang::with('stok')->find($barangMasuk->barang_id);

            if ($barang && $barang->stok) {
                $barang->stok->stok += $barangMasuk->jumlah;
                $barang->stok->save();
            }

            $barangMasuk->delete();
        }

        return response()->json([
            'message' => 'Data barang keluar berhasil dihapus'
        ]);
    }
}
