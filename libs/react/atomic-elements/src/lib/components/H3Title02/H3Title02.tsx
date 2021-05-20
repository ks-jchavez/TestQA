import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

export interface H3Title02Props {
  children: ReactElement;
}

const useStyles = makeStyles({
  h3Title02: {
    height: 'var(--wh-3XS)',
    fontSize: 'var(--tx-L)',
    color: 'var(--h3-title-color)',
    width: '100%',
    margin: 'var(--pm-0)',
    '& > div': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});

export const H3Title02 = (props: H3Title02Props) => {
  const classes = useStyles();

  return <h3 className={classes.h3Title02}>{props.children}</h3>;
};

export default H3Title02;
