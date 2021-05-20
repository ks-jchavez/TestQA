import { Button, Drawer, makeStyles, styled } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { ProgressBar } from './ProgressBar';

const useStyles = makeStyles(() => ({
  drawer: {
    width: '100%',
    padding: 'var(--pm-L)',
    zIndex: 0,
    position: 'sticky',
    top: 0,
  },
  drawerPaper: {
    width: '100%',
    position: 'relative',
    background: 'inherit',
    border: 'none',
    overflowY: 'hidden',
  },
  buttonMenu: {
    fontSize: 'var(--tx-M)',
    justifyContent: 'left',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'var(--secondary-color)',
    textTransform: 'unset',
    height: 'var(--wh-4XS)',
    margin: 'var(--pm-4XS) 0',
    width: '100%',
    '&:hover': {
      color: 'var(--secondary-color-variant)',
      background: 'none',
    },
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

export const TableContent = ({ widgets, widgetsRefs, containerId }: any): ReactElement => {
  const classes = useStyles();

  function handleScroll(widgetId: string): void {
    widgetsRefs[widgetId].current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={classes.drawer}
      open={true}
      variant="persistent"
    >
      {widgets.map((widget) => {
        return (
          <Button className={classes.buttonMenu} onClick={() => handleScroll(widget.id)}>
            <ProgressBar widgetRef={widgetsRefs[widget.id]} containerId={containerId} />
            <span className={classes.title}>{widget.title}</span>
          </Button>
        );
      })}
    </Drawer>
  );
};
