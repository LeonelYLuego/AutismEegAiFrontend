import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem, ListItemText } from "@mui/material";
import { TOKEN_AUTH } from "../../../config";

interface Study {
  id: string;
  created_on: string;
  result: string;
}

interface StudyListProps {
  patient_id: string | null;
}

const StudyList: React.FC<StudyListProps> = ({ patient_id }) => {
  const [studies, setStudies] = useState<Study[]>([]);

  useEffect(() => {
    console.log("patient_id:", patient_id);
    const fetchData = async () => {
      try {
        // Crear una instancia de axios con la autorización
        const axiosInstance = axios.create({
          baseURL: "http://localhost:3001/api/",
          headers: {
            Authorization: "Bearer " + TOKEN_AUTH,
          },
        });

        const response = await axiosInstance.get(`studies/${patient_id}`);
        setStudies(response.data);
      } catch (error) {
        console.error("Error fetching studies:", error);
      }
    };

    if (patient_id) {
      fetchData();
    }
  }, [patient_id]);

  return (
    <List>
      {studies.map((study) => (
        <ListItem key={study.id}>
          <ListItemText
            primary={`ID: ${study.id}`}
            secondary={`Created On: ${study.created_on}, Result: ${study.result}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default StudyList;
