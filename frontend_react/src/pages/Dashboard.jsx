import React, { useEffect, useState } from 'react'
import { PageLayout } from '../assets/components/Layouts/PageLayout'
import Sidebar from '../assets/components/Sidebar/Sidebar'
import axios from 'axios'
import getToken from '../utils/helper'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {

  const [openSide, setOpenSide] = useState(false)
  const [user, setUser] = useState({})
  const [dataDashbord, setDataDashboard] = useState({
    barang_batas_min : [
      
    ]
  })

  const apiUrl = import.meta.env.VITE_API_URL
  const userToken = getToken()

  function getDataDashboard () {
    axios.get(`${apiUrl}/dashboard`, {headers : {Authorization : `Bearer ${userToken}`}})
    .then(res => {
      console.log(res.data.data);
      setDataDashboard(res.data.data);
    })
    .catch(err => {
      if (err.status === 401) {
        return <Navigate to={'/login'}/>
      }
    })
  }

  function getUser () {
    axios.get(`${apiUrl}/user-me`, {headers : {Authorization : `Bearer ${userToken}`}})
    .then(res => {
      console.log(res.data);
      setUser(res.data);
    })
    .catch(err => {
      if (err.status === 401) {
        return <Navigate to={'/login'}/>
      }
    })
  }

  function logout () {
    axios.post(`${apiUrl}/auth/logout`, {}, {headers : {Authorization : `Bearer ${userToken}`}})
    .then(res => {
      localStorage.removeItem('user')
      window.location.href = '/login'
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getDataDashboard()
    getUser()
  }, [])

  
  return (
    <PageLayout openSide={openSide}>
        <div className='w-full h-fit py-4 mb-10 md:mb-6'>
          <div className="w-full h-25 flex md:items-center flex-col md:flex-row ">
            <div className="md:hidden mb-5" onClick={() => {setOpenSide(true)}}>
              <i className='fa fa-bars text-xl mr-3'></i>
            </div>
            <div className="ps-4 pe-6 md:pe-12 rounded-full flex items-center bg-indigo-500 py-3">
              <div className="profile mr-2 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <h1 className='text-xl font-bold uppercase'>{user.username?.charAt(0)}</h1>
              </div>
              <div className="detail text-white">
                <h1 className="text-lg font-semibold flex items-center">{user.username} <span className='text-xs bg-orange-200 text-orange-800 rounded-full px-1 ms-2'>{user.role}</span></h1>
                <h1 className="text-sm font-semibold">{user.email}</h1>
              </div>
              <div className='ms-4 cursor-pointer ' onClick={logout}>
                <i className="fa fa-right-to-bracket text-white text-2xl hover:text-red-600 duration-200"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-10 w-full bg-white rounded-xl grid grid-cols-1 md:grid-cols-4 gap-x-2 max-md:gap-y-7 max-md:py-6 md:py-6">
          <div className="item flex items-center justify-center h-full">
            <div className="flex items-center max-[26.25rem]:flex-col md:flex-row gap-x-2">
              <div className="icon bg-indigo-500 w-14 h-14 rounded-lg grid place-items-center">
                <i className="fa fa-toolbox text-3xl text-white"></i>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <h1 className='text-2xl font-semibold'>Barang</h1>
                <h1 className='text-lg'>{dataDashbord.total_barang}</h1>
              </div>
            </div>
          </div>
          <div className="item flex items-center justify-center h-full">
            <div className="flex items-center max-[26.25rem]:flex-col md:flex-row gap-x-2">
              <div className="icon bg-indigo-500 w-14 h-14 rounded-lg grid place-items-center">
                <i className="fa fa-list text-3xl text-white"></i>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <h1 className='text-2xl font-semibold'>Kategori</h1>
                <h1 className='text-lg'>{dataDashbord.total_kategori}</h1>
              </div>
            </div>
          </div>
          <div className="item flex items-center justify-center h-full">
            <div className="flex items-center max-[26.25rem]:flex-col md:flex-row gap-x-2">
              <div className="icon bg-indigo-500 w-14 h-14 rounded-lg grid place-items-center">
                <i className="fa fa-layer-group text-3xl text-white"></i>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <h1 className='text-2xl font-semibold'>Satuan</h1>
                <h1 className='text-lg'>{dataDashbord.total_satuan}</h1>
              </div>
            </div>
          </div>
        </div>

      <div className="overflow-x-scroll  rounded-xl shadow-sm bg-gray-50 border-[1px] border-gray-200">
        <div className='px-6 py-3'>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium mx-2">{dataDashbord.barang_batas_min.length}</span>
            results
          </p>
        </div>
        <table className="w-full min-w-[655px] text-sm text-left text-gray-700 overflow-auto">
          <thead className="text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Batas Minimal Stok</th>
              <th className="px-6 py-4">Stok</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {dataDashbord.barang_batas_min.map(item => (
              <tr
                className="border-t border-neutral-400 hover:bg-gray-50 transition-colors"
                key={item.id}
              >
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4">{item.batas_minimal_stok}</td>
                <td className="px-6 py-4">{item.stok.stok}</td>
              </tr>

              
            ))}
          </tbody>
        </table>

      </div>
    </PageLayout>
  )
}

export default Dashboard