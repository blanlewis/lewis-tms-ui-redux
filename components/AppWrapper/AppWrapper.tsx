"use client";

import dynamic from "next/dynamic";
import { useCustomHook } from "@/app/utils/hook";
import LayoutSwitchToggle from "@/components/LayoutSwitchToggle";
import LayoutPaneRearrange from "@/components/LayoutPaneRearrange";

const CommonMiniDrawerLayout = dynamic(
  () => import("@/components/CommonMiniDrawerLayout"),
  { ssr: false }
);

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const { loginId } = useCustomHook();
  const isLoggedIn = Boolean(loginId);

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <CommonMiniDrawerLayout
      appHeaderTitle="Lewis TMS"
      firstListItems={[
        { label: "Lewis TMS Dashboard", route: "/lewisTmsDashboard" },
      ]}
      secondaryListItems={[
        { label: "layout-switch", customNode: <LayoutSwitchToggle /> },
        { label:"layout-pane-rearrange",customNode: <LayoutPaneRearrange /> }
      ]}
      appBody={children}
      toolbarAvatar={loginId}
    />
  );
};

export default AppWrapper;