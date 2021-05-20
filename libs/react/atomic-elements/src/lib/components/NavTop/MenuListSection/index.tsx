import { KsMenuContainer, KsMenuItem } from '@kleeen/react/components';
import React, { ReactElement } from 'react';

import { AccessControl } from '@kleeen/core-react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import { MenuListSectionProps } from './MenuListSelection.model';
import MuiPopper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import { roleAccessKeyTag } from '@kleeen/common/utils';

const useStyles = makeStyles({
  popper: {
    backdropFilter: 'blur(4px)',
  },
});

const MenuListSection = ({
  anchorEl,
  handleClose,
  menuList,
  open,
  navigate,
  setOpen,
}: MenuListSectionProps): ReactElement => {
  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <MuiPopper className={classes.popper} open={open} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <KsMenuContainer variant="outlined" square>
              <MenuList data-testid="ks-dropdown-menu">
                {menuList.map(({ title, path, func }) => (
                  <AccessControl
                    id={roleAccessKeyTag(`navigation.${title}`)}
                    key={roleAccessKeyTag(`navigation.${title}`)}
                  >
                    <KsMenuItem
                      key={path}
                      className="menu-item"
                      onClick={(e) => {
                        e.preventDefault();
                        if (func) {
                          func();
                          return;
                        }
                        navigate(path, false);
                        setOpen(false);
                      }}
                    >
                      {title}
                    </KsMenuItem>
                  </AccessControl>
                ))}
              </MenuList>
            </KsMenuContainer>
          </Grow>
        )}
      </MuiPopper>
    </ClickAwayListener>
  );
};

export default MenuListSection;
