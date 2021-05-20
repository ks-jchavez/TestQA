import './FooterNavLeft.scss';

import { Button, UserAccountButton } from '../NavLeft.style';
import { useTheme, useUserInfo } from '@kleeen/react/hooks';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AppBar from '@material-ui/core/AppBar';
import { FooterNavLeftProps } from './FooterNavLeft.model';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import { useStyles } from './FooterNavLeft.style';

export const FooterNavLeft = ({ helpUrl, accountMenuList, navigate }: FooterNavLeftProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { userInfo } = useUserInfo();
  const classes = useStyles();
  const { themeClass } = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const getUserEmail = (userObj): string => {
    return userObj ? userObj.attributes.email : '';
  };

  return (
    <div className={classNames(classes.appBarContainer, 'nav-bar-footer')}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <div className={classes.appBarContent}>
          <UserAccountButton onClick={handleClick}>
            <AccountCircleOutlinedIcon />
            <Tooltip title={getUserEmail(userInfo)}>
              <div className={classes.userName}>
                <div className={classes.userNameContent}>{getUserEmail(userInfo)}</div>
              </div>
            </Tooltip>
          </UserAccountButton>
          {Boolean(helpUrl) && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                window.open(helpUrl, '_blank');
              }}
            >
              <HelpOutlineOutlinedIcon />
            </Button>
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ className: `${themeClass}` }}
          >
            {accountMenuList.map(({ title, path, func }) => (
              <MenuItem
                key={title}
                onClick={(e) => {
                  e.preventDefault();
                  if (func) {
                    func();
                    return;
                  }
                  navigate(path, false);
                  handleClose();
                }}
              >
                {title}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </AppBar>
    </div>
  );
};
