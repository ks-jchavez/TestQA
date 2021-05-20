import { ErrorFallback, ReduxProvider, StylesProvider } from './components';
import { MessageShape, ToastNotification } from '@kleeen/react/atomic-elements';
import React, { useState } from 'react';

import AppContainer from './app';
import { ErrorBoundary } from 'react-error-boundary';
import { KUICombineProviders } from '@kleeen/core-react';
import { LocalizationContextProvider } from '@kleeen/react/hooks';
import { SnackbarProvider } from 'notistack';

export function App(): JSX.Element {
  const [errorInfo, setErrorInfo] = useState<{ componentStack: string }>(null);

  function onErrorHandler(error: Error, info: { componentStack: string }): void {
    console.error(error);
    console.info(info);
    // TODO: @Guaria set configuration to plug Sentry
    setErrorInfo(info);
  }

  function fallbackComponent({ error }): JSX.Element {
    return <ErrorFallback error={error} info={errorInfo} />;
  }

  return (
    <ErrorBoundary FallbackComponent={fallbackComponent} onError={onErrorHandler}>
      <StylesProvider>
        <LocalizationContextProvider>
          <KUICombineProviders providers={[ReduxProvider]}>
            <SnackbarProvider
              classes={{
                containerRoot: 'custom-noti-stack-container',
              }}
              anchorOrigin={{
                horizontal: 'right',
                vertical: 'top',
              }}
              content={(key, message) => <ToastNotification id={key} message={message as MessageShape} />}
              maxSnack={10}
            >
              <AppContainer />
            </SnackbarProvider>
          </KUICombineProviders>
        </LocalizationContextProvider>
      </StylesProvider>
    </ErrorBoundary>
  );
}
