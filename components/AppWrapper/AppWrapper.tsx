"use client";

import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import LayoutPaneRearrange from "@/components/LayoutPaneRearrange";
import LayoutSwitchAndPaneReArrangement from "@/components/LayoutSwitchAndPaneReArrangement";
import {
  LanguageSelectionIcon,
  LanguageSelectionOption,
} from "@/components/LanguageSelection";
import CustomPopper from "@/components/CustomPopper";

import { RootState } from "@/app/utils/redux2/store";

const CommonMiniDrawerLayout = dynamic(
  () => import("@/components/CommonMiniDrawerLayout"),
  { ssr: false }
);

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const loginId = useSelector(
    (state: RootState) => state.reduxHook.loginId
  );

  const [popper, setPopper] = useState<{
    anchorElForPopper: HTMLElement | null;
    popperContent: React.ReactNode | null;
    popperPlacement: "top" | "bottom" | "left" | "right";
    popupKey: string | null;
  }>({
    anchorElForPopper: null,
    popperContent: null,
    popperPlacement: "bottom",
    popupKey: null,
  });

  const handleClosePopper = () => {
    setPopper({
      anchorElForPopper: null,
      popperContent: null,
      popperPlacement: "bottom",
      popupKey: null,
    });
  };

  const isLoggedIn = Boolean(loginId);

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <>
      <CommonMiniDrawerLayout
        appHeaderTitle="Lewis TMS"
        firstListItems={[
          {
            label: "Lewis TMS Dashboard",
            route: "/lewisTmsDashboardPage",
          },
        ]}
        secondaryListItems={[
          {
            label: "layout-pane-rearrange",
            customNode: <LayoutPaneRearrange />,
            onClick: (event) => {
              const anchorEl = event.currentTarget;

              setPopper({
                anchorElForPopper: anchorEl,
                popperContent: <LayoutSwitchAndPaneReArrangement />,
                popperPlacement: "right",
                popupKey: "layout-pane-rearrange",
              });
            },
          },
          {
            label: "language-selection",
            customNode: (
              <Box>
                <LanguageSelectionIcon />
              </Box>
            ),
            onClick: (event) => {
              const anchorEl = event.currentTarget;

              setPopper({
                anchorElForPopper: anchorEl,
                popperContent: <LanguageSelectionOption />,
                popperPlacement: "right",
                popupKey: "language-selection",
              });
            },
          },
        ]}
        appBody={children}
        toolbarAvatar={loginId}
      />

      <CustomPopper
        anchorElForPopper={popper.anchorElForPopper}
        popperContent={popper.popperContent}
        popperPlacement={popper.popperPlacement}
        popupKey={popper.popupKey}
        onClose={handleClosePopper}
      />
    </>
  );
};

export default AppWrapper;