import { OptionsObject, SnackbarMessage } from 'notistack';

import { IAuthPieceState } from 'aws-amplify-react/lib-esm/Auth/AuthPiece';
import { ISignUpProps } from 'aws-amplify-react/lib-esm/Auth/SignUp';

export interface SignUpProps extends ISignUpProps {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => void;
}

export interface SignUpState extends IAuthPieceState {
  code: string;
  password: string;
}
