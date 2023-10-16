import React, { useEffect, useState } from "react";
import { Button, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Header from "../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState("");

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: TOKEN_AUTH,
    },
  });

  useEffect(() => {

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

  const openDeleteConfirmation = (patientId: string) => {
    setPatientToDelete(patientId);
    setOpenConfirmationDialog(true);
  };

  const closeDeleteConfirmation = () => {
    setOpenConfirmationDialog(false);
  };

  const handlePatientClick = (patientId: string) => {
    router.push(`/patientstudies/${patientId}`);
  };

  const handleDeleteClick = (patientId: string) => {
    axiosInstance
      .delete(`/api/patients/${patientId}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedPatients = patients.filter((patient) => patient.id !== patientId);
          setPatients(updatedPatients);
        } else {
          console.error("Error al eliminar el paciente:", response);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el paciente:", error);
      });  
    closeDeleteConfirmation();
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
              <IconButton
                edge="end"
                onClick={() => openDeleteConfirmation(patient.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Dialog open={openConfirmationDialog} onClose={closeDeleteConfirmation}>
        <DialogTitle>Confirmación de eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar a este paciente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleDeleteClick(patientToDelete);
              closeDeleteConfirmation();
            }}
            color="primary"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PatientsList;
