import { Autocomplete, Paper } from './autocomplete.styles';
import React, { ReactElement } from 'react';

import { KsAutocompleteProps } from './autocomplete.model';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@kleeen/react/hooks';

// TODO: cafe should we use KsTextField here instead?
export function KsAutocomplete({
  textFieldProps,
  renderInput = (params) => <TextField variant="outlined" {...params} {...textFieldProps} />,
  ...restProps
}: KsAutocompleteProps): ReactElement {
  const { themeClass } = useTheme();

  return (
    <Autocomplete
      renderInput={renderInput}
      PaperComponent={({ children }) => <Paper className={`${themeClass}`}>{children}</Paper>}
      {...restProps}
    />
  );
}
