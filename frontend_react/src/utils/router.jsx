import { createBrowserRouter } from "react-router-dom"

// PAGES
import Login from "../pages/Auth/Login"
import Dashboard from "../pages/Dashboard"
import Forbidden from "../pages/404/Forbidden"
import Auth from "../middleware/Auth"
import Barang from "../pages/Barang"
import Satuan from "../pages/Satuan"
import Kategori from "../pages/Kategori"
import BarangMasuk from "../pages/BarangMasuk"
import BarangKeluar from "../pages/BarangKeluar"
import Users from "../pages/Users"
import LaporanStok from "../pages/Report/LaporanStok"
import LaporanBarangMasuk from "../pages/Report/LaporanBarangMasuk"
import LaporanBarangKeluar from "../pages/Report/LaporanBarangKeluar"

const router = createBrowserRouter([
    { path : '/forbidden', element : <Forbidden/> },
    { path : '/login', element : <Login/> },
    { path : '/', element : <Auth><Dashboard/></Auth> },
    { path : '/barang', element : <Auth exceptRole="kepala gudang"> <Barang/> </Auth> },
    { path : '/kategori', element : <Auth exceptRole="kepala gudang"> <Kategori/> </Auth> },
    { path : '/satuan', element : <Auth exceptRole="kepala gudang"> <Satuan/> </Auth> },
    { path : '/barang-masuk', element : <Auth exceptRole="kepala gudang"> <BarangMasuk/> </Auth> },
    { path : '/barang-keluar', element : <Auth exceptRole="kepala gudang"> <BarangKeluar/> </Auth> },
    { path : '/laporan-stok', element : <Auth> <LaporanStok/> </Auth> },
    { path : '/laporan-barang-masuk', element : <Auth> <LaporanBarangMasuk/> </Auth> },
    { path : '/laporan-barang-keluar', element : <Auth> <LaporanBarangKeluar/> </Auth> },
    { path : '/users', element : <Auth role="administrator"> <Users/> </Auth> },
    

])

export default router