<?php

namespace Database\Seeders;

use App\Models\Barang;
use App\Models\BarangKeluar;
use App\Models\BarangMasuk;
use App\Models\Kategori;
use App\Models\Satuan;
use App\Models\Stok;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User
        $users = [
            ['username' => 'galihputra', 'email' => 'galih@mail.com'],
            ['username' => 'nadaizz', 'email' => 'nada@mail.com'],
            ['username' => 'budi123', 'email' => 'budi@mail.com'],
            ['username' => 'sriwahyuni', 'email' => 'sri@mail.com'],
            ['username' => 'arifsetiawan', 'email' => 'arif@mail.com'],
            ['username' => 'rizkyramadhan', 'email' => 'rizky@mail.com'],
        ];
        $role = ['administrator', 'admin gudang', 'kepala gudang'];

        $kategori = [
            'Elektronik',
            'Alat Tulis',
            'Kebersihan',
            'Peralatan Dapur',
        ];

        $satuan = [
            'Unit',
            'Pcs',
            'Box',
        ];

        $barangJumlah = 15;

        $namaBarang = [
            'Laptop Lenovo Thinkpad',
            'Mouse Logitech M170',
            'Keyboard Mechanical',
            'Pulpen Pilot G2',
            'Spidol Snowman',
            'Buku Catatan A5',
            'Sabun Cuci Tangan Lifebuoy',
            'Disinfektan Spray 500ml',
            'Ember Plastik 20L',
            'Piring Melamin',
            'Sendok Stainless',
            'Teflon Maxim 22cm',
            'Power Strip 4 Lubang',
            'Kabel HDMI 2M',
            'Headset Gaming Rexus',
        ];

        foreach ($users as $user) {
            User::create([
                'username' => $user['username'],
                'email' => $user['email'],
                'password' => Hash::make('password'),
                'role' => $role[rand(0, count($role) -1)],
            ]);
        }

        foreach ($kategori as $item) {
            Kategori::create([
                'name' => $item,
            ]);
        }

        foreach ($satuan as $item) {
            Satuan::create([
                'name' => $item,
            ]);
        }

        for ($i = 0; $i < count($namaBarang); $i++) {
            $barang = Barang::create([
                'foto_barang' => 'default.jpg',
                'name' => $namaBarang[$i],
                'kategori_id' => rand(1, count($kategori)),
                'satuan_id' => rand(1, count($satuan)),
                'batas_minimal_stok' => rand(5, 20)
            ]);

            $stok = Stok::create([
                'barang_id' => $barang->id,
                'stok'=> rand(5, 100),
            ]);
        }

        for ($i = 0; $i < 20; $i++) {
            BarangMasuk::create([
                'barang_id' => rand(1, count($namaBarang)),
                'tanggal' => now()->subDays(rand(0, 30))->format('Y-m-d'),
                'jumlah' => rand(1, 100),
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            BarangKeluar::create([
                'barang_id' => rand(1, count($namaBarang)),
                'tanggal' => now()->subDays(rand(0, 30))->format('Y-m-d'),
                'jumlah' => rand(1, 50),
            ]);
        }

    }
}
