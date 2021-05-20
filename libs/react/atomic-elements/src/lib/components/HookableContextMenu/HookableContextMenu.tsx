import React, { useRef } from 'react';
import { useAttributeContextMenu, useOnClickOutside } from '@kleeen/react/hooks';

import { Attribute } from '@kleeen/types';
import { ContextMenu } from '@kleeen/react/components';

interface Cell {
  id: number | string;
  displayValue: string;
}

interface ContextMenuProps {
  attr: Attribute;
  cell: Cell;
}

export const HookableContextMenu = (props: ContextMenuProps) => {
  // new context menu
  const { contextualToggle, context, setContextualToggle } = useAttributeContextMenu();
  const ref = useRef();
  useOnClickOutside(ref, () => setContextualToggle(false));
  const anchorEl = context.e && context.e.currentTarget;

  const handleClose = () => {
    setContextualToggle(false);
  };

  return contextualToggle ? (
    <ContextMenu
      attr={context.attr}
      cell={context.cell}
      anchorEl={anchorEl}
      handleClose={handleClose}
    ></ContextMenu>
  ) : (
    ''
  );
};

export default HookableContextMenu;
