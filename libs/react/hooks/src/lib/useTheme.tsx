import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface Theme {
  flavor: string;
  font?: string;
  kit?: string;
}

interface ThemeContextProps {
  theme: Theme;
  themeClass: string;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export enum ThemeFlavor {
  AppStack = 'appstack',
  Flat = 'flat',
  Glass = 'glass',
  Material = 'material',
  Modern = 'modern',
}

export enum ThemeKit {
  Dark = 'dark',
  Light = 'light',
}

export const DefaultTheme: Theme = {
  flavor: ThemeFlavor.Material,
  font: 'Fira Sans',
  kit: ThemeKit.Light,
};

const defaultThemeClass = `${DefaultTheme.flavor}-${DefaultTheme.kit}`;

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeClass: defaultThemeClass,
  theme: DefaultTheme,
  setTheme: (theme: Theme): Theme => {
    return theme;
  },
});

export function useTheme(): ThemeContextProps {
  const themeContext = useContext(ThemeContext);
  return themeContext;
}

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [theme, setTheme] = useState<Theme>(DefaultTheme);
  const [themeClass, setThemeClass] = useState<string>(defaultThemeClass);

  useEffect(() => {
    setThemeClass(`${theme.flavor}-${theme.kit}`);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        theme,
        themeClass,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
