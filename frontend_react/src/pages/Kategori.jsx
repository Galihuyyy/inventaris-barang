import React, { useEffect, useState } from 'react'
import { PageLayout } from '../assets/components/Layouts/PageLayout'
import axios from 'axios'
import getToken from '../utils/helper'
import Modal from '../assets/components/Modal/Modal'
import Alert from '../assets/components/Alert/Alert'

const Kategori = () => {

  const apiUrl = import.meta.env.VITE_API_URL
  const userToken = getToken()
  
  const [kategori, setKategori] = useState([])

  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)

  const [selectedId, setSelectedId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const [formCreate, setFormCreate] = useState({
    name : ''
  })

  const [formEdit, setFormEdit] = useState({
    name : ''
  })

  function getKategori () {
    axios.get(`${apiUrl}/kategori`, {headers : {Authorization : `Bearer ${userToken}`}})
    .then(res => {
      console.log(res.data.data)
      setKategori(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  function createKategori () {
    axios.post(`${apiUrl}/kategori`, formCreate, {
        headers: {
        Authorization: `Bearer ${userToken}`,
        },
    })
    .then(res => {
        setMessage(res.data.message)
        setTimeout(() => {
            setMessage('')
        }, 3000)
    })
    .catch(err => {
        setError(err.response.data.message);
        setTimeout(() => {
            setError('')
        }, 3000)
    })
    .finally( () => {
        getKategori(); 
        toggleModalCreate(); 
        setFormCreate({
            name : ''
        });
    });
  }

  function getDetailKategori (id) {
    setSelectedId(id)
    
    axios.get(`${apiUrl}/kategori/${id}`, {headers : {Authorization  :`Bearer ${userToken}`}})
    .then(res => {
        let kategori = res.data.data 
        setFormEdit({...formEdit, name : kategori.name })
        setShowModalEdit(!showModalEdit)
    })
    .catch(err => {
        console.log(err)
    })
  }

  function updateKategori () {
    axios.put(`${apiUrl}/kategori/${selectedId}`, formEdit, {headers : {Authorization : `Bearer ${userToken}`}})
    .then(res => {
        setMessage(res.data.message)
        setTimeout(function() {
            setMessage('')
        }, 3000);
    })
    .catch(err => {
        setError(err.response.data.message)
        setTimeout(function() {
            setError('')
        }, 3000);
    })
    .finally( () => {
        setSelectedId('')
        getKategori(); 
        toggleModalEdit(); 
        setFormEdit({...formEdit, name : '' })
    });
  }

  function deleteKategori () {
    axios.delete(`${apiUrl}/kategori/${selectedId}`, {headers : {Authorization : `Bearer ${userToken}`}})
    .then(res => {
        setMessage(res.data.message)
        setTimeout(function() {
            setMessage('')
        }, 3000);
    })
    .catch(err => {
        setError(err.response.data.message)
        setTimeout(function() {
            setError('')
        }, 3000);
    })
    .finally( () => {
        setSelectedId('')
        getKategori(); 
        toggleModalDelete(); 
    });
  }

  function toggleModalCreate () {
    setShowModalCreate(!showModalCreate)
  }

  function toggleModalEdit () {
    setShowModalEdit(!showModalEdit)
  }

  function toggleModalDelete (id) {
    id != '' ? setSelectedId(id) : ''
    setShowModalDelete(!showModalDelete)
  }

  useEffect(() => {
    getKategori()
  }, [])
  
  return (
    <PageLayout>
      {message &&
        <Alert>{message}</Alert>
      }
      {error &&
        <Alert type="error">{error}</Alert>
      }
      <header><h1 className='text-3xl font-semibold text-neutral-700'>Kategori</h1></header>
      <div className="w-full overflow-x-auto py-4 flex flex-col items-center mt-10">
        <div className="w-10/12">
          <button onClick={() => {toggleModalCreate()}} className='w-fit px-2 py-1 mb-3 bg-blue-500 float-end text-white rounded-md'><i className="fa fa-plus mr-3"></i>Tambah Kategori</button>
          <table className='w-full'>
              <thead className='h-12 text-left text-neutral-700 bg-gray-300 border-b'>
                  <tr>
                      <th className='pe-3 text-center ' width="10%">No</th>
                      <th>Nama</th>
                      <th className='text-center'>Action</th>
                  </tr>
              </thead>
              <tbody className='text-start text-neutral-700'>
                  {kategori.map((item,index) => (
                      <tr key={index} className={`${index % 2 == 0 ? 'bg-neutral-300' : ''} hover:bg-gray-300`}>
                          <td className='text-center pe-3 py-2'>{index+=1}</td>
                          <td className='align-middle h-10'>{item.name}</td>
                          <td className="flex items-center justify-center gap-x-2">
                              <button onClick={() => {getDetailKategori(item.id)}} className='bg-green-700 text-white rounded-lg w-7 h-7 grid place-items-center'><i className="fa fa-pencil text-xs"></i></button>
                              <button onClick={() => {toggleModalDelete(item.id)}} className='bg-red-700 text-white rounded-lg w-7 h-7 grid place-items-center'><i className="fa fa-trash text-xs"></i></button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
      </div>

      {showModalCreate &&
        <Modal title={'tambah kategori'}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
            <input
                value={formCreate.name}
                onChange={(e) => setFormCreate({ ...formCreate, name: e.target.value })}
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan nama barang"
                required
            />
        </div>

        <div className="pt-4 flex justify-end gap-2">
            <button
            type="button"
            onClick={() => {toggleModalCreate()}}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
            Batal
            </button>

            <button
            onClick={() => {createKategori()}}
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
            Submit
            </button>
        </div>
        </Modal>
      }
      {showModalEdit &&
        <Modal title={'edit kategori'}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
            <input
                value={formEdit.name}
                onChange={(e) => setFormEdit({ ...formEdit, name: e.target.value })}
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan nama barang"
                required
            />
        </div>

        <div className="pt-4 flex justify-end gap-2">
            <button
            type="button"
            onClick={() => {toggleModalEdit()}}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
            Batal
            </button>

            <button
            onClick={() => {updateKategori()}}
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
            Submit
            </button>
        </div>
        </Modal>
      }

      {showModalDelete && 
        <Modal title={'hapus data'}>
            <p className='my-4'>Apakah anda yakin ingin menghapus data ini?</p>
            <button onClick={() => {toggleModalDelete()}} className='px-4 py-2 mr-3 bg-neutral-600 text-white rounded hover:bg-neutral-700'>Cancel</button>
            <button onClick={() => {deleteKategori()}} className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>Hapus</button>
        </Modal>
      }
  </PageLayout>
  )
}

export default Kategori