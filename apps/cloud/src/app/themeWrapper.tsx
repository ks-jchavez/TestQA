import React, { useEffect } from 'react';

import { fontFamily } from './settings/font-family';
import { makeStyles } from '@material-ui/core';
import settings from './settings/app.json';
import themeSettings from './settings/theme.json';
import { useTheme } from '@kleeen/react/hooks';

// Add global font class
const useStyles = makeStyles({
  '@global': {
    '.ks-global-font': {
      fontFamily,
    },
  },
  appContainer: {
    background: 'var(--application-background)',
  },
});

function ThemeWrapper({ children }) {
  const { position } = settings.layout;
  const classes = useStyles();
  const { setTheme, themeClass } = useTheme();

  useEffect(() => {
    setTheme(themeSettings);
  }, [setTheme]);

  return (
    <div
      className={`generated-new ${themeClass} ${position} ks-global-font ${classes.appContainer}`}
      data-testid="app-container"
    >
      {children}
    </div>
  );
}

export default ThemeWrapper;
