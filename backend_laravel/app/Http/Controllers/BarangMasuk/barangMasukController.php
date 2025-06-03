<?php

namespace App\Http\Controllers\BarangMasuk;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use Illuminate\Http\Request;
use App\Models\BarangMasuk;

class barangMasukController extends Controller
{
    public function index()
    {
        $data = BarangMasuk::with('barang.satuan')->orderBy('tanggal', 'desc')->get();

        return response()->json([
            'message' => 'List data barang masuk',
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'barang_id' => ['required', 'exists:barang,id'],
            'tanggal' => ['required', 'date'],
            'jumlah' => ['required', 'integer', 'min:1'],
        ]);

        $barangMasuk = BarangMasuk::create([
            'barang_id' => $request->input('barang_id'),
            'tanggal' => $request->input('tanggal'),
            'jumlah' => $request->input('jumlah'),
        ]);

        if ($barangMasuk) {
            $barang = Barang::with('stok')->find($barangMasuk->barang_id);

            if ($barang && $barang->Stok) {
                $barang->Stok->stok += $barangMasuk->jumlah;
                $barang->Stok->save();
            }
        }

        return response()->json([
            'message' => 'Data barang masuk berhasil ditambahkan',
        ]);
    }

    public function update(Request $request, string $id)
    {
        $barangMasuk = BarangMasuk::find($id);

        $request->validate([
            'tanggal' => ['required', 'date'],
            'jumlah' => ['required', 'integer', 'min:1'],
        ]);

        $jumlah_before = $barangMasuk->jumlah;
        $jumlah_after = $request->input('jumlah');
        $selisih = $jumlah_after - $jumlah_before;

        $barangMasuk->update([
            'tanggal' => $request->input('tanggal'),
            'jumlah' => $jumlah_after,
        ]);


        if ($barangMasuk) {
            $barang = Barang::with('stok')->find($barangMasuk->barang_id);

            if ($barang && $barang->Stok) {
                $barang->Stok->stok += $selisih;
                $barang->Stok->save();
            }
        }

        return response()->json([
            'message' => 'Data barang masuk berhasil diupdate',
            'data' => $barangMasuk
        ]);
    }

    public function destroy(string $id)
    {
        $barangMasuk = BarangMasuk::find($id);

        if ($barangMasuk) {
            $barang = Barang::with('stok')->find($barangMasuk->barang_id);

            if ($barang && $barang->stok) {
                $barang->stok->stok = max(0, $barang->stok->stok - $barangMasuk->jumlah);
                $barang->stok->save();
            }

            $barangMasuk->delete();
        }

        return response()->json([
            'message' => 'Data barang masuk berhasil dihapus'
        ]);
    }

}

