import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import CustomSnackbar from "@/components/CustomSnackbar/CustomSnackbar";
import CustomPopper from "@/components/CustomPopper/CustomPopper";
import { LanguageProvider } from "./utils/languageTranslation/LanguageContext";
import IntlProviderWrapper from "./utils/languageTranslation/IntlProvider";
import ReduxProvider from "./utils/redux2/ReduxProvider";
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
        <ReduxProvider>
        <LanguageProvider>
          <IntlProviderWrapper> 
          <AppRouterCacheProvider>
              <AppWrapper>{children}</AppWrapper>
              <CustomSnackbar />
              <CustomPopper />
          </AppRouterCacheProvider>
        </IntlProviderWrapper>
        </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
