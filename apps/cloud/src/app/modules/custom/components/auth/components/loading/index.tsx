import { Loading } from 'aws-amplify-react';
import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece';
import React from 'react';
import './loading.scss';

class CustomLoading extends Loading {
  constructor(props: IAuthPieceProps) {
    super(props);
    this._validAuthStates = ['loading'];
  }

  showComponent(): JSX.Element {
    return <KSLoading />;
  }
}

export function KSLoading(): JSX.Element {
  return (
    <div className="loading">
      <div className="container">
        <div className="wrap">
          <div className="pic">
            <img src="/assets/logo.png" alt="KS Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomLoading;
