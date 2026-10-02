import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import CustomSnackbar from "@/components/CustomSnackbar/CustomSnackbar";
import CustomPopper from "@/components/CustomPopper/CustomPopper";
import { LanguageProvider } from "./utils/languageTranslation/LanguageContext";
import IntlProviderWrapper from "./utils/languageTranslation/IntlProvider";
import { CustomHookProvider } from "./utils/customHook/context";
import store from "./redux2/store";
import { Provider } from "react-redux";
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
        {/* <Provider store={store}> */}
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
        {/* </Provider> */}
      </body>
    </html>
  );
}
