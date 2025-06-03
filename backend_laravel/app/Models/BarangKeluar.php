<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarangKeluar extends Model
{
    protected $table = "barang_keluar";

    protected $fillable = ["barang_id","tanggal","jumlah"];    
    public function Barang() {
        return $this->belongsTo(Barang::class, 'barang_id', 'id');
    }
}
