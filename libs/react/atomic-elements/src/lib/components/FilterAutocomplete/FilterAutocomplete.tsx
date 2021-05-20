import { KsAutocomplete, KsMenuContainer } from '@kleeen/react/components';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { ReactElement } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';

import { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { useTheme } from '@kleeen/react/hooks';

interface FilterAutocompleteProps
  extends Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'renderInput'> {
  renderInput?: () => void;
  textFieldProps?: TextFieldProps;
  withoutMenuTransform?: boolean;
  defaultSelectedValue?: any[];
  options: any[];
  noHelperText?: boolean;
}

const TextField = styled(MuiTextField)({
  '& .MuiInputBase-root': {
    backgroundColor: 'var(--secondary-color)',
    color: 'var(--on-secondary-color)',
    cursor: 'pointer',
    '&:hover, &.Mui-focused': {
      backgroundColor: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
    },
    '&.MuiFilledInput-underline:before, &.MuiFilledInput-underline:after': {
      borderBottomColor: 'var(--secondary-color)',
    },
  },
  '& label': {
    color: 'var(--on-secondary-color)',
  },
  '& label.Mui-focused': {
    color: 'var(--on-secondary-color)',
  },
  '& .MuiAutocomplete-inputRoot .MuiAutocomplete-input': {
    cursor: 'pointer',
  },
  '& .MuiFormHelperText-contained': {
    color: 'var(--on-surface-color)',
    marginLeft: '0px',
    marginRight: 'var(--pm-0)',
    fontSize: '8px',
  },
});

const useStyles = makeStyles({
  menu: (props: { withoutMenuTransform: boolean }) => ({
    overflow: 'hidden',
    // TODO @cafe transform doesn't move the backdrop filter for glass styling.
    // check how to position element correctly and still keep backdrop filter (aka blur)
    // transform: props.withoutMenuTransform ? '' : 'translate(102%, -56px)',
    '& .MuiAutocomplete-groupLabel': {
      backgroundColor: 'var(--nav-top-bg-color)',
      color: 'var(--on-nav-top-bg-color)',
      fontSize: 'var(--tx-S)',
      fontWeight: 'bold',
      lineHeight: 'var(--tx-S)',
      padding: 'var(--pm-5XS) var(--pm-1XS) var(--pm-6XS)',
    },
    '& .MuiAutocomplete-option': {
      '&:hover': {
        backgroundColor: 'var(--secondary-color-variant)',
        color: 'var(--on-secondary-color-variant)',
      },
      padding: 'var(--pm-4XS) var(--pm-1XS)',
      fontSize: 'var(--tx-M)',
    },
  }),
});

const FilterAutocomplete = ({
  textFieldProps,
  renderInput,
  options,
  noHelperText,
  placeholder,
  withoutMenuTransform,
  ...restProps
}: FilterAutocompleteProps): ReactElement => {
  const { themeClass } = useTheme();
  const classes = useStyles({ withoutMenuTransform });
  return (
    <KsAutocomplete
      options={options}
      filterSelectedOptions
      forcePopupIcon={false}
      disableClearable={false}
      renderInput={(params) => (
        <TextField
          helperText={!noHelperText ? 'Click Here to Add a New Filter.' : ''}
          placeholder={placeholder ? placeholder : ''}
          variant="filled"
          {...params}
          {...textFieldProps}
        />
      )}
      PaperComponent={({ children }) => (
        <KsMenuContainer className={`${themeClass} ${classes.menu}`}>{children}</KsMenuContainer>
      )}
      {...restProps}
    />
  );
};

export default FilterAutocomplete;
