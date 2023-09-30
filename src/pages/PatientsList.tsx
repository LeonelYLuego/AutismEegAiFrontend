import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Header from "../components/Header";
import axios from "axios";
import { API_URL, TOKEN_AUTH } from "../../config";

interface Patient {
  id: string;
  name: string;
  age: number;
}

export default function PatientsList() {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
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
          console.error("La respuesta de la API no es un array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos de pacientes:", error);
      });
  }, []);

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: isExpanded,
    }));
  };

  return (
    <div>
      <Header />
      <div>
        {patients.map((data, index) => (
          <Accordion
            expanded={expanded[index.toString()] || false}
            onChange={handleChange("panel1")}
            key={index}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "20%", flexShrink: 0 }}>
                {data.name}
              </Typography>
              <Typography sx={{ width: "20%", color: "text.secondary" }}>
                {data.id}
              </Typography>
              <Typography sx={{ width: "20%", color: "text.secondary" }}>
                {data.age}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
