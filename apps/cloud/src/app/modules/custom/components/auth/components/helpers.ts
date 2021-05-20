import { OptionsObject, SnackbarMessage } from 'notistack';

import { AuthError } from '@kleeen/auth';

export interface CommonProps {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => void;
}

export function handleExceptions(error: Error, props: CommonProps): void {
  const { enqueueSnackbar } = props;
  enqueueSnackbar(
    {
      message: error instanceof AuthError ? error.innerError?.message : error.message,
      title: error.message,
    },
    {
      variant: 'error',
    },
  );
}
