import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

interface LocalizationContextProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<string>>;
}

export enum Language {
  en = 'en',
  es = 'es',
}

const defaultLanguage = Language.en;

export const LocalizationContext = React.createContext<LocalizationContextProps>({
  language: defaultLanguage,
  setLanguage: (language: string): string => {
    return language;
  },
});

export function useLocalization(): LocalizationContextProps {
  const themeContext = useContext(LocalizationContext);

  return themeContext;
}

export const LocalizationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  return (
    <LocalizationContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
