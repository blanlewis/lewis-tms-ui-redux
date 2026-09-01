import type { Metadata } from "next";
import "./globals.css";
import { CustomHookProvider } from "./utils/context";

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
        <CustomHookProvider>{children}</CustomHookProvider>
      </body>
    </html>
  );
}
