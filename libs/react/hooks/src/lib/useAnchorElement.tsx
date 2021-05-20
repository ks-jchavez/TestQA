import React from "react";

function useAnchorElement(): {
  handleClick: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  handleClose: () => void,
  anchorEl: null | HTMLElement;
} {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return { anchorEl, handleClick, handleClose };
}

export { useAnchorElement }
