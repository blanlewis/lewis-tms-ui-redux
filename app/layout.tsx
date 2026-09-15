import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CustomHookProvider } from "./utils/context";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import CustomSnackbar from "@/components/CustomSnackbar/CustomSnackbar";

export const metadata: Metadata = {
  title: "Lewis TMS",
  description: "Lewis Transport Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <CustomHookProvider>
            <AppWrapper>{children}</AppWrapper>
            <CustomSnackbar />
          </CustomHookProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
