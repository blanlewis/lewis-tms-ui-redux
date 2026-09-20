"use client";

import Box from "@mui/material/Box";
import CustomTabs from "@/components/CustomTabs";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { useCustomHook } from "@/app/utils/hook";
import { useRef } from "react";
import { PageLayoutEnum } from "@/app/utils/types";

import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import CustomDragAndDrop from "@/components/CustomDragAndDrop";

const LayoutSwitchAndPaneReArrangement = () => {
  const [
    activeTabOfLayoutSwitchAndPaneReArrangement,
    setActiveTabOfLayoutSwitchAndPaneReArrangement,
  ] = useState("layout-switch");

  const { pageLayout, setPageLayout } = useCustomHook();
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedColor = "#2970FF";
  const defaultColor = "#344054";
  const hoverColor = "#2970FF";

  const tabsData = [
    {
      label: "Layout Switch",
      value: "layout-switch",

      content: (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
          }}
        >
          {/* Two Panel */}
          <CustomButton
            buttonText="Two panel"
            buttonTextOrIconColor={
              pageLayout.layout === PageLayoutEnum.TWO_PANEL_LAYOUT
                ? selectedColor
                : defaultColor
            }
            icon={
              <ViewAgendaIcon
                sx={{
                  transform: "rotate(90deg)",
                }}
              />
            }
            isButtonDisabled={false}
            onButtonClicked={() =>
              setPageLayout({
                layout: PageLayoutEnum.TWO_PANEL_LAYOUT,
              })
            }
            buttonMinWidth="100px"
            buttonHeight="36px"
            buttonFontSize="14px"
            buttonBackgroundColor="#FFFFFF"
            buttonBorderColor="#D0D5DD"
            buttonBoxShadow="none"
            buttonPadding="6px 12px"
            buttonBorderRadius="6px"
            buttonHoverTextOrIconColor={hoverColor}
            buttonHoverBackgroundColor="#F0F6FF"
            buttonHoverBoxShadow="none"
            buttonHoverBorderColor={selectedColor}
            buttonDisabledBackgroundColor="#F5F5F5"
            buttonDisabledTextColor="#999999"
            buttonDisabledBorderColor="#D0D0D0"
            buttonDisabledBoxShadow="none"
          />

          {/* Three Panel */}
          <CustomButton
            buttonText="Three panel"
            buttonTextOrIconColor={
              pageLayout.layout === PageLayoutEnum.THREE_PANEL_LAYOUT
                ? selectedColor
                : defaultColor
            }
            icon={
              <AutoAwesomeMosaicIcon
                sx={{
                  transform: "rotate(180deg)",
                }}
              />
            }
            isButtonDisabled={false}
            onButtonClicked={() =>
              setPageLayout({
                layout: PageLayoutEnum.THREE_PANEL_LAYOUT,
              })
            }
            buttonMinWidth="100px"
            buttonHeight="36px"
            buttonFontSize="14px"
            buttonBackgroundColor="#FFFFFF"
            buttonBorderColor="#D0D5DD"
            buttonBoxShadow="none"
            buttonPadding="6px 12px"
            buttonBorderRadius="6px"
            buttonHoverTextOrIconColor={hoverColor}
            buttonHoverBackgroundColor="#F0F6FF"
            buttonHoverBoxShadow="none"
            buttonHoverBorderColor={selectedColor}
            buttonDisabledBackgroundColor="#F5F5F5"
            buttonDisabledTextColor="#999999"
            buttonDisabledBorderColor="#D0D0D0"
            buttonDisabledBoxShadow="none"
          />

          {/* Classic */}
          <CustomButton
            buttonText="Classic"
            buttonTextOrIconColor={
              pageLayout.layout === PageLayoutEnum.CLASSIC
                ? selectedColor
                : defaultColor
            }
            icon={
              <AutoAwesomeMosaicIcon
                sx={{
                  transform: "rotate(270deg)",
                }}
              />
            }
            isButtonDisabled={false}
            onButtonClicked={() =>
              setPageLayout({
                layout: PageLayoutEnum.CLASSIC,
              })
            }
            buttonMinWidth="100px"
            buttonHeight="36px"
            buttonFontSize="14px"
            buttonBackgroundColor="#FFFFFF"
            buttonBorderColor="#D0D5DD"
            buttonBoxShadow="none"
            buttonPadding="6px 12px"
            buttonBorderRadius="6px"
            buttonHoverTextOrIconColor={hoverColor}
            buttonHoverBackgroundColor="#F0F6FF"
            buttonHoverBoxShadow="none"
            buttonHoverBorderColor={selectedColor}
            buttonDisabledBackgroundColor="#F5F5F5"
            buttonDisabledTextColor="#999999"
            buttonDisabledBorderColor="#D0D0D0"
            buttonDisabledBoxShadow="none"
          />
        </Box>
      ),
    },

    {
    label: "Pane Re-Arrangement",
    value: "pane-re-arrangement",

    content: (
        <Box
        ref={containerRef}
        sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
            overflow: "hidden",
        }}
        >
            <CustomDragAndDrop
                items={[
                {
                    id: "dossier",
                    label: "Dossier",
                },
                {
                    id: "map",
                    label: "Map",
                },
                {
                    id: "booking",
                    label: "Booking",
                },
                ]}
                containerRef={containerRef}
            />
        </Box>
    ),
    }
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <CustomTabs
        tabsData={tabsData}
        value={activeTabOfLayoutSwitchAndPaneReArrangement}
        setValue={
          setActiveTabOfLayoutSwitchAndPaneReArrangement as (
            value: string
          ) => void
        }
      />
    </Box>
  );
};

export default LayoutSwitchAndPaneReArrangement;