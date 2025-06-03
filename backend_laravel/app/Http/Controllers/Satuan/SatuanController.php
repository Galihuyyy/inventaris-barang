<?php

namespace App\Http\Controllers\Satuan;

use App\Http\Controllers\Controller;
use App\Models\Satuan;
use Illuminate\Http\Request;

class SatuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $satuan = Satuan::all();

        if (!$satuan) {
            abort(500);
        }

        return response()->json([
            'message' => "berhasil mengambil data satuan",
            "data" => $satuan
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

        $satuan = Satuan::create([
            "name" => $request->input('name')
        ]);

        if (!$satuan) {
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
        $satuan = Satuan::find($id);

        return response()->json([
            'message' => "berhasil menemukan data",
            "data"=> $satuan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $satuan = Satuan::find($id);
        
        $request->validate([
            "name"=> ["required", "max:20"]
        ]);

        $satuan->name = $request->input("name");
        $update = $satuan->save();

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
        $satuan = Satuan::find($id);
        $satuan->delete();
        return response()->json([
            "message"=> "berhasil menghapus data"
        ]);
    }
}
