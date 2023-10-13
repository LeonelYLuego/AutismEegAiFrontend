import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
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
  Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    return window.localStorage;
  }
  return null;
};
interface Study {
  id: string;
  created_on: string;
  result: string;
}

const StudyList: React.FC<{ patient_id: string }> = ({ patient_id }) => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [studyToDelete, setStudyToDelete] = useState<string | null>(null);
  const [isAddStudyDialogOpen, setIsAddStudyDialogOpen] = useState(false);

  const localStorage = getLocalStorage();
  const storedToken = localStorage ? localStorage.getItem("token") : null;
  const TOKEN_AUTH = storedToken ? JSON.parse(storedToken) : "";

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

  const handleAddStudy = () => {
    setIsAddStudyDialogOpen(true);
  };

  const handleCloseAddStudyDialog = () => {
    setIsAddStudyDialogOpen(false);
  };

  const handleAddStudyDialogSubmit = async () => {
    try {
      const formData = new FormData();

      const fileInputs = [
        { key: "alfa", index: 0 },
        { key: "beta", index: 1 },
        { key: "gamma", index: 2 },
        { key: "delta", index: 3 },
        { key: "theta", index: 4 },
      ];

      // Iterate over each file input and append the file to the formData
      for (const fileInput of fileInputs) {
        const inputId = `file${fileInput.index + 1}`;
        const inputFile = document.getElementById(inputId) as HTMLInputElement;

        if (inputFile?.files && inputFile.files[0]) {
          formData.append(fileInput.key, inputFile.files[0]);
        } else {
          formData.append(fileInput.key, "Sin archivos seleccionados");
        }
      }

      const response = await axios.post(
        `http://localhost:3001/api/studies/${patient_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${TOKEN_AUTH}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Files uploaded successfully:", response.data);
      // Close the dialog
      handleCloseAddStudyDialog();

      // Reload the page to show the new study
      window.location.reload();
    } catch (error) {
      console.error("Error uploading files:", error);
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

      <Button variant="outlined" color="primary" onClick={handleAddStudy}>
        Agregar Estudio
      </Button>

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

      {/* Agregar estudio */}
      <Dialog
        open={isAddStudyDialogOpen}
        onClose={handleCloseAddStudyDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Agregar Estudio</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            ID del Paciente: {patient_id}
          </Typography>
          <Typography variant="subtitle2">Subir archivos CSV:</Typography>
          {/* Input fields to upload CSV files */}
          {[1, 2, 3, 4, 5].map((index) => (
            <Input
              key={index}
              type="file"
              inputProps={{ multiple: false }}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddStudyDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddStudyDialogSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudyList;
