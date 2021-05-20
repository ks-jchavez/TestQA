import { StylesProvider as MaterialStylesProvider } from '@material-ui/core/styles';
import { ProviderProps } from './provider.model';
import React from 'react';

export function StylesProvider({ children }: ProviderProps): JSX.Element {
  return <MaterialStylesProvider injectFirst>{children}</MaterialStylesProvider>;
}
