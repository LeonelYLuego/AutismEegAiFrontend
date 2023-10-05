import React, { useEffect, useState } from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import Header from "../components/Header";
import axios from "axios";
import { API_URL, TOKEN_AUTH } from "../../config";
import router from "next/router";

interface Patient {
  id: string;
  name: string;
  age: number;
}

const PatientsList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

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
    router.push(`/patientstudies/${patientId}`);
  };

  return (
    <div>
      <Header />
      <div>
        <List>
          {patients.map((patient) => (
            <ListItem key={patient.id}>
              <ListItemText primary={`${patient.name}`} />
              <ListItemText primary={`${patient.id}`} />
              <ListItemText primary={`${patient.age}`} />
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
