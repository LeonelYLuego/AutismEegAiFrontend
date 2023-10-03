import React, { useContext, useEffect, useState } from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/router";

import Header from "../components/Header";
import axios from "axios";
import { API_URL, TOKEN_AUTH } from "../../config";
import PatientContext, { PatientProvider } from "@/utils/patientsContext";

interface Patient {
  id: string;
  name: string;
  age: number;
}

export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const router = useRouter();
  const { setPatientId } = useContext(PatientContext);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: TOKEN_AUTH,
      },
    });

    axiosInstance
      .get("/api/patients")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setPatients(response.data.data as Patient[]);
        } else {
          console.error(
            "La respuesta de la API no es un array:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos de pacientes:", error);
      });
  }, []);

  const handlePatientClick = (patientId: string) => {
    setPatientId(patientId);
    console.log(patientId);
    router.push("/patientstudies");
  };

  return (
    <PatientProvider>
      <div>
        <Header />
        <div>
          <List>
            {patients.map((patient) => (
              <ListItem key={patient.id}>
                <ListItemText
                  primary={`Nombre: ${patient.name}, ID: ${patient.id}, Edad: ${patient.age}`}
                />
                <Button
                  variant="outlined"
                  onClick={() => handlePatientClick(patient.id)}
                >
                  Ver estudios
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </PatientProvider>
  );
}
