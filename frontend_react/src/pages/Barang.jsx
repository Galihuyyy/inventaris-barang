import React, { useEffect, useState } from 'react'
import { PageLayout } from '../assets/components/Layouts/PageLayout'
import getToken from '../utils/helper'
import axios from 'axios'
import Modal from '../assets/components/Modal/Modal'
import Alert from '../assets/components/Alert/Alert'

const Barang = () => {

    const [barang, setBarang] = useState([])
    const [kategori, setKategori] = useState([])
    const [satuan, setSatuan] = useState([])
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [selectedId, setSelectedId] = useState('')
    
    const [formCreateBarang, setFormCreateBarang] = useState({
        foto_barang : '',
        name : '',
        kategori_id : '',
        satuan_id : '',
        batas_minimal_stok : ''
    })
    const [formEditBarang, setFormEditBarang] = useState({
        foto_barang : '',
        name : '',
        kategori_id : '',
        satuan_id : '',
        batas_minimal_stok : ''
    })

    const apiUrl = import.meta.env.VITE_API_URL
    const userToken = getToken()

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

    function getDetailBarang (id) {

        setSelectedId(id)
        
        axios.get(`${apiUrl}/barang/${id}`, {headers : {Authorization  :`Bearer ${userToken}`}})
        .then(res => {
            let barang = res.data.data 
            setFormEditBarang({...formEditBarang, 
                                id : barang.id,
                                name : barang.name,
                                kategori_id : barang.kategori.id,
                                satuan_id : barang.satuan.id,
                                batas_minimal_stok : barang.batas_minimal_stok
                            })
            setShowModalEdit(!showModalEdit)
        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }

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
    function getSatuan () {
        axios.get(`${apiUrl}/satuan`, {headers : {Authorization : `Bearer ${userToken}`}})
        .then(res => {
            setSatuan(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function createBarang (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('foto_barang', formCreateBarang.foto_barang);
        formData.append('name', formCreateBarang.name);
        formData.append('kategori_id', formCreateBarang.kategori_id);
        formData.append('satuan_id', formCreateBarang.satuan_id);
        formData.append('batas_minimal_stok', formCreateBarang.batas_minimal_stok);

        axios.post(`${apiUrl}/barang`, formData, {
            headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
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
            getBarang(); 
            toggleModalCreate(); 
            setFormCreateBarang({
                foto_barang : '',
                name : '',
                kategori_id : '',
                satuan_id : '',
                batas_minimal_stok : ''
            });
        });
    }

    function updateBarang (e) {

        e.preventDefault()

        axios.put(`${apiUrl}/barang/${selectedId}`, formEditBarang, {headers : {Authorization : `Bearer ${userToken}`}})
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
            getBarang(); 
            toggleModalEdit(); 
            setFormCreateBarang({
                foto_barang : '',
                name : '',
                kategori_id : '',
                satuan_id : '',
                batas_minimal_stok : ''
            });
        });
    }

    function deleteBarang () {
        axios.delete(`${apiUrl}/barang/${selectedId}`, {headers : {Authorization : `Bearer ${userToken}`}})
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
            getBarang(); 
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
        getBarang()
        getKategori()
        getSatuan()


    }, [])
    
  return (
    <PageLayout>
        {message &&
            <Alert>{message}</Alert>
        }
        {error &&
            <Alert type="error">{error}</Alert>
        }
        <header><h1 className='text-3xl font-semibold text-neutral-700'>Barang</h1></header>
        <div className="w-full overflow-x-scroll py-4">
            <button onClick={() => {toggleModalCreate()}} className=' px-2 py-1 mb-3 bg-blue-500 float-end text-white rounded-md'><i className="fa fa-plus mr-3"></i>Tambah Barang</button>
            <table className="w-full">
                <thead className='h-12 text-left text-neutral-700 bg-gray-300 border-b'>
                    <tr>
                        <th className='pe-3 text-center '>No</th>
                        <th>Nama</th>
                        <th className='w-40'>Kategori</th>
                        <th className='w-32'>Satuan</th>
                        <th className='w-30 text-center'>Stok</th>
                        <th className='w-22'>Batas Stok</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody className='text-start text-neutral-700'>
                    {barang.map((item,index) => (
                        <tr key={index} className={`${index % 2 == 0 ? 'bg-neutral-300' : ''} hover:bg-gray-300`}>
                            <td className='text-center pe-3 py-2'>{index+=1}</td>
                            <td className='flex items-center gap-2 align-middle'>
                                <img src={item.foto_barang} className="max-w-16" />{
                                item.name}
                            </td>
                            <td>{item.kategori}</td>
                            <td>{item.satuan}</td>
                            <td className='text-center'>{item.stok}</td>
                            <td className='text-center'>{item.batas_minimal_stok}</td>
                            <td className="flex items-center justify-center gap-x-2">
                                <button onClick={() => {getDetailBarang(item.id)}} className='bg-green-700 text-white rounded-lg w-7 h-7 grid place-items-center'><i className="fa fa-pencil text-xs"></i></button>
                                <button onClick={() => {toggleModalDelete(item.id)}} className='bg-red-700 text-white rounded-lg w-7 h-7 grid place-items-center'><i className="fa fa-trash text-xs"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             
            {showModalCreate &&
                <Modal title={"Tambah Data Barang"}>
                    <form className="space-y-4" encType='multipart/form-data' onSubmit={(e) => {createBarang(e)}}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Foto Barang</label>
                                <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {setFormCreateBarang({...formCreateBarang, foto_barang : e.target.files[0]})}}
                                className="block w-full border border-gray-300 rounded px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
                                required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Barang</label>
                                <input
                                value={formCreateBarang.name}
                                onChange={(e) => {setFormCreateBarang({...formCreateBarang, name : e.target.value})}}
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Masukkan nama barang"
                                required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Batas Minimal Stok</label>
                                <input
                                value={formCreateBarang.batas_minimal_stok}
                                onChange={(e) => {setFormCreateBarang({...formCreateBarang, batas_minimal_stok : e.target.value})}}
                                type="number"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Contoh: 5"
                                required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                <select
                                value={formCreateBarang.kategori_id}
                                onChange={(e) => {setFormCreateBarang({...formCreateBarang, kategori_id : e.target.value})}}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                <option value="">Pilih Kategori</option>
                                {kategori.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Satuan</label>
                                <select
                                value={formCreateBarang.satuan_id}
                                onChange={(e) => {setFormCreateBarang({...formCreateBarang, satuan_id : e.target.value})}}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Pilih Satuan</option>
                                {satuan.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                                </select>
                            </div>
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
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                        </div>
                    </form>
                </Modal>
            }

            {showModalEdit &&
                <Modal title={"Edit Data Barang"}>
                    <form className="space-y-4" encType="multipart/form-data" onSubmit={(e) => updateBarang(e)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Barang</label>
                                <input
                                    value={formEditBarang.name}
                                    onChange={(e) => setFormEditBarang({ ...formEditBarang, name: e.target.value })}
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Masukkan nama barang"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Batas Minimal Stok</label>
                                <input
                                    value={formEditBarang.batas_minimal_stok}
                                    onChange={(e) => setFormEditBarang({ ...formEditBarang, batas_minimal_stok: e.target.value })}
                                    type="number"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Contoh: 5"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                <select
                                    value={formEditBarang.kategori_id}
                                    onChange={(e) => setFormEditBarang({ ...formEditBarang, kategori_id: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Pilih Kategori</option>
                                    {kategori.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Satuan</label>
                                <select
                                    value={formEditBarang.satuan_id}
                                    onChange={(e) => setFormEditBarang({ ...formEditBarang, satuan_id: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Pilih Satuan</option>
                                    {satuan.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                            <button
                            type="button"
                            onClick={toggleModalEdit}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                            Batal
                            </button>

                            <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                            Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </Modal>
            }

            {showModalDelete && 
                <Modal title={'hapus data'}>
                    <p className='my-4'>Apakah anda yakin ingin menghapus data ini?</p>
                    <button onClick={() => {toggleModalDelete()}} className='px-4 py-2 mr-3 bg-neutral-600 text-white rounded hover:bg-neutral-700'>Cancel</button>
                    <button onClick={() => {deleteBarang()}} className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>Hapus</button>
                </Modal>
            }

        </div>
    </PageLayout>
  )
}

export default Barang