import { Button } from '@mui/material'
import Graph from '../assets/graph-authism.png'
import Header from '../components/Header'
import UploadButton from '@/components/UploadButton'

export default function Home() {
return (
    <div className="min-h-screen">
    <Header/>
    <div className="flex">
        <div className="w-1/2 p-4 bg-gray-200 align-middle justify-center">
            <div className=' min-h-screen '>
                <UploadButton w={5} h={5}/>
            </div>
        </div>
        <div className="w-1/2 p-4 bg-gray-300">
            <Button>

            </Button>
        </div>
    </div>
</div>
    
)
}
