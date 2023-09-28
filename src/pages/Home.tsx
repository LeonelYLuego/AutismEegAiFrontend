import { Button } from "@mui/material";
import Graph from "../assets/graph-authism.png";
import People from "../assets/people.png"
import Header from "../components/Header";
import Link from "next/link";
import Image from "next/image";
import NewPatient from "../assets/plusone.png"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <div className="w-1/2 p-4 bg-gray-200 align-middle justify-center">
          <div className=" min-h-screen ">
            <Link href="/PatientsList" className="h-[90vh] w-full bg-yellow-300/70 flex align-middle justify-center">
              <div className="h-[90vh] w-full bg-yellow-300/70 flex align-middle justify-center">
                <div className="h-[38rem] w-full bg-gray-300/50 mt-7 ml-5 mr-5 flex flex-col align-middle justify-center">
                  <div className="text-slate-950 text-5xl text-center">Ver pacientes</div>
                  <div className="flex justify-center align-middle mt-20">
                    <Image src={People} alt="patients" width={250} height={250}/>
                  </div>
                </div>
              </div>
            </Link>
            
          </div>
        </div>
        <div className="w-1/2 p-4 bg-gray-200">
          <Link href="/StudiesList" className="h-[90vh] w-full bg-indigo-300/80	 flex align-middle justify-center">
            <div className="h-[90vh] w-full bg-indigo-300/80	 flex align-middle justify-center">
              <div className="h-[38rem] w-full bg-gray-300/50 mt-7 ml-5 mr-5 flex flex-col align-middle justify-center">
                  <div className="text-slate-950 text-5xl text-center">Crear Paciente</div>
                  <div className="flex justify-center align-middle mt-20">
                    <Image src={NewPatient} alt="patients" width={200} height={200}/>
                  </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
