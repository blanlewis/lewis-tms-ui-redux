"use client";

import dynamic from "next/dynamic";
import { useCustomHook } from "@/app/utils/hook";

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
      secondaryListItems={[]}
      appBody={children}
    />
  );
};

export default AppWrapper;