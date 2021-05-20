import './forgot-password.scss';

import { AuthButton, TextField } from '../auth.styles';
import { AuthMessage, KSAuth } from '@kleeen/auth';
import { CommonProps, handleExceptions } from '../helpers';
import { ForgotPasswordProps, ForgotPasswordState } from './forgot-password.model';
import React, { ChangeEvent } from 'react';

import { ForgotPassword } from 'aws-amplify-react';
import { withSnackbar } from 'notistack';

class CustomForgotPassword extends ForgotPassword {
  constructor(props: ForgotPasswordProps) {
    super(props);
    this._validAuthStates = ['forgotPassword'];
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ [e.target.name]: e.target.value } as unknown);
  }

  /**
   * Handlers
   */

  async forgotPassword(): Promise<void> {
    const { username = '' } = this.state;

    try {
      const options = { username };
      await KSAuth.forgotPassword(options);
      this.setState({ delivery: true });
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  async forgotPasswordSubmit(): Promise<void> {
    const { code, password, username } = this.state as ForgotPasswordState;

    try {
      const options = { username, code, password };
      await KSAuth.forgotPasswordSubmit(options);
      KSAuth.changeState(AuthMessage.SignIn);
      this.setState({ delivery: null, username: '' });
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  showComponent(): JSX.Element {
    return (
      <div className="forgot-password">
        <div className="container">
          <div className="wrap">
            <div className="pic">
              <img src="/assets/logo.png" alt="KS Logo" />
            </div>
            {this.state.delivery ? (
              <form data-testid="forgot-password-section">
                <div className="padding text">Reset your password</div>
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
                <TextField
                  className="input"
                  data-testid="password"
                  key="password"
                  label="New Password"
                  name="password"
                  onChange={this.handleInputChange}
                  required={true}
                  type="password"
                />
                <div className="padding submit">
                  <a className="link" onClick={() => this.forgotPassword()} data-testid="resend-code">
                    Resend Code
                  </a>
                  <AuthButton
                    data-testid="forgot-password"
                    onClick={() => this.forgotPasswordSubmit()}
                    variant="contained"
                  >
                    Submit
                  </AuthButton>
                </div>
              </form>
            ) : (
              <form data-testid="reset-password-section">
                <div className="padding text">Reset your password</div>
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
                <div className="padding confirm">
                  <a
                    className="link"
                    onClick={() => KSAuth.changeState(AuthMessage.SignIn)}
                    data-testid="sign-in"
                  >
                    Back to Sign In
                  </a>
                  <AuthButton
                    data-testid="reset-password"
                    onClick={() => this.forgotPassword()}
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

export default withSnackbar(CustomForgotPassword as any); // eslint-disable-line
