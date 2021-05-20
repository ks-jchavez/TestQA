import React, { ReactElement } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { HeaderNavLeftProps } from './HeaderNavLeft.model';
import { useStyles } from './HeaderNavLeft.style';

export const HeaderNavLeft = ({ logo, productName }: HeaderNavLeftProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.appBarContainer}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <div className={classes.appBarContent}>
          {logo && (
            <div className={classes.logoContainer}>
              <Avatar alt="KS" variant="square" src={logo} />
            </div>
          )}
          <div>{productName || ''}</div>
        </div>
      </AppBar>
    </div>
  );
};
