import React, { useContext, useState } from "react";
import { IntlProvider } from "react-intl";
import { intl, changeLanguage, Language } from "../../utils/language";

interface LocaleProviderProps {
  children: React.ReactNode;
}

const LanguageContext = React.createContext((language: Language) => {});

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [currentIntl, setCurrentIntl] = useState(intl);

  const handleLanguageChange = (language: Language) => {
    setCurrentIntl(changeLanguage(language));
  };

  return (
    <LanguageContext.Provider value={handleLanguageChange}>
      <IntlProvider {...currentIntl}>{children}</IntlProvider>
    </LanguageContext.Provider>
  );
};

export default LocaleProvider;
export const useLanguage = () => useContext(LanguageContext);
