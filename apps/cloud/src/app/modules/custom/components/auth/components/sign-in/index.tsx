import './sign-in.scss';

import { AuthMessage, KSAuth } from '@kleeen/auth';
import { CommonProps, handleExceptions } from '../helpers';
import React, { ChangeEvent } from 'react';
import { SignInButton, TextField } from '../auth.styles';
import { SignInProps, SignInState } from './sign-in.model';

import { FEDERATED_BUTTONS_THEME } from './sign-in.styles';
import { SignIn } from 'aws-amplify-react';
import { SignInWithGoogle } from './components';
import { withSnackbar } from 'notistack';

class CustomSignIn extends SignIn {
  constructor(props: SignInProps) {
    super(props);
    this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Handlers
   */

  async signIn(): Promise<void> {
    const { password, username } = this.state as SignInState;
    try {
      const options = { username, password };
      const user = await KSAuth.signIn({ options });
      // Clean form state to avoid issues if the user retry
      ['username', 'password'].forEach((attribute) => this.setState({ [attribute]: '' }));
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  showComponent(): JSX.Element {
    return (
      <div className="login">
        <div className="container">
          <div className="wrap">
            <div className="pic">
              <img src="/assets/logo.png" alt="KS Logo" />
            </div>
            <form data-testid="sign-in-section">
              <TextField
                className="input"
                data-testid="username"
                key="username"
                label="Email"
                name="username"
                onChange={this.handleInputChange}
                required={true}
                type="email"
              />
              <TextField
                className="input"
                data-testid="password"
                key="password"
                label="Password"
                name="password"
                required={true}
                onChange={this.handleInputChange}
                type="password"
              />
              <div className="padding">
                <SignInButton data-testid="sign-in" onClick={() => this.signIn()} variant="contained">
                  Login
                </SignInButton>
              </div>
              <div className="text-center">
                <span className="text">Forgot </span>
                <a
                  className="link"
                  onClick={() => KSAuth.changeState(AuthMessage.ForgotPassword)}
                  data-testid="forgot-password"
                >
                  email | password?
                </a>
                <br />
                <span className="text">No Account? </span>
                <a
                  className="link"
                  onClick={() => KSAuth.changeState(AuthMessage.SignUp)}
                  data-testid="create-account"
                >
                  Create an account using AWS
                </a>
              </div>
              <div className="text text-center padding">or</div>
            </form>
            <SignInWithGoogle theme={FEDERATED_BUTTONS_THEME} />
          </div>
        </div>
      </div>
    );
  }
}

export default withSnackbar(CustomSignIn as any); // eslint-disable-line
