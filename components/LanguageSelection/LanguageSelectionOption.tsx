import { Box } from "@mui/material";
import CustomButton from "@/components/CustomButton";
import { useIntl } from "react-intl";

const LanguageSelectionOption = () => {
  const languages = ["English", "Kannada", "Hindi"];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        width: 140,
        height: 160,
        padding: "12px",
        boxSizing: "border-box",
      }}
    >
      {languages.map((language) => (
        <CustomButton
          key={language}
          buttonText={language}
          buttonTextOrIconColor="#1976D2"
          icon={null}
          isButtonDisabled={false}
          onButtonClicked={() => {}}
          buttonMinWidth="115px"
          buttonHeight="36px"
          buttonFontSize="14px"
          buttonBackgroundColor="#FFFFFF"
          buttonBorderColor="#90CAF9"
          buttonBoxShadow="0 1px 3px rgba(0, 0, 0, 0.08)"
          buttonPadding="6px 16px"
          buttonBorderRadius="8px"
          buttonHoverTextOrIconColor="#FFFFFF"
          buttonHoverBackgroundColor="#1976D2"
          buttonHoverBoxShadow="0 3px 8px rgba(25, 118, 210, 0.25)"
          buttonHoverBorderColor="#1976D2"
          buttonDisabledBackgroundColor="#F5F5F5"
          buttonDisabledTextColor="#9E9E9E"
          buttonDisabledBorderColor="#E0E0E0"
          buttonDisabledBoxShadow="none"
        />
      ))}
    </Box>
  );
};

export default LanguageSelectionOption;
