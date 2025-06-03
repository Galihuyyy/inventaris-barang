<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Satuan extends Model
{
    protected $table = "satuan";

    protected $fillable = ["name"];
    
    public function Barang() {
        return $this->hasOne(Barang::class, 'satuan_id', 'id');
    }
}
