"use client";

import dynamic from "next/dynamic";
import { useCustomHook } from "@/app/utils/hook";
import { Box } from "@mui/material";
import LayoutPaneRearrange from "@/components/LayoutPaneRearrange";
import LayoutSwitchAndPaneReArrangement from "@/components/LayoutSwitchAndPaneReArrangement";
import { LanguageSelectionIcon, LanguageSelectionOption } from "@/components/LanguageSelection";

const CommonMiniDrawerLayout = dynamic(
  () => import("@/components/CommonMiniDrawerLayout"),
  { ssr: false }
);

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const { loginId, setPopper } = useCustomHook();

  const isLoggedIn = Boolean(loginId);

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
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
            setPopper(
              anchorEl,
              <LayoutSwitchAndPaneReArrangement />,
              "right",
              "layout-pane-rearrange"
            );
          },
        },
        {
          label: "language-selection",
          customNode: <Box><LanguageSelectionIcon /></Box>,
          onClick: (event) => {
            const anchorEl = event.currentTarget;
            setPopper(
              anchorEl,
              <LanguageSelectionOption />,
              "right",
              "language-selection"
            );
          },
        }
      ]}
      appBody={children}
      toolbarAvatar={loginId}
    />
  );
};

export default AppWrapper;