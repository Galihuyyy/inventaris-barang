import { Link, NavLink } from 'react-router-dom'
import Navlink from '../Navlink/Navlink';
import Navtitle from '../Navlink/Navtitle';

const Sidebar = (props) => {
  const list_menu = [
    {
      title: 'Report',
      items: [
        {
          name: 'Laporan Stok',
          path: '/laporan-stok',
          icon: 'fa-solid fa-cubes'
        },
        {
          name: 'Laporan Barang Masuk',
          path: '/laporan-barang-masuk',
          icon: 'fa-solid fa-right-to-bracket'
        },
        {
          name: 'Laporan Barang Keluar',
          path: '/laporan-barang-keluar',
          icon: 'fa-solid fa-right-from-bracket'
        },
      ],
    },
  ];

  const icon = ['fa-toolbox', 'fa-layer-group', 'fa-list', 'fa-users']
  const {openSide = false} = props
  
  const user = JSON.parse(localStorage.getItem('user')) || { role : 'kepala gudang'}

  return (
    <aside className={`w-64 h-screen bg-gray-50 border-r border-gray-200 fixed md:left-0 ${openSide ? '-left-0' : '-left-full'} `}>
      <div className="py-4 px-6 mb-6">
        <Link to="/">
          <h4 className='text-4xl text-center font-bold'><span className='text-red-600'>in</span>ventory <span className='ms-3' onClick={() => {window.location.reload()}}><i className="fa fa-chevron-left text-xl"></i></span></h4>
        </Link>
      </div>

        <div className="mb-10">
          <Navtitle>Main</Navtitle>

          <div className='px-2'>
            <Navlink href="/" icon="fa-solid fa-gauge-high">Dashboard</Navlink>
          </div>

        </div>
        {user?.role != 'kepala gudang' && 
          <div className="mb-10">
            <Navtitle>Management</Navtitle>

            <div className='px-2'>
              <Navlink href="/barang" icon="fa-solid fa-toolbox">Barang</Navlink>
              <Navlink href="/satuan" icon="fa-solid fa-layer-group">Satuan</Navlink>
              <Navlink href="/kategori" icon="fa-solid fa-list">Kategori</Navlink>
              <Navlink href="/barang-masuk" icon="fa-solid fa-download">Barang Masuk</Navlink>
              <Navlink href="/barang-keluar" icon="fa-solid fa-arrow-up-from-bracket">Barang Keluar</Navlink>
              {user.role == 'administrator' &&
                <Navlink href="/users" icon="fa-solid fa-users">Users</Navlink>
              }
            </div>

          </div>
        }
        <div className="mb-10">
          <Navtitle>Report</Navtitle>

          <div className='px-2'>
            <Navlink href="/laporan-stok" icon="fa-solid fa-cubes">laporan Stok</Navlink>
            <Navlink href="/laporan-barang-masuk" icon="fa-solid fa-right-to-bracket">laporan Barang Masuk</Navlink>
            <Navlink href="/laporan-barang-keluar" icon="fa-solid fa-right-from-bracket">laporan Barang keluar</Navlink>
          </div>

        </div>
    </aside>
  )
}

export default Sidebar
