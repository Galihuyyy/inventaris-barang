<?php

namespace App\Http\Controllers\Kategori;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategori = Kategori::all();

        if (!$kategori) {
            abort(500);
        }

        return response()->json([
            'message' => "berhasil mengambil data kategori",
            "data" => $kategori
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name"=> ["required", "max:20", 'unique:satuan,name']
        ]);

        $kategori = Kategori::create([
            "name" => $request->input('name')
        ]);

        if (!$kategori) {
            abort(500);
        }

        return response()->json([
            'message' => "berhasil menambah data"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $kategori = Kategori::find($id);

        return response()->json([
            'message' => "berhasil menemukan data",
            "data"=> $kategori
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $kategori = Kategori::find($id);
        
        $request->validate([
            "name"=> ["required", "max:20"]
        ]);

        $kategori->name = $request->input("name");
        $update = $kategori->save();

        if (!$update) {
            abort(500);
        }

        return response()->json([
            'message' => "berhasil merubah data"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kategori = Kategori::find($id);
        $kategori->delete();
        return response()->json([
            "message"=> "berhasil menghapus data"
        ]);
    }
}
