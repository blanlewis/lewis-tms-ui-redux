"use client";
import { Button } from "@mui/material";

interface CustomButtonProps {
  readonly buttonText: string;
  readonly buttonTextOrIconColor: string;
  readonly icon: React.ReactNode;
  readonly isButtonDisabled: boolean;
  readonly onButtonClicked:
    | (() => void)
    | ((event: React.MouseEvent<HTMLElement>) => void);
  readonly buttonMinWidth: number | string;
  readonly buttonHeight: number | string;
  readonly buttonFontSize: number | string;
  readonly buttonBackgroundColor: string;
  readonly buttonBorderColor: string;
  readonly buttonBoxShadow: string;
  readonly buttonPadding: string;
  readonly buttonBorderRadius: string;
  readonly buttonHoverTextOrIconColor: string;
  readonly buttonHoverBackgroundColor: string;
  readonly buttonHoverBoxShadow: string;
  readonly buttonHoverBorderColor: string;
  readonly buttonDisabledBackgroundColor: string;
  readonly buttonDisabledTextColor: string;
  readonly buttonDisabledBorderColor: string;
  readonly buttonDisabledBoxShadow: string;
}

const CustomButton = ({
  buttonText,
  buttonTextOrIconColor,
  icon,
  isButtonDisabled,
  onButtonClicked,
  buttonMinWidth,
  buttonHeight,
  buttonFontSize,
  buttonBackgroundColor,
  buttonBorderColor,
  buttonBoxShadow,
  buttonPadding,
  buttonBorderRadius,
  buttonHoverTextOrIconColor,
  buttonHoverBackgroundColor,
  buttonHoverBoxShadow,
  buttonHoverBorderColor,
  buttonDisabledBackgroundColor,
  buttonDisabledTextColor,
  buttonDisabledBorderColor,
  buttonDisabledBoxShadow,
}: CustomButtonProps) => {
  return (
    <Button
      disabled={isButtonDisabled}
      disableRipple
      disableFocusRipple
      onClick={onButtonClicked}
      sx={{
        minWidth: buttonMinWidth,
        height: buttonHeight,
        padding: buttonPadding,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: buttonFontSize,
        fontWeight: 600,
        textTransform: "none",
        color: buttonTextOrIconColor,
        gap: "4px",
        borderRadius: buttonBorderRadius,
        lineHeight: "normal",
        backgroundColor: buttonBackgroundColor,
        border: `1px solid ${buttonBorderColor}`,
        boxShadow: buttonBoxShadow,
        transition: "none",
        "&:hover, &:active": {
          color: buttonHoverTextOrIconColor,
          backgroundColor: buttonHoverBackgroundColor,
          boxShadow: buttonHoverBoxShadow,
          border: `1px solid ${buttonHoverBorderColor}`,
        },
        ...(isButtonDisabled && {
          color: `${buttonDisabledTextColor} !important`,
          backgroundColor: buttonDisabledBackgroundColor,
          border: `1px solid ${buttonDisabledBorderColor}`,
          boxShadow: buttonDisabledBoxShadow,
        }),
      }}
    >
      {icon}
      {buttonText}
    </Button>
  );
};

export default CustomButton;
