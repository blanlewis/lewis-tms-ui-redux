import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CustomHookProvider } from "./utils/context";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import CustomSnackbar from "@/components/CustomSnackbar/CustomSnackbar";
import CustomPopper from "@/components/CustomPopper/CustomPopper";
import { LanguageProvider } from "./utils/languageTranslation/LanguageContext";
import IntlProviderWrapper from "./utils/languageTranslation/IntlProvider";
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
        <LanguageProvider>
          <IntlProviderWrapper> 
          <AppRouterCacheProvider>
            <CustomHookProvider>  
              <AppWrapper>{children}</AppWrapper>
              <CustomSnackbar />
              <CustomPopper />
            </CustomHookProvider>
          </AppRouterCacheProvider>
        </IntlProviderWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
