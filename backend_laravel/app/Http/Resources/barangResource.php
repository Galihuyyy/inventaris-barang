<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class barangResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "foto_barang" => $this->foto_barang,
            "name" => $this->name, 
            "kategori" => $this->kategori->name,
            "satuan" => $this->satuan->name,
            "stok" => $this->Stok->stok,
            "batas_minimal_stok" => $this->batas_minimal_stok,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
