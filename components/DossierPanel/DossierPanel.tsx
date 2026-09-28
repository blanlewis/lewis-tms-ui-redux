import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CustomAccordion from "../CustomAccordion/CustomAccordion";

const dossierData = [
    { id: "DOS-1001", source: "Udupi", destination: "Mangalore", status: "PLANNED" },
    { id: "DOS-1002", source: "Mangalore", destination: "Kundapura", status: "UNPLANNED" },
    { id: "DOS-1003", source: "Kundapura", destination: "Malpe", status: "PRE_PLANNED" },
    { id: "DOS-1004", source: "Malpe", destination: "Puttur", status: "ACTIVE" },
    { id: "DOS-1005", source: "Puttur", destination: "Bangalore", status: "DONE" },
    { id: "DOS-1006", source: "Bangalore", destination: "Mysore", status: "PLANNED" },
    { id: "DOS-1007", source: "Mysore", destination: "Hassan", status: "DELAYED" },
    { id: "DOS-1008", source: "Hassan", destination: "Shimoga", status: "ACTIVE" },
    { id: "DOS-1009", source: "Shimoga", destination: "Udupi", status: "DONE" },
    { id: "DOS-1010", source: "Udupi", destination: "Karkala", status: "PLANNED" },

    { id: "DOS-1011", source: "Karkala", destination: "Moodbidri", status: "UNPLANNED" },
    { id: "DOS-1012", source: "Moodbidri", destination: "Mangalore", status: "PRE_PLANNED" },
    { id: "DOS-1013", source: "Mangalore", destination: "Surathkal", status: "ACTIVE" },
    { id: "DOS-1014", source: "Surathkal", destination: "Mulki", status: "PLANNED" },
    { id: "DOS-1015", source: "Mulki", destination: "Udupi", status: "DONE" },
    { id: "DOS-1016", source: "Udupi", destination: "Kundapura", status: "DELAYED" },
    { id: "DOS-1017", source: "Kundapura", destination: "Byndoor", status: "PLANNED" },
    { id: "DOS-1018", source: "Byndoor", destination: "Bhatkal", status: "UNPLANNED" },
    { id: "DOS-1019", source: "Bhatkal", destination: "Honnavar", status: "ACTIVE" },
    { id: "DOS-1020", source: "Honnavar", destination: "Kumta", status: "DONE" },

    { id: "DOS-1021", source: "Kumta", destination: "Gokarna", status: "PLANNED" },
    { id: "DOS-1022", source: "Gokarna", destination: "Karwar", status: "PRE_PLANNED" },
    { id: "DOS-1023", source: "Karwar", destination: "Goa", status: "ACTIVE" },
    { id: "DOS-1024", source: "Goa", destination: "Belgaum", status: "DELAYED" },
    { id: "DOS-1025", source: "Belgaum", destination: "Dharwad", status: "DONE" },
    { id: "DOS-1026", source: "Dharwad", destination: "Hubli", status: "PLANNED" },
    { id: "DOS-1027", source: "Hubli", destination: "Davangere", status: "UNPLANNED" },
    { id: "DOS-1028", source: "Davangere", destination: "Chitradurga", status: "ACTIVE" },
    { id: "DOS-1029", source: "Chitradurga", destination: "Tumkur", status: "PRE_PLANNED" },
    { id: "DOS-1030", source: "Tumkur", destination: "Bangalore", status: "DONE" },

    { id: "DOS-1031", source: "Bangalore", destination: "Kolar", status: "PLANNED" },
    { id: "DOS-1032", source: "Kolar", destination: "Chikballapur", status: "ACTIVE" },
    { id: "DOS-1033", source: "Chikballapur", destination: "Bangalore", status: "DELAYED" },
    { id: "DOS-1034", source: "Bangalore", destination: "Mandya", status: "UNPLANNED" },
    { id: "DOS-1035", source: "Mandya", destination: "Mysore", status: "DONE" },
    { id: "DOS-1036", source: "Mysore", destination: "Madikeri", status: "PLANNED" },
    { id: "DOS-1037", source: "Madikeri", destination: "Mangalore", status: "ACTIVE" },
    { id: "DOS-1038", source: "Mangalore", destination: "Kasargod", status: "PRE_PLANNED" },
    { id: "DOS-1039", source: "Kasargod", destination: "Kannur", status: "DELAYED" },
    { id: "DOS-1040", source: "Kannur", destination: "Kozhikode", status: "PLANNED" },
];

const DossierPanel = () => {
    const [expandedDossier, setExpandedDossier] = useState<string | null>(null);

    const handleAccordionChange = (dossierId: string) => {
        setExpandedDossier((prev) =>
            prev === dossierId ? null : dossierId
        );
    };

    return (
        <Box
            sx={{
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
                height: "100%",
            }}
        >
            {dossierData.map((dossier) => (
                <CustomAccordion
                    key={dossier.id}
                    header={
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Typography>
                                {dossier.id}
                            </Typography>

                            <Typography>
                                {dossier.source}
                            </Typography>

                            <TrendingFlatIcon />

                            <Typography>
                                {dossier.destination}
                            </Typography>

                            <Typography>
                                {dossier.status}
                            </Typography>
                        </Box>
                    }
                    body={
                        <Box>
                            <Typography>
                                Dossier ID: {dossier.id}
                            </Typography>

                            <Typography>
                                Status: {dossier.status}
                            </Typography>
                        </Box>
                    }
                    isExpanded={expandedDossier === dossier.id}
                    onExpandChange={() =>
                        handleAccordionChange(dossier.id)
                    }
                />
            ))}
        </Box>
    );
};

export default DossierPanel;