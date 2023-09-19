"use client"

import Plots from '@/components/Plots'
import Image from 'next/image'
import { TextField } from '@mui/material'

import Graph from '../assets/graph-authism.png'
import Header from '../components/Header'
import UploadButton from '@/components/UploadButton'

export default function Studies() {
return (
    <div className="min-h-screen">
    <Header/>
    <div className="min-h-screen bg-white items-center justify-center align-middle flex-row overflow-hidden">
        
        <div className='flex items-center justify-center align-middle text-black min-h-screen '>
        <div className="min-h-screen w-1/3 p-4 ">
            <h1 className="text-xl font-semibold mb-4">Gráficos de las señales principales</h1>
            <div>
            <Plots/>
            </div>
        </div>
        <div className="h-screen w-2/5 p-4 text-center">
            <div className='flex justify-center items-center align-middle h-full'>
            <Image
                src= {Graph}
                width={600}
                height={600}
                alt="Picture of the author"
            />
            </div>
            
        </div>
        <div className="h-screen w-1/5 mt-7 ">
            <UploadButton w={5} h={5}/>

            <TextField
            id="standard-multiline-static"
            multiline
            rows={20}
            placeholder="Comentarios del diagnostico"
            variant="filled"
            fullWidth 
            className='mt-4'
            />
        </div>
        </div> 
    </div>
    </div>
    
)
}