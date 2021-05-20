import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

/* eslint-disable-next-line */
export interface SecondaryCardWidget02Props {
  children: ReactElement[];
}

const useStyles = makeStyles({
  secondaryCardWidget02: {
    backgroundColor: 'var(--card-bg-color)',
    boxShadow: 'var(--card-shadow)',
    borderRadius: 'var(--card-border-radius)',
    border: 'var(--card-border)',
    height: 'var(--wh-6XL)',
    margin: 'var(--pm-S)',
  },
  content: {
    backgroundColor: 'var(--card-content-bg-color)',
    height: 'calc(100% - var(--wh-S))',
    width: '100%',
  },
});

export const SecondaryCardWidget02 = (props: SecondaryCardWidget02Props): ReactElement => {
  const classes = useStyles();
  const [A, B] = React.Children.toArray(props.children);

  return (
    <div className={classes.secondaryCardWidget02}>
      {A}
      <div className={classes.content}>{B}</div>
    </div>
  );
};

export default SecondaryCardWidget02;
