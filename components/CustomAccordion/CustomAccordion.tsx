"use client";

import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

interface CustomAccordionProps {
  header: React.ReactNode;
  body: React.ReactNode;
}

const CustomAccordion = ({ header, body }: CustomAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded((prev) => !prev)}
      sx={{
        boxShadow: "0px 1px 3px rgba(10, 13, 18, 0.1)",
        "&.Mui-expanded": {
            margin: "0px",
            border:"1px solid blue"
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {header}
      </AccordionSummary>
      <AccordionDetails>{body}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;