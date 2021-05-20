import '@aws-amplify/ui/dist/style.css';

import { AuthChannel, AuthMessage, Integrations, KSAuth } from '@kleeen/auth';
import { CustomForgotPassword, CustomLoading, CustomSignIn, CustomSignUp, KSLoading } from './components';
import React, { ReactElement, useEffect, useState } from 'react';

import { Authenticator } from 'aws-amplify-react';
import { Helpers } from '@kleeen/render-utils';
import { Hub } from '@aws-amplify/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { isNilOrEmpty } from '@kleeen/common/utils';
import awsDefaultConfig from './aws-exports';

const useAuthStateOnRouteChange = (setAuthState) => {
  function onAuthStateChange(data): void {
    const { payload } = data;
    const { event } = payload;
    let loginWorkflow = event;
    switch (event) {
      case AuthMessage.Configured:
      case AuthMessage.SignOut:
      case AuthMessage.SignedOut:
        loginWorkflow = AuthMessage.SignIn;
        break;

      default:
        loginWorkflow = event;
        break;
    }
    setAuthState(loginWorkflow);
  }

  useEffect(() => {
    Hub.listen(AuthChannel, onAuthStateChange);
    return () => {
      Hub.remove(AuthChannel, onAuthStateChange);
    };
  }, []);
};

KSAuth.configure({
  authenticationHandler: new Integrations.CognitoAuthenticationHandler(awsDefaultConfig),
});

const RETRY_LIMIT_TO_GET_THE_COMPUTED_STYLES = 10;

// eslint-disable-next-line
function KleeenAuthenticator({
  children,
  isAuthorized,
  authState,
  setAuthState,
  isEnabled,
  ...props
}): ReactElement {
  /**
   * This effects try to get the primary and secondary color from rendered app
   * for that reason we have to retry in order to get the color after the browser
   * rendered the app component, after we got the colors the effect stop trying or
   * we reach the retries limit [RETRY_LIMIT_TO_GET_THE_COMPUTED_STYLES]
   */
  const [defaultMaterialTheme, setDefaultMaterialTheme] = useState({});
  const [continueTrying, setContinueTrying] = useState(0);

  useAuthStateOnRouteChange(setAuthState);

  useEffect(() => {
    const primaryColor = Helpers.DOM.getAppPrimaryColor();
    const secondaryColor = Helpers.DOM.getAppSecondaryColor();
    if (primaryColor && secondaryColor && isNilOrEmpty(defaultMaterialTheme)) {
      setDefaultMaterialTheme({
        palette: {
          primary: {
            main: primaryColor,
          },
          secondary: {
            main: secondaryColor,
          },
        },
      });
    } else if (continueTrying < RETRY_LIMIT_TO_GET_THE_COMPUTED_STYLES) {
      setContinueTrying(continueTrying + 1);
    }
  }, [continueTrying, defaultMaterialTheme]);

  return (
    <ThemeProvider theme={createMuiTheme(defaultMaterialTheme)}>
      {isEnabled ? (
        <CustomAuthenticator {...props} authState={authState} currentAuthState={authState}>
          <ContentValidator {...props} currentAuthState={authState} isAuthorized={isAuthorized}>
            {children}
          </ContentValidator>
        </CustomAuthenticator>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}

function CustomAuthenticator({ children, ...props }): ReactElement {
  return (
    <Authenticator hideDefault={true} {...props}>
      <CustomForgotPassword />
      <CustomLoading />
      <CustomSignIn />
      <CustomSignUp />
      {children}
    </Authenticator>
  );
}

function ContentValidator({
  children,
  currentAuthState,
  isAuthorized = true,
  onStateChange,
}: {
  children: JSX.Element;
  currentAuthState: string;
  isAuthorized: boolean;
  onStateChange?: (state: string, data?: any) => void;
}): ReactElement | null {
  if ([currentAuthState].some((state: string): boolean => state !== AuthMessage.SignedIn)) {
    if (onStateChange) {
      onStateChange(currentAuthState);
    }
    return null;
  }
  if (onStateChange) {
    onStateChange(AuthMessage.SignedIn);
  }

  if (isAuthorized) {
    return children;
  }
  return <KSLoading />;
}

export default KleeenAuthenticator;
