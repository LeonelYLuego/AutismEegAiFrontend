import React from "react";
import { useRouter } from "next/router";
import StudyList from "./StudyList";
import Header from "../../components/Header";
import { Typography } from "@mui/material";

const PatientStudiesPage: React.FC = () => {
  const router = useRouter();
  const { patientId } = router.query; // Obtener el patientId de la URL

  return (
    <div>
      <Header />
      <div>
        <StudyList patient_id={patientId as string} />
      </div>
    </div>
  );
};

export default PatientStudiesPage;
