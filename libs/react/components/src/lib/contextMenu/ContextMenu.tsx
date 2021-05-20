import { Attribute, Cell, Link } from '@kleeen/types';

import { AccessControl } from '@kleeen/core-react';
import { KsMenuItem } from '../menu';
import MuiMenu from '@material-ui/core/Menu';
import React from 'react';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { styled } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useCrosslinking, useTheme } from '@kleeen/react/hooks';

const Menu = styled(MuiMenu)({
  '& .MuiMenu-paper': {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'var(--menu-bg-color)',
    color: 'var(--on-surface-color)',
  },
});

export const isLinkFilterableByEntityType = (entityType: string, link: Link): boolean =>
  !link.entityType || link.entityType === entityType;

export interface ContextMenuProps {
  attr: Attribute;
  cell: Cell;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

export const ContextMenu = ({ attr, cell, handleClose, anchorEl }: ContextMenuProps): JSX.Element => {
  const { themeClass } = useTheme();
  const history = useHistory();
  const { crosslink } = useCrosslinking();

  const handleFilterIn = (data: { key: string; id: string | number }) => (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    e.preventDefault();
    handleClose();

    const params = new URLSearchParams(history.location.search);

    if (history.location.search.includes(data.key)) {
      params.set(data.key, data.id as string);
    } else {
      params.append(data.key, data.id as string);
    }
    history.push(`?${decodeURIComponent(params.toString())}`);
  };

  const handleDetailsClick = (slug: string, clickedCell: Cell, cellAttribute: Attribute) => (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    e.preventDefault();
    handleClose();
    crosslink(slug, clickedCell, cellAttribute);
  };

  // if the entityType is not present the link is not part of a XOR
  const cellEntityType = cell?.$metadata && cell.$metadata.entityType;
  const menuItems =
    Array.isArray(attr?.crossLinking) &&
    attr?.crossLinking.filter((link) => isLinkFilterableByEntityType(cellEntityType, link));

  return (
    <>
      {Boolean(menuItems.length) && (
        <Menu
          id="context-menu"
          className={themeClass}
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'center',
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
        >
          <span>
            {menuItems.map((link) => {
              const navigationTitle = roleAccessKeyTag(`navigation.${link?.title}`);

              return (
                <AccessControl id={navigationTitle} key={navigationTitle}>
                  {({ permission }) => (
                    <KsMenuItem
                      disabled={permission === 'HIDE'}
                      key={link?.slug + link?.title}
                      onClick={handleDetailsClick(link.slug, cell, attr)}
                    >
                      Go to {link?.title}
                    </KsMenuItem>
                  )}
                </AccessControl>
              );
            })}
            {attr?.isFilterable?.in && (
              <KsMenuItem onClick={handleFilterIn({ key: attr?.name, id: cell?.displayValue as string })}>
                Filter In
              </KsMenuItem>
            )}
          </span>
        </Menu>
      )}
    </>
  );
};
