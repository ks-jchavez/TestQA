import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

export interface FullAreaCardWidget01Props {
  children: ReactElement | ReactElement[];
}

const useStyles = makeStyles({
  fullAreaCardWidget01: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    paddingTop: 'var(--pm-L)',
  },
  content: {
    backgroundColor: 'var(--card-content-bg-color)',
    height: 'calc(100% - var(--wh-1XS))',
    width: '100%',
  },
});

export const FullAreaCardWidget01 = (props: FullAreaCardWidget01Props): ReactElement => {
  const classes = useStyles();
  const [A, B] = React.Children.toArray(props.children);

  return (
    <div className={classes.fullAreaCardWidget01}>
      {A}
      <div className={classes.content}>{B}</div>
    </div>
  );
};

export default FullAreaCardWidget01;
