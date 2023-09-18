"use client"

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Header from '../components/Header'
import studies from '@/utils/studiesList';

export default function StudiesList() {
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
        <Header/>
        <div>
            {studies.map((data, index) =>(
                <Accordion 
                expanded={expanded[index] || false} 
                onChange={handleChange(index.toString())}
                key={index}
                >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '25%', flexShrink: 0 }}>
                    {data.id}
                </Typography>
                <Typography sx={{  width: '25%', color: 'text.secondary' }}>{data.created_at}</Typography>
                <Typography sx={{  width: '25%', color: 'text.secondary' }}>{data.result}</Typography>
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