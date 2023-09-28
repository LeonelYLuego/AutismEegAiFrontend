import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Header from "../components/Header";
import patients from "@/utils/patientsData";

export default function PatientsList() {
  const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({});


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
                {data.number}
              </Typography>
              <Typography sx={{ width: "20%", color: "text.secondary" }}>
                {data.name}
              </Typography>
              <Typography sx={{ width: "20%", color: "text.secondary" }}>
                {data.userID}
              </Typography>
              <Typography sx={{ width: "20%", color: "text.secondary" }}>
                {data.age}
              </Typography>
              <Typography sx={{ width: "20%", color: "text.secondary" }}>
                {data.qtyStudies}
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
