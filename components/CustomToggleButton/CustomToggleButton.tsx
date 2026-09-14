"use client";

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

interface ToggleDataProps {
  readonly label: string;
  readonly icon: React.ReactNode;
  readonly value: string;
}

interface CustomToggleButtonProps {
  readonly toggleData: ToggleDataProps[];
  readonly selectedToggle: string | null;
  readonly setSelectedToggle: (value: string | null) => void;
}

const CustomToggleButton = ({
  toggleData,
  selectedToggle,
  setSelectedToggle,
}: CustomToggleButtonProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    selected: string | null
  ) => {
    setSelectedToggle(selected);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={selectedToggle}
      exclusive
      onChange={handleChange}
      sx={{
        height: 40,
        borderRadius: 2,
        backgroundColor: "#FFF",
        border: "1px solid #D5D7DA",
        boxShadow:
          "inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px 0px rgba(10, 13, 18, 0.05), 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        "& .MuiToggleButtonGroup-firstButton": {
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
        },
        "& .MuiToggleButtonGroup-lastButton": {
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
        },
      }}
    >
      {toggleData.map(({ icon, label, value: toggleValue }) => (
        <ToggleButton
          key={toggleValue}
          value={toggleValue}
          disableRipple
          sx={{
            minWidth: 44,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default CustomToggleButton;