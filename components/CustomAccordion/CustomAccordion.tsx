"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import CustomButton from "@/components/CustomButton";

import { useDispatch, useSelector } from "react-redux";
import { setReduxHookState } from "@/app/utils/redux2/reduxHookSlice";
import ReduxHookState from "@/app/utils/redux2/types";

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
  const dispatch = useDispatch();

  const reduxHookState = useSelector(
    (state: { reduxHook: ReduxHookState }) => state.reduxHook
  );

  const handleButtonClick = () => {
    dispatch(
      setReduxHookState({
        buttonName: "Save",
        id: 10,
      })
    );
  };

  const handleButtonClick2 = () => {
    dispatch(
      setReduxHookState({
        id: 20,
      })
    );
  };

  const handleButtonClick3 = () => {
    dispatch(
      setReduxHookState({
        buttonName: "Delete",
      })
    );
  };

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

      <CustomButton
        buttonText={reduxHookState.buttonName + " " + reduxHookState.id}
        buttonTextOrIconColor={"#1565C0"}
        icon={null}
        isButtonDisabled={false}
        onButtonClicked={handleButtonClick}
        buttonMinWidth="100px"
        buttonHeight="36px"
        buttonFontSize="14px"
        buttonBackgroundColor={"#0D47A1"}
        buttonBorderColor={"#0D47A1"}
        buttonBoxShadow={"0 2px 6px rgba(13, 71, 161, 0.35)"}
        buttonPadding="6px 16px"
        buttonBorderRadius="4px"
        buttonHoverTextOrIconColor={"#0D47A1"}
        buttonHoverBackgroundColor={"#08306B"}
        buttonHoverBoxShadow={"0 3px 8px rgba(13, 71, 161, 0.45)"}
        buttonHoverBorderColor={"#08306B"}
        buttonDisabledBackgroundColor="#E0E0E0"
        buttonDisabledTextColor="#9E9E9E"
        buttonDisabledBorderColor="#E0E0E0"
        buttonDisabledBoxShadow="none"
      />
        <CustomButton
        buttonText={reduxHookState.buttonName + " " + reduxHookState.id}
        buttonTextOrIconColor={"#1565C0"}
        icon={null}
        isButtonDisabled={false}
        onButtonClicked={handleButtonClick2}
        buttonMinWidth="100px"
        buttonHeight="36px"
        buttonFontSize="14px"
        buttonBackgroundColor={"#0D47A1"}
        buttonBorderColor={"#0D47A1"}
        buttonBoxShadow={"0 2px 6px rgba(13, 71, 161, 0.35)"}
        buttonPadding="6px 16px"
        buttonBorderRadius="4px"
        buttonHoverTextOrIconColor={"#0D47A1"}
        buttonHoverBackgroundColor={"#08306B"}
        buttonHoverBoxShadow={"0 3px 8px rgba(13, 71, 161, 0.45)"}
        buttonHoverBorderColor={"#08306B"}
        buttonDisabledBackgroundColor="#E0E0E0"
        buttonDisabledTextColor="#9E9E9E"
        buttonDisabledBorderColor="#E0E0E0"
        buttonDisabledBoxShadow="none"
      />
        <CustomButton
        buttonText={reduxHookState.buttonName + " " + reduxHookState.id}
        buttonTextOrIconColor={"#1565C0"}
        icon={null}
        isButtonDisabled={false}
        onButtonClicked={handleButtonClick3}
        buttonMinWidth="100px"
        buttonHeight="36px"
        buttonFontSize="14px"
        buttonBackgroundColor={"#0D47A1"}
        buttonBorderColor={"#0D47A1"}
        buttonBoxShadow={"0 2px 6px rgba(13, 71, 161, 0.35)"}
        buttonPadding="6px 16px"
        buttonBorderRadius="4px"
        buttonHoverTextOrIconColor={"#0D47A1"}
        buttonHoverBackgroundColor={"#08306B"}
        buttonHoverBoxShadow={"0 3px 8px rgba(13, 71, 161, 0.45)"}
        buttonHoverBorderColor={"#08306B"}
        buttonDisabledBackgroundColor="#E0E0E0"
        buttonDisabledTextColor="#9E9E9E"
        buttonDisabledBorderColor="#E0E0E0"
        buttonDisabledBoxShadow="none"
      />
    </Accordion>
  );
};

export default CustomAccordion;