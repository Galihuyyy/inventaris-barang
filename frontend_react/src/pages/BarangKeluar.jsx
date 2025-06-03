import React, { useEffect, useState } from 'react'
import { PageLayout } from '../assets/components/Layouts/PageLayout'
import getToken from '../utils/helper'
import axios from 'axios'
import Alert from '../assets/components/Alert/Alert'
import Modal from '../assets/components/Modal/Modal'

const BarangKeluar = () => {

    
    const apiUrl = import.meta.env.VITE_API_URL
    const userToken = getToken()

    const [barang, setBarang] = useState([])
    const [barangKeluar, setBarangKeluar] = useState([])
    
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    const [selectedId, setSelectedId] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    
    const [formCreate, setFormCreate] = useState({
        tanggal : '',
        barang_id : '',
        jumlah : ''
    })

    function getBarang () {
        axios.get(`${apiUrl}/barang`, {
            headers : {
                Authorization : `Bearer ${userToken}`
            }
        })
        .then(res => {
            setBarang(res.data.data)
            console.log(res.data.data)
        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }

    function getBarangKeluar () {
        axios.get(`${apiUrl}/barang-keluar`, {
            headers : {
                Authorization : `Bearer ${userToken}`
            }
        })
        .then(res => {
            console.log(res.data.data)
            setBarangKeluar(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function createBarangKeluar () {
        axios.post(`${apiUrl}/barang-keluar`, formCreate, {
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
            getBarangKeluar(); 
            toggleModalCreate(); 
            setFormCreate({
                tanggal : '',
                barang_id : '',
                jumlah : ''
            });
        });
    }

    function deleteBarangKeluar () {
        axios.delete(`${apiUrl}/barang-keluar/${selectedId}`, {headers : {Authorization : `Bearer ${userToken}`}})
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
            getBarangKeluar(); 
            toggleModalDelete(); 
        });
    }

    function toggleModalCreate () {
        setShowModalCreate(!showModalCreate)
    }

    function toggleModalDelete (id) {
        id != '' ? setSelectedId(id) : ''
        setShowModalDelete(!showModalDelete)
    }

    useEffect(() => {
        getBarang()
        getBarangKeluar()
    }, [])
    
  return (
    <PageLayout>
        {message &&
            <Alert>{message}</Alert>
        }
        {error &&
            <Alert type="error">{error}</Alert>
        }
        <header><h1 className='text-3xl font-semibold text-neutral-700'>Barang Keluar</h1></header>
        <div className="w-full overflow-x-scroll py-4">
            <button onClick={() => {toggleModalCreate()}} className=' px-2 py-1 mb-3 bg-blue-500 float-end text-white rounded-md'><i className="fa fa-plus mr-3"></i>Tambah Barang Keluar</button>
            <table className="w-full">
                <thead className='h-12 text-left text-neutral-700 bg-gray-300 border-b'>
                    <tr>
                        <th className='pe-3 text-center '>No</th>
                        <th width="10%">ID Transaksi</th>
                        <th>Tanggal</th>
                        <th>Barang</th>
                        <th className='w-40'>Jumlah Keluar</th>
                        <th className='w-32'>Satuan</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody className='text-start text-neutral-700'>
                    {barangKeluar.map((item,index) => (
                        <tr key={index} className={`${index % 2 == 0 ? 'bg-neutral-300' : ''} hover:bg-gray-300`}>
                            <td className='text-center pe-3 py-2'>{index+=1}</td>
                            <td className='text-center'>{item.id}</td>
                            <td className='text-start'>{item.tanggal}</td>
                            <td className='flex items-center gap-2 align-middle'><img src={item.barang.foto_barang} className="max-w-12" />{item.barang.name}</td>
                            <td className='text-center'>{item.jumlah}</td>
                            <td className='text-stat'>{item.barang.satuan.name}</td>
                            <td className="flex items-center justify-center gap-x-2">
                                <button onClick={() => {toggleModalDelete(item.id)}} className='bg-red-700 text-white rounded-lg w-7 h-7 grid place-items-center'><i className="fa fa-trash text-xs"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {showModalCreate &&
            <Modal title={'tambah barang keluar'}>
            <div className='mb-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                <input
                    value={formCreate.tanggal}
                    onChange={(e) => setFormCreate({ ...formCreate, tanggal: e.target.value })}
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan Tanggal"
                    required
                />
            </div>
            <div className='mb-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Barang</label>
                <select
                value={formCreate.barang_id}
                onChange={(e) => {setFormCreate({...formCreate, barang_id : e.target.value})}}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                <option value="">Pilih Barang</option>
                {barang.map(item => (
                    <option key={item.id} value={item.id}>{item.id} - {item.name}</option>
                ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                <input
                    value={formCreate.jumlah}
                    onChange={(e) => setFormCreate({ ...formCreate, jumlah: e.target.value })}
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan Jumlah"
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
                onClick={() => {createBarangKeluar()}}
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
                <button onClick={() => {deleteBarangKeluar()}} className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>Hapus</button>
            </Modal>
        }
    </PageLayout>
  )
}

export default BarangKeluar