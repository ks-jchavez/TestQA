import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxHeight: 'calc(var(--wh-L) - var(--pm-L))',
    width: '95%',
    marginLeft: 'var(--pm-2XL)',
  },
  divContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 'var(--wh-S)',
  },
});

export const CustomView = ({ widget }, ...props: any[]): ReactElement => {
  const classes = useStyles();
  const CustomView = widget.component;

  return <CustomView {...props} className={classes.divContainer} key={widget.id} title={widget.title} />;
};

export default CustomView;