<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    protected $table = "barang";

    protected $guarded = [];

    protected $hidden = ["kategori_id", "satuan_id"];

    public function Stok() {
        return $this->hasOne(Stok::class, 'barang_id', 'id');
    }

    public function Kategori() {
        return $this->belongsTo(Kategori::class, 'kategori_id', 'id');
    }

    public function Satuan() {
        return $this->belongsTo(Satuan::class, 'satuan_id', 'id');
    }

    public function BarangMasuk() {
        return $this->hasMany(BarangMasuk::class, 'barang_id', 'id');
    }
    public function BarangKeluar() {
        return $this->hasMany(BarangKeluar::class, 'barang_id', 'id');
    }

    public function getFotoBarangAttribute ($val) {
        return $val ? url('storage/'.$val) : null;
    }
}
