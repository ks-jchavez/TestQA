import './sign-up.scss';

import { AuthButton, TextField } from '../auth.styles';
import { AuthMessage, KSAuth, SignUpOptions } from '@kleeen/auth';
import { CommonProps, handleExceptions } from '../helpers';
import React, { ChangeEvent, ReactNode } from 'react';

import { ISignUpProps } from 'aws-amplify-react/lib-esm/Auth/SignUp';
import { SignUp } from 'aws-amplify-react';
import { SignUpState } from './sign-up.model';
import { withSnackbar } from 'notistack';

class CustomSignUp extends SignUp {
  constructor(props: ISignUpProps) {
    super(props);
    this._validAuthStates = ['signUp', 'confirmSignUp'];
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Handlers
   */

  async confirmSignUp(): Promise<void> {
    const { code, username = '' } = this.state as SignUpState;

    try {
      const options = { username, code };
      await KSAuth.confirmSignUp({ options });
      KSAuth.changeState(AuthMessage.SignIn);

      // Clean form state to avoid issues if the user retry
      ['username', 'code'].forEach((attribute) => this.setState({ [attribute]: '' }));
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  async resendSignUp(): Promise<void> {
    const { username = '' } = this.state as SignUpState;

    try {
      const options = { username };
      await KSAuth.resendSignUp({ options });
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  async signUp(): Promise<void> {
    const { username = '', password } = this.state as SignUpState;

    try {
      const options: SignUpOptions = { username, password, attributes: { email: username } };
      await KSAuth.signUp({ options });
      KSAuth.changeState(AuthMessage.ConfirmSignUp, username);

      // Clean form state to avoid issues if the user retry
      ['password'].forEach((attribute) => this.setState({ [attribute]: '' }));
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  showComponent(): ReactNode {
    const { username } = this.state;

    return (
      <div className="sign-up">
        <div className="container">
          <div className="wrap">
            <div className="pic">
              <img src="/assets/logo.png" alt="KS Logo" />
            </div>
            {this.props.authState === 'signUp' && (
              <form data-testid="sign-up-section">
                <TextField
                  className="input"
                  data-testid="email"
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
                  onChange={this.handleInputChange}
                  required={true}
                  type="password"
                />
                <div className="padding create-account">
                  <span className="text">
                    Have an account?
                    <a
                      className="link"
                      onClick={() => KSAuth.changeState(AuthMessage.SignIn)}
                      data-testid="sign-in"
                    >
                      Sign in
                    </a>
                  </span>

                  <AuthButton data-testid="sign-up" onClick={() => this.signUp()} variant="contained">
                    Create Account
                  </AuthButton>
                </div>
              </form>
            )}
            {this.props.authState === 'confirmSignUp' && (
              <form data-testid="confirm-sign-up-section">
                <TextField
                  className="input"
                  data-testid="email"
                  disabled={true}
                  key="username"
                  label="Email"
                  name="username"
                  required={true}
                  type="email"
                  value={username}
                />
                <TextField
                  className="input"
                  data-testid="code"
                  key="code"
                  label="Confirmation Code"
                  name="code"
                  onChange={this.handleInputChange}
                  required={true}
                  type="text"
                />
                <div className="padding resend-code">
                  <span className="text">
                    Lost your code?
                    <a className="link" onClick={() => this.resendSignUp()} data-testid="resend-code">
                      Resend Code
                    </a>
                  </span>
                </div>
                <div className="padding confirm">
                  <a
                    className="link"
                    onClick={() => KSAuth.changeState(AuthMessage.SignIn)}
                    data-testid="sign-in"
                  >
                    Back to Sign In
                  </a>
                  <AuthButton
                    data-testid="confirm-sign-up"
                    onClick={() => this.confirmSignUp()}
                    variant="contained"
                  >
                    Confirm
                  </AuthButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withSnackbar(CustomSignUp as any); // eslint-disable-line
