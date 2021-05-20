import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardSection02: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoRows: 'auto',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
    width: '100%',
  },
});

/* eslint-disable-next-line */
export interface SecondaryCardSection02Props {
  children: React.ReactNode;
}

export const SecondaryCardSection02 = (props: SecondaryCardSection02Props): ReactElement => {
  const classes = useStyles();

  return <div className={classes.cardSection02}>{props.children}</div>;
};

export default SecondaryCardSection02;
