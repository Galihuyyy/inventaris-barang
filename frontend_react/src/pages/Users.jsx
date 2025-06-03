import React, { useEffect, useState } from 'react'
import { PageLayout } from '../assets/components/Layouts/PageLayout'
import getToken from '../utils/helper'
import axios from 'axios'
import Alert from '../assets/components/Alert/Alert'
import Modal from '../assets/components/Modal/Modal'

const Users = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    const userToken = getToken()

    const [users, setUsers] = useState([])

    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    const [selectedId, setSelectedId] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    
    const [formCreate, setFormCreate] = useState({
        username : '',
        email : '',
        password : '',
        role : ''
    })

    const [formEdit, setFormEdit] = useState({
        username : '',
        email : '',
        role : ''
    })

    function getDetailUser (id) {
        setSelectedId(id)
        
        axios.get(`${apiUrl}/user/${id}`, {headers : {Authorization  :`Bearer ${userToken}`}})
        .then(res => {
            let user = res.data.data 
            setFormEdit({...formEdit, 
                username : user.username,
                email : user.email,
                role : user.role
            })
            setShowModalEdit(!showModalEdit)
        })
        .catch(err => {
            console.log(err)
        })
    }


    function getUsers () {
        axios.get(`${apiUrl}/user`, {
            headers : {
                Authorization : `Bearer ${userToken}`
            }
        })
        .then(res => {
            console.log(res.data.data)
            setUsers(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function createUser () {
        axios.post(`${apiUrl}/user`, formCreate, {
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
            getUsers(); 
            toggleModalCreate(); 
            setFormCreate({
                username : '',
                email : '',
                password : '',
                role : ''
            });
        });
    }

    function updateUser () {
        axios.put(`${apiUrl}/user/${selectedId}`, formEdit, {headers : {Authorization : `Bearer ${userToken}`}})
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
            getUsers(); 
            toggleModalEdit(); 
            setFormEdit({...formEdit,
                username : '',
                email : '',
                role : '' })
        });
    }

     function deleteUser () {
        axios.delete(`${apiUrl}/user/${selectedId}`, {headers : {Authorization : `Bearer ${userToken}`}})
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
            getUsers(); 
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
        getUsers()
    }, [])
    
  return (
    <PageLayout>
        {message &&
            <Alert>{message}</Alert>
        }
        {error &&
            <Alert type="error">{error}</Alert>
        }
        <header><h1 className='text-3xl font-semibold text-neutral-700'>Users</h1></header>
        <div className="w-full overflow-x-scroll py-4">
            <button onClick={() => {toggleModalCreate()}} className=' px-2 py-1 mb-3 bg-blue-500 float-end text-white rounded-md'><i className="fa fa-plus mr-3"></i>Tambah User</button>
            <table className="w-full">
                <thead className='h-12 text-left text-neutral-700 bg-gray-300 border-b'>
                    <tr>
                        <th className='pe-3 text-center '>No</th>
                        <th width="10%">Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody className='text-start text-neutral-700'>
                    {users.map((item,index) => (
                        <tr key={index} className={`${index % 2 == 0 ? 'bg-neutral-300' : ''} hover:bg-gray-300`}>
                            <td className='text-center pe-3 py-2'>{index+=1}</td>
                            <td className='text-center'>{item.username}</td>
                            <td className='text-start'>{item.email}</td>
                            <td className=''>
                                <span
                                    className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
                                    item.role === 'administrator'
                                        ? 'bg-red-500'
                                        : item.role === 'admin gudang'
                                        ? 'bg-green-500'
                                        : item.role === 'kepala gudang'
                                        ? 'bg-gray-500'
                                        : 'bg-gray-500'
                                    }`}
                                >
                                    {item.role}
                                </span>
                            </td>

                            <td className="flex items-center justify-center gap-x-2">
                                <button onClick={() => {getDetailUser(item.id)}} className='bg-green-700 text-white rounded-lg w-7 h-7 grid place-items-center'><i className="fa fa-pencil text-xs"></i></button>
                                <button onClick={() => {toggleModalDelete(item.id)}} className='bg-red-700 text-white rounded-lg w-7 h-7 grid place-items-center'><i className="fa fa-trash text-xs"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {showModalCreate &&
            <Modal title={'tambah user'}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                    value={formCreate.username}
                    onChange={(e) => setFormCreate({ ...formCreate, username: e.target.value })}
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan Username"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    value={formCreate.email}
                    onChange={(e) => setFormCreate({ ...formCreate, email: e.target.value })}
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan Email"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    value={formCreate.password}
                    onChange={(e) => setFormCreate({ ...formCreate, password: e.target.value })}
                    type="password"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan Password"
                    required
                />
            </div>
            <div className='mb-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                value={formCreate.role}
                onChange={(e) => {setFormCreate({...formCreate, role : e.target.value})}}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                <option value="">Pilih Role</option>
                <option value="administrator">administrator</option>
                <option value="admin gudang">admin gudang</option>
                <option value="kepala gudang">kepala gudang</option>
                </select>
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
                onClick={() => {createUser()}}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                Submit
                </button>
            </div>
            </Modal>
        }

        {showModalEdit &&
            <Modal title={'edit user'}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                    value={formEdit.username}
                    onChange={(e) => setFormEdit({ ...formEdit, username: e.target.value })}
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan Username"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    value={formEdit.email}
                    onChange={(e) => setFormEdit({ ...formEdit, email: e.target.value })}
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan Email"
                    required
                />
            </div>
            <div className='mb-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                value={formEdit.role}
                onChange={(e) => {setFormEdit({ ...formEdit, role : e.target.value })}}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Pilih Role</option>
                    <option value="administrator" >administrator</option>
                    <option value="admin gudang">admin gudang</option>
                    <option value="kepala gudang">kepala gudang</option>
                </select>
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
                onClick={() => {updateUser()}}
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
                <button onClick={() => {deleteUser()}} className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>Hapus</button>
            </Modal>
        }
    </PageLayout>
  )
}

export default Users