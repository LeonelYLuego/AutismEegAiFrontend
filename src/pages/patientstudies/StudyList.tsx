import React, { useEffect, useState } from "react";
import { API_URL, TOKEN_AUTH } from "../../../config";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

interface Study {
  id: string;
  created_on: string;
  result: string;
}

const StudyList: React.FC<{ patient_id: string }> = ({ patient_id }) => {
  const [studies, setStudies] = useState<Study[]>([]);

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
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">
            No se encontraron estudios para este paciente.
          </Typography>
        )}
      </List>
    </div>
  );
};

export default StudyList;
