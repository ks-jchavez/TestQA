import './NavTop.scss';

import { AppBar, Button, Toolbar, Typography } from './NavTop.style';
import { NavTopProps } from './NavTop.model';
import React, { MouseEvent, useRef, useState } from 'react';

import { AccessControl } from '@kleeen/core-react';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import MenuListSection from './MenuListSection/index';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@kleeen/react/hooks';

export const NavTop = (props: NavTopProps): JSX.Element => {
  const navigate = useNavigation();
  const { pathname } = useLocation();
  const [openAccount, setOpenAccount] = useState(false);
  const [openMainMenu, setOpenMainMenu] = useState(false);

  const mainMenu = useRef<HTMLButtonElement>(null);
  const accountMenu = useRef<HTMLButtonElement>(null);

  const handleToggleAccount = (): void => {
    setOpenAccount(!openAccount);
  };

  const handleToggleMain = (): void => {
    setOpenMainMenu(!openMainMenu);
  };

  const handleClose = (event: MouseEvent<EventTarget>): void => {
    if (accountMenu.current && accountMenu.current.contains(event.target as HTMLElement)) {
      setOpenMainMenu(false);
    } else if (mainMenu.current && mainMenu.current.contains(event.target as HTMLElement)) {
      setOpenAccount(false);
    } else {
      setOpenAccount(false);
      setOpenMainMenu(false);
    }
  };

  const getSelectedPath = (): { title: string } => {
    const paths = [...props.menuList, ...props.accountMenuList];
    const pathSelected = paths.find((menuItem) => menuItem.path === pathname);
    return pathSelected ? pathSelected : { title: '' };
  };

  return (
    <AppBar position="static" className="nav-top" data-testid="global-nav-menu">
      <Toolbar disableGutters className="toolbar">
        {props.menuList.length > 4 ? (
          <>
            <Button
              ref={mainMenu}
              onClick={handleToggleMain}
              color="inherit"
              data-testid="ks-dropdown-menu-button"
            >
              <MenuIcon />
            </Button>
            <MenuListSection
              open={openMainMenu}
              setOpen={setOpenMainMenu}
              anchorEl={mainMenu.current}
              handleClose={handleClose}
              menuList={props.menuList}
              navigate={navigate}
            />
            <Typography variant="h6" className="title">
              {getSelectedPath().title}
            </Typography>
          </>
        ) : (
          <Toolbar className="nav-top-menu" disableGutters>
            {props.menuList.map(({ title, path }) => {
              const navigationTitle = roleAccessKeyTag(`navigation.${title}`);
              return (
                <AccessControl key={navigationTitle} id={navigationTitle}>
                  <Button
                    key={path}
                    color="inherit"
                    className={`menu-nav-button ${pathname === path ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(path, false);
                    }}
                  >
                    <>
                      {title}
                      <div className="nav-circle"></div>
                    </>
                  </Button>
                </AccessControl>
              );
            })}
          </Toolbar>
        )}
        <Avatar alt="KS" variant="square" className="logo" src={props.logo} />
        {Boolean(props.helpUrl) && (
          <Button
            aria-controls="simple-menu"
            color="inherit"
            className="menu-button"
            onClick={(e) => {
              e.preventDefault();
              window.open(props.helpUrl, '_blank');
            }}
          >
            <HelpOutlineOutlinedIcon />
          </Button>
        )}
        <Button ref={accountMenu} onClick={handleToggleAccount} color="inherit">
          <AccountCircleOutlinedIcon />
        </Button>
        <MenuListSection
          open={openAccount}
          setOpen={setOpenAccount}
          anchorEl={accountMenu.current}
          handleClose={handleClose}
          menuList={props.accountMenuList}
          navigate={navigate}
        ></MenuListSection>
      </Toolbar>
    </AppBar>
  );
};

export default NavTop;
