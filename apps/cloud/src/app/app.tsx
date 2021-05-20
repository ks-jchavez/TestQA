import './app.scss';
import './assets/styles/custom.scss';
import './assets/styles/custom.css';

import {
  AttributeContextMenuProvider,
  MenuContextProvider,
  ThemeContextProvider,
  WebSocketProvider,
  useLocalization,
} from '@kleeen/react/hooks';
import {
  IconRegistryProvider,
  KUICombineProviders,
  AccessControlProvider as KsAccessControlProvider,
  TranslationProvider,
} from '@kleeen/core-react';
import React, { ReactElement } from 'react';

import { DEFAULT_ROLE } from './settings/default-user-role';
import { KsNotifications } from '@kleeen/react/components';
import Router from './routesLoader';
import ThemeWrapper from './themeWrapper';
import customPermissions from './settings/role-access-keys.custom.json';
import { environment } from '@kleeen/environment';
import iconRegistry from '../assets/icon-registry';
import localeData from './settings/strings-translations.json';
import { merge } from 'lodash';
import permissions from './settings/role-access-keys.json';
import { useServiceWorker } from './useServiceWorker';

merge(permissions, customPermissions);

const AccessControlProvider = ({ children }) => (
  <KsAccessControlProvider
    accessControlSettings={{
      permissions,
      pathToRoleOnState: 'endUser.currentUser.role',
      defaultRole: DEFAULT_ROLE,
    }}
  >
    {children}
  </KsAccessControlProvider>
);

function App(): ReactElement {
  useServiceWorker();
  const { language } = useLocalization();
  const TranslateProvider = TranslationProvider({
    localeData,
    locale: language,
    defaultLocale: 'en',
    onError: (err: string): void => {
      console.debug('TranslateProvider', err);
    },
  });

  return (
    <React.StrictMode>
      <div className="app">
        <TranslateProvider>
          <KUICombineProviders
            providers={[
              AccessControlProvider,
              IconRegistryProvider({ iconRegistry }),
              MenuContextProvider,
              AttributeContextMenuProvider,
              WebSocketProvider,
              ThemeContextProvider,
            ]}
          >
            <KsNotifications />
            <ThemeWrapper>
              <Router />
              <footer>{environment.deployment.version}</footer>
            </ThemeWrapper>
          </KUICombineProviders>
        </TranslateProvider>
      </div>
    </React.StrictMode>
  );
}

export default App;
