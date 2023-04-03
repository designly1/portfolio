import React from 'react'
import Heading from '../UI/Heading'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function RequesterResult({ results, headers }) {
    return (
        <div className="flex flex-col gap-6 bg-bg0 md:min-h-screen px-4 py-20">
            <Heading type='h1'>Results</Heading>
            {
                headers
                    ?
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Response Headers</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <pre>{headers}</pre>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    : <></>
            }
            <pre className="overflow-auto md:min-h-[400px]">{results}</pre>
        </div>
    )
}
