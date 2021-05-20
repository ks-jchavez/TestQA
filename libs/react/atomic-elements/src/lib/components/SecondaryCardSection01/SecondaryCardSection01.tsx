import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardSection01: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridAutoRows: 'auto',
    gridTemplateColumns: '100%',
    height: '100%', //vh for testing purposes. Use 100% in dev
    width: '100%',
  },
});

export interface SecondaryCardSection01Props {
  children: React.ReactNode;
}

export const SecondaryCardSection01 = (props: SecondaryCardSection01Props): ReactElement => {
  const classes = useStyles();

  return <div className={classes.cardSection01}>{props.children}</div>;
};

export default SecondaryCardSection01;
