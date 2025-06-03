import React, { useEffect, useState, useRef } from 'react'
import { PageLayout } from '../../assets/components/Layouts/PageLayout'
import getToken from '../../utils/helper'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'

const LaporanStok = () => {
    const [laporanStok, setLaporanStok] = useState([])
    const [filter, setFilter] = useState('semua')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const apiUrl = import.meta.env.VITE_API_URL
    const userToken = getToken()
    
    const contentRef = useRef() 
    const reactToPrintFn = useReactToPrint({ contentRef });

    function getLaporanStok(filter) {
        axios.get(`${apiUrl}/laporan-stok?filter_stok=${filter}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(res => {
            setLaporanStok(res.data.data)
            setIsSubmitted(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        getLaporanStok(filter)
    }


    return (
        <PageLayout>
            <header>
                <h1 className='text-3xl font-semibold text-neutral-700'>Laporan Stok</h1>
            </header>

            <form onSubmit={handleSubmit} className="my-4 flex flex-wrap gap-4 items-center bg-white rounded-xl px-3 py-6">
                <label htmlFor="filter" className="text-lg font-medium text-neutral-700">Pilih Jenis Stok:</label>
                <select
                    id="filter"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                >
                    <option value="semua">Semua</option>
                    <option value="minimum">Minimum</option>
                </select>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Tampilkan
                </button>

                {isSubmitted && (
                    <button
                        type="button"
                        onClick={reactToPrintFn}
                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                    >
                        Cetak
                    </button>
                )}
            </form>

            {isSubmitted && (
                <div className="w-full overflow-x-scroll py-4 bg-white rounded-xl px-6" ref={contentRef}>
                    <table className="w-full">
                        <thead className='h-12 text-left text-neutral-700 border-b-[1px]'>
                            <tr>
                                <th className='pe-3 text-center'>No</th>
                                <th className='pe-3 text-center'>ID Barang</th>
                                <th>Nama Barang</th>
                                <th className='w-40'>Kategori</th>
                                <th className='w-30 text-center'>Stok</th>
                                <th className='w-32'>Satuan</th>
                            </tr>
                        </thead>
                        <tbody className='text-start text-neutral-700'>
                            {laporanStok.map((item, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : ''} hover:bg-gray-300`}>
                                    <td className='text-center pe-3 py-2'>{index + 1}</td>
                                    <td className='text-center pe-3 py-2'>{item.id}</td>
                                    <td className='flex items-center gap-2 align-middle'>
                                        <img src={item.foto_barang} className="w-10 h-10 object-cover" />
                                        {item.name}
                                    </td>
                                    <td>{item.kategori}</td>
                                    <td className='text-center'>{item.stok}</td>
                                    <td>{item.satuan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {laporanStok.length === 0 && (
                        <h1 className='text-center my-5'>Tidak ada data</h1>
                    )}
                </div>
            )}
        </PageLayout>
    )
}

export default LaporanStok
