<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $table = "kategori";

    protected $fillable = ["name"];
    
    public function Barang() {
        return $this->hasOne(Barang::class, 'kategori_id', 'id');
    }
}
