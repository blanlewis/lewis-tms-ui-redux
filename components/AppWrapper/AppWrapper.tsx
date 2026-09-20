"use client";

import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import { useCustomHook } from "@/app/utils/hook";
import LayoutSwitchToggle from "@/components/LayoutSwitchToggle";
import LayoutPaneRearrange from "@/components/LayoutPaneRearrange";

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
          route: "/lewisTmsDashboard",
        },
      ]}
      secondaryListItems={[
        {
          label: "layout-switch",
          customNode: <LayoutSwitchToggle />,
        },
        {
          label: "layout-pane-rearrange",
          customNode: <LayoutPaneRearrange />,
          onClick: (event) => {
            const anchorEl = event.currentTarget;

            setPopper(
              anchorEl,
              <Box sx={{ p: 2 }}>
                <Typography>
                  Blan
                </Typography>
              </Box>
            );
          },
        },
      ]}
      appBody={children}
      toolbarAvatar={loginId}
    />
  );
};

export default AppWrapper;