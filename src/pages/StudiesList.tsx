import React, { useEffect, useState } from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import Header from "../components/Header";
import axios from "axios";
import { API_URL, TOKEN_AUTH } from "../../config";
import { useRouter } from "next/router"; // Importa useRouter desde next/router

interface Patient {
  id: string;
  name: string;
  age: number;
}

const PatientsList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const router = useRouter(); // Obtén el objeto de enrutamiento

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
    console.log(patientId);
    router.push(`/patientsudies/${patientId}`); // Navega a la ruta dinámica al hacer clic
  };

  return (
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
  );
};

export default PatientsList;
