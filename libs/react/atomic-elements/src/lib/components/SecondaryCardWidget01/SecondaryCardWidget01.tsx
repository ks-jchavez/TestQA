import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

/* eslint-disable-next-line */
export interface SecondaryCardWidget01Props {
  children: ReactElement[];
}

const useStyles = makeStyles({
  secondaryCardWidget01: {
    boxShadow: 'var(--card-shadow)',
    borderRadius: 'var(--card-border-radius)',
    border: 'var(--card-border)',
    backgroundColor: 'var(--card-bg-color)',
    marginBottom: 'var(--pm-1XS)',
    marginLeft: 'var(--pm-L)',
    marginRight: 'var(--pm-L)',
    marginTop: 'var(--pm-1XS)',
    width: 'var(--wh-5XL)',
  },
  content: {
    height: 'calc(100% - var(--wh-3XS))',
    width: '100%',
  },
});

export const SecondaryCardWidget01 = (props: SecondaryCardWidget01Props): ReactElement => {
  const classes = useStyles();
  const [A, B] = React.Children.toArray(props.children);

  return (
    <div className={classes.secondaryCardWidget01}>
      {A}
      <div className={classes.content}>{B}</div>
    </div>
  );
};

export default SecondaryCardWidget01;
