

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Header from '../components/Header'
import patients from '@/utils/patientsData';

export default function PatientsList() {
const [expanded, setExpanded] = React.useState<string | false>(false);

const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    };

return (
    <div>
        <Header/>
        <div>
            {patients.map((data, index) =>(
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '20%', flexShrink: 0 }}>
                    {data.number}
                </Typography>
                <Typography sx={{  width: '20%', color: 'text.secondary' }}>{data.name}</Typography>
                <Typography sx={{  width: '20%', color: 'text.secondary' }}>{data.userID}</Typography>
                <Typography sx={{  width: '20%', color: 'text.secondary' }}>{data.age}</Typography>
                <Typography sx={{  width: '20%', color: 'text.secondary' }}>{data.qtyStudies}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                        Aliquam eget maximus est, id dignissim quam.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            ))}
        </div>
    
    </div>
);
}