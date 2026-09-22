"use client";

import Box from "@mui/material/Box";
import CustomTabs from "@/components/CustomTabs";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { useCustomHook } from "@/app/utils/hook";
import {
  PageLayoutEnum,
  PageLayoutPaneEnum,
} from "@/app/utils/types";

import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import CustomDragAndDrop from "@/components/CustomDragAndDrop";

const LayoutSwitchAndPaneReArrangement = () => {
  const [
    activeTabOfLayoutSwitchAndPaneReArrangement,
    setActiveTabOfLayoutSwitchAndPaneReArrangement,
  ] = useState("layout-switch");

  const { pageLayout, setPageLayout } = useCustomHook();

  const selectedColor = "#2970FF";
  const defaultColor = "#344054";
  const hoverColor = "#2970FF";

  const pageLayoutPaneToId: Record<
    PageLayoutPaneEnum,
    string
  > = {
    [PageLayoutPaneEnum.DOSSIER_PANE]: "dossier",
    [PageLayoutPaneEnum.MAP_PANE]: "map",
    [PageLayoutPaneEnum.BOOKING_PANE]: "booking",
  };

  const paneIdToPageLayoutPane: Record<
    string,
    PageLayoutPaneEnum
  > = {
    dossier: PageLayoutPaneEnum.DOSSIER_PANE,
    map: PageLayoutPaneEnum.MAP_PANE,
    booking: PageLayoutPaneEnum.BOOKING_PANE,
  };
  
  const paneOrder = [
    pageLayout.pane1,
    pageLayout.pane2,
    pageLayout.pane3,
  ].map((pane) => pageLayoutPaneToId[pane]);

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
            initialOrder={paneOrder}
            onRearrange={(newOrder) => {
              setPageLayout({
                pane1: paneIdToPageLayoutPane[newOrder[0]],
                pane2: paneIdToPageLayoutPane[newOrder[1]],
                pane3: paneIdToPageLayoutPane[newOrder[2]],
              });
            }}
          >
            {/* Dossier */}
            <CustomDragAndDrop.Item id="dossier">
              <Box
                sx={{
                  width: "100%",
                  height: "36px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#344054",
                  borderRadius: "6px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0D5DD",
                  boxSizing: "border-box",
                  padding: "6px 12px",
                  cursor: "grab",
                  userSelect: "none",
                }}
              >
                Dossier
              </Box>
            </CustomDragAndDrop.Item>

            {/* Map */}
            <CustomDragAndDrop.Item id="map">
              <Box
                sx={{
                  width: "100%",
                  height: "36px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#344054",
                  borderRadius: "6px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0D5DD",
                  boxSizing: "border-box",
                  padding: "6px 12px",
                  cursor: "grab",
                  userSelect: "none",
                }}
              >
                Map
              </Box>
            </CustomDragAndDrop.Item>

            {/* Booking */}
            <CustomDragAndDrop.Item id="booking">
              <Box
                sx={{
                  width: "100%",
                  height: "36px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#344054",
                  borderRadius: "6px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0D5DD",
                  boxSizing: "border-box",
                  padding: "6px 12px",
                  cursor: "grab",
                  userSelect: "none",
                }}
              >
                Booking
              </Box>
            </CustomDragAndDrop.Item>
          </CustomDragAndDrop>
        </Box>
      ),
    },
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