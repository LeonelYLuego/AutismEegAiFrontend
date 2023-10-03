import React, { useContext } from "react";
import StudyList from "./StudyList";

import Header from "../../components/Header";
import PatientContext, { PatientProvider } from "@/utils/patientsContext";

const patientstudies: React.FC = () => {
  const { patientId } = useContext(PatientContext);

  return (
    <PatientProvider>
      <div>
        <Header />
        <div>
          <h1>Lista de Estudios para el Paciente {patientId}</h1>
          <StudyList patient_id={patientId} />
        </div>
      </div>
    </PatientProvider>
  );
};

export default patientstudies;
