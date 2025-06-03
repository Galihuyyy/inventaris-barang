import React, { useEffect, useRef, useState } from 'react'
import { PageLayout } from '../../assets/components/Layouts/PageLayout'
import getToken from '../../utils/helper'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'

const LaporanBarangKeluar = () => {
    const [laporanBarangKeluar, setLaporanBarangKeluar] = useState([])
    const [filter, setFilter] = useState({
        tanggal_mulai : '',
        tanggal_akhir : ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const apiUrl = import.meta.env.VITE_API_URL
    const userToken = getToken()

    const contentRef = useRef()
    const reactToPrintFn = useReactToPrint({ contentRef })

    function getLaporanBarangKeluar(filter) {
        axios.get(`${apiUrl}/laporan-barang-keluar?tanggal_mulai=${filter.tanggal_mulai}&tanggal_akhir=${filter.tanggal_akhir}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(res => {
            setLaporanBarangKeluar(res.data.data)
            setIsSubmitted(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        getLaporanBarangKeluar(filter)
    }


    return (
        <PageLayout>
            <header>
                <h1 className='text-3xl font-semibold text-neutral-700 mb-12'>Laporan Barang Keluar</h1>
            </header>

            <form onSubmit={handleSubmit} className="my-4 flex flex-wrap gap-4 items-center bg-white rounded-xl px-3 py-6">
                <div className='flex flex-col gap-y-4'>
                    <label htmlFor="tanggal_mulai" className="text-lg font-medium text-neutral-700">Tanggal Mulai:</label>
                    <input
                        id="tanggal_mulai"
                        type="date"
                        value={filter.tanggal_mulai}
                        onChange={e => setFilter({ ...filter, tanggal_mulai: e.target.value })}
                        className="px-3 py-2 border rounded-md"
                    ></input>
                </div>
                <div className="flex flex-col gap-y-4">
                    <label htmlFor="tanggal_akhir" className="text-lg font-medium text-neutral-700">Tanggal Akhir:</label>
                    <input
                        id="tanggal_akhir"
                        type="date"
                        value={filter.tanggal_akhir}
                        onChange={e => setFilter({ ...filter, tanggal_akhir: e.target.value })}
                        className="px-3 py-2 border rounded-md"
                    ></input>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mt-auto mb-1"
                >
                    Tampilkan
                </button>
                {isSubmitted && (
                    <button
                        type="button"
                        onClick={reactToPrintFn}
                        className="px-4 py-2 bg-green-600 text-white rounded-md mt-auto mb-1"
                    >
                        Cetak
                    </button>
                )}
            </form>

            {isSubmitted && (
                <div className="w-full overflow-x-scroll py-4 bg-white rounded-xl px-6" ref={contentRef}>
                    <h1 className='mb-3'>
                        <i className="fa fa-book-open text-neutral-600"></i>
                        <span className='ml-2 text-neutral-600'> Laporan Barang Keluar Tanggal <b>{filter.tanggal_mulai}</b> s/d <b>{filter.tanggal_akhir}</b></span>
                    </h1>
                    <table className="w-full">
                        <thead className='h-12 text-left text-neutral-700 border-b-[1px]'>
                            <tr>
                                <th className='pe-3 text-center'>No</th>
                                <th className='pe-3 text-center'>ID Transaksi</th>
                                <th>Tanggal</th>
                                <th>Barang</th>
                                <th className='w-40'>Jumlah Keluar</th>
                                <th className='w-30 text-center'>Satuan</th>
                            </tr>
                        </thead>
                        <tbody className='text-start text-neutral-700'>
                            {laporanBarangKeluar.map((item, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : ''} hover:bg-gray-300`}>
                                    <td className='text-center pe-3 py-2'>{index + 1}</td>
                                    <td className='text-center pe-3 py-2'>{item.id}</td>
                                    <td className=' pe-3 py-2'>{item.tanggal}</td>
                                    <td className='flex items-center gap-2 align-middle'>
                                        <img src={item.barang.foto_barang} className="w-10 h-10 object-cover" />
                                        {item.barang.name}
                                    </td>
                                    <td className='text-center'>{item.jumlah}</td>
                                    <td>{item.barang.satuan.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        {laporanBarangKeluar.length == 0 &&
                            <h1 className='text-center my-5'>Tidak ada data dalam rentang tanggal tersebut</h1>
                        }
                </div>
            )}
        </PageLayout>
    )
}

export default LaporanBarangKeluar
