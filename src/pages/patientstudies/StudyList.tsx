import React, { useEffect, useState } from "react";
import { API_URL, TOKEN_AUTH } from "../../../config";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

interface Study {
  id: string;
  created_on: string;
  result: string;
}

const StudyList: React.FC<{ patient_id: string }> = ({ patient_id }) => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [studyToDelete, setStudyToDelete] = useState<string | null>(null);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${TOKEN_AUTH}`,
      },
    });

    axiosInstance
      .get(`/api/studies/${patient_id}`)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setStudies(response.data.data as Study[]);
        } else {
          console.error(
            "La respuesta de la API no es un array:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos de studios:", error);
      });
  }, [patient_id]);

  const handleDeleteStudy = (studyId: string) => {
    setStudyToDelete(studyId);
  };

  const confirmDeleteStudy = () => {
    if (studyToDelete) {
      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${TOKEN_AUTH}`,
        },
      });

      axiosInstance
        .delete(`/api/studies/${patient_id}/${studyToDelete}`)
        .then((response) => {
          // Handle successful deletion
          // Update the state to remove the deleted study from the list
          setStudies((prevStudies) =>
            prevStudies.filter((study) => study.id !== studyToDelete)
          );
          setStudyToDelete(null);
        })
        .catch((error) => {
          console.error("Error al eliminar el estudio:", error);
          setStudyToDelete(null);
        });
    }
  };

  return (
    <div>
      <Typography variant="h5">Lista de Estudios {patient_id}: </Typography>
      <List>
        <hr />
        {studies.length > 0 ? (
          studies.map((study) => (
            <ListItem key={study.id}>
              <ListItemText primary={`${study.id}`} />
              <ListItemText primary={`${study.created_on}`} />
              <ListItemText primary={`${study.result}`} />
              <IconButton
                color="secondary"
                onClick={() => handleDeleteStudy(study.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">
            No se encontraron estudios para este paciente.
          </Typography>
        )}
      </List>
      {/* Confirmación de eliminación */}
      <Dialog open={!!studyToDelete} onClose={() => setStudyToDelete(null)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este estudio?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStudyToDelete(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDeleteStudy} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudyList;
