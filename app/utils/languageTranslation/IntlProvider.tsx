"use client";

import { ReactNode } from "react";
import { IntlProvider } from "react-intl";

import { useLanguage } from "./LanguageContext";

import en from "./locales/en.json";
import kn from "./locales/ka.json";
import hi from "./locales/hi.json";

const messages = {
  en,
  kn,
  hi,
};

interface IntlProviderWrapperProps {
  children: ReactNode;
}

const IntlProviderWrapper = ({
  children,
}: IntlProviderWrapperProps) => {
  const { locale } = useLanguage();

  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale="en"
    >
      {children}
    </IntlProvider>
  );
};

export default IntlProviderWrapper;