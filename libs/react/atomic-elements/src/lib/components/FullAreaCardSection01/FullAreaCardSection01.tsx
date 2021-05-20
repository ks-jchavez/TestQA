import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';

export interface FullAreaCardSection01Props {
  children: ReactElement | ReactElement[];
}

const useStyles = makeStyles({
  fullAreaCardSection01: {
    height: '100%',
    width: '100%',
  },
});

export const FullAreaCardSection01 = ({ children }: FullAreaCardSection01Props) => {
  const classes = useStyles();
  return <div className={classes.fullAreaCardSection01}>{children}</div>;
};

export default FullAreaCardSection01;
