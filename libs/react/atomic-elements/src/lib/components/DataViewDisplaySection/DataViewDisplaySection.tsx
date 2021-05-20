import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useGetWidgetsAmount } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  dataViewDisplaySection: {
    height: '100%',
    width: '100%',
    // TODO find a more robust mechanism to turn these paddings on/off
    '.nav-left &': {
      paddingBottom: 'var(--pm-L)',
    },
  },
  tabPanel: {
    overflow: 'overlay',
    height: '100%',
    width: '100%',
    // TODO find a better mechanism to turn these paddings on/off
    '.nav-left &': {
      paddingBottom: 'var(--pm-L)',
    },
  },
});

interface DataViewDisplaySectionProps {
  children?: React.ReactNode;
  value: any;
  setCardsNumber?: (e: number) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

const TabPanel = React.memo((props: TabPanelProps) => {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      className={classes.tabPanel}
      style={{ visibility: value === index ? 'visible' : 'hidden' }}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
});

export const DataViewDisplaySection = React.memo((props: DataViewDisplaySectionProps) => {
  const classes = useStyles();
  useGetWidgetsAmount(props.setCardsNumber);
  return (
    <div className={classes.dataViewDisplaySection}>
      {React.Children.map(props.children, (Child, index) => (
        <TabPanel value={props.value} index={index}>
          {Child}
        </TabPanel>
      ))}
    </div>
  );
});

export default DataViewDisplaySection;
