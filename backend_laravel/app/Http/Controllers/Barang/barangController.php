<?php

namespace App\Http\Controllers\Barang;

use App\Http\Controllers\Controller;
use App\Http\Resources\barangResource;
use App\Models\Barang;
use App\Models\Stok;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class barangController extends Controller
{
    public function index(Request $request)
    {
        $barang = Barang::with(["Stok", "Kategori", "Satuan"])->get();

        if ($barang == null) {
            return response()->json([
                'message' => "barang tidak ditemukan!"
            ], 404);
        }

        return response()->json([
            'data' => barangResource::collection($barang)
        ], 200);
        
    }

    public function store(Request $request)
    {
        $request->validate([
            "foto_barang" => ['required', 'file', 'mimes:jpg,png', 'max:2048'],
            "name" => ['required', 'string', 'unique:barang,name'],
            'kategori_id'=> ['required', 'exists:kategori,id'],
            'batas_minimal_stok'=> ['required', 'integer'],
            'satuan_id'=> ['required', 'exists:satuan,id'],
        ]);

        if (!$request->hasFile('foto_barang')) {
            return response()->json([
                'message' => "foto barang not found"
            ], 404);
        }

        $foto_barang = $request->file('foto_barang');
        $slugNama = Str::slug($request->input('name'), '_');
        $foto_name = now()->format('His') . '_' . $slugNama . '.' . $foto_barang->getClientOriginalExtension();
        $path = $foto_barang->storeAs('foto_barang', $foto_name, 'public');

        $barang = Barang::create([ 
            'foto_barang' => $path,
            'name' => $request->input("name"),
            'kategori_id' => $request->input("kategori_id"),
            'satuan_id' => $request->input("satuan_id"),
            'batas_minimal_stok' => $request->input("batas_minimal_stok"),
        ]);

        if (! $barang) {
            return response()->json([
                'message' => "server trouble!"
            ], 500);
        }

        $stok = Stok::create([
            "barang_id" => $barang->id,
            "stok" => 0
        ]);

        if ($barang && $stok) {            
            return response()->json([
                'message' => 'berhasil menambahkan barang',
            ]);
        }

    }

    public function show(string $id)
    {
        $barang = Barang::with(['Stok', "Kategori", "Satuan"])->find($id);
        return response()->json([
            'message' => 'berhasil menemukan detail barang',
            'data' => $barang
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $barang = Barang::find($id);

        if (! $barang) {
            return response()->json([
                'message' => 'ID tidak valid',
            ], 404);
        }

        $request->validate([
            "foto_barang" => ['nullable', 'file', 'mimes:jpg,png', 'max:2048'],
            "name" => ['required', 'string'],
            'kategori_id'=> ['required', 'exists:kategori,id'],
            'batas_minimal_stok'=> ['required', 'integer'],
            'satuan_id'=> ['required', 'exists:satuan,id'],
        ]);

        $foto_name = $barang->foto_barang;

        if ($request->hasFile('foto_barang')) {

            if (Storage::disk('public')->exists($barang->foto_barang)) {
                Storage::disk('public')->delete($barang->foto_barang);
            }
            
            $foto_barang = $request->file('foto_barang');
            $slugNama = Str::slug($request->input('name'), '_');
            $foto_name = now()->format('His') . '_' . $slugNama . '.' . $foto_barang->getClientOriginalExtension();
            $path = $foto_barang->storeAs('foto_barang', $foto_name, 'public');

            $foto_name = $path;
        }

        $update_barang = $barang->update([
            'foto_barang' => $foto_name,
            'name' => $request->input("name"),
            'kategori_id' => $request->input("kategori_id"),
            'satuan_id' => $request->input("satuan_id"),
            'batas_minimal_stok' => $request->input("batas_minimal_stok"),
        ]);

        if (!$update_barang) {
            return response()->json([
                'message' => "ada masalah dengan server"
            ], 500);
        }

        return response()->json([
            'message' => 'Berhasil memperbarui barang',
            'data' => $barang
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $barang = Barang::find($id);
        
        $delete_barang = $barang->delete();
        if (!$delete_barang) {
            return response()->json([
                'message' => "ada masalah dengan server"
            ], 500);
        }

        return response()->json([
            'message' => "Berhasil menghapus barang"
        ]);
    }
}
