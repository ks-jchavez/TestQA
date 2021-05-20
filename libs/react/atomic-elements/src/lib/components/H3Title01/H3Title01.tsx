import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

export interface H3Title01Props {
  children: ReactElement;
}

const useStyles = makeStyles({
  h3Title01: {
    height: 'var(--wh-3XS)',
    fontSize: 'var(--tx-1XL)',
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

export const H3Title01 = (props: H3Title01Props) => {
  const classes = useStyles();

  return <h3 className={classes.h3Title01}>{props.children}</h3>;
};

export default H3Title01;
