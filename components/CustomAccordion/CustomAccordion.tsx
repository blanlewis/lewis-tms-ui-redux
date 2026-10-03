"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

interface CustomAccordionProps {
  header: React.ReactNode;
  body: React.ReactNode;
  isExpanded: boolean;
  onExpandChange: () => void;
}

const CustomAccordion = ({
  header,
  body,
  isExpanded,
  onExpandChange,
}: CustomAccordionProps) => {

  return (
    <Accordion
      expanded={isExpanded}
      onChange={onExpandChange}
      sx={{
        borderRadius: "8px",
        boxShadow: "0px 1px 3px rgba(10, 13, 18, 0.1)",

        "&::before": {
          display: "none",
        },

        "&.Mui-expanded": {
          margin: "0px",
          border: "1px solid blue",
          borderRadius: "8px",
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