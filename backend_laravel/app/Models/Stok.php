<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stok extends Model
{
    protected $table = "stok";
    public $timestamps = false;

    protected $fillable = ["barang_id", "stok"];

    public function Barang() {
        return $this->belongsTo(Barang::class, 'barang_id', 'id');
    }
}
