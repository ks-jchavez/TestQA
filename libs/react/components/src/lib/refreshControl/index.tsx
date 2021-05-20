import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';

import { CircularProgress } from '../circularProgress';
import { KUIConnect } from '@kleeen/core-react';
import { PlayArrow, Pause } from '@material-ui/icons';
import { RefreshControlProps } from './refreshControl.model';
import { TimeIntervals } from '@kleeen/types';
import { useStyles, usePopOverStyles } from './refreshControl.style';
import { useTheme } from '@kleeen/react/hooks';
import {
  RefreshControlSelect,
  RefreshControlFab,
  RefreshControlListSubheader,
  RefreshControlMenuItem,
} from './refreshControl.components';

const REFRESH = 0;
const FIVE_MINUTES = 5;

const RefreshControl = ({ onRefresh, translate }: RefreshControlProps): ReactElement => {
  const classes = useStyles();
  const popoverClasses = usePopOverStyles();
  const { themeClass } = useTheme();
  const [percent, setPercent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isTimerPaused = useRef(false);
  const currentInterval = useRef(FIVE_MINUTES);
  const updateAt = useRef(Date.now() + currentInterval.current * 60 * 1000);
  const currentTime = useRef(Date.now() + 5 * 60 * 1000);

  const togglePause = (): void => {
    isTimerPaused.current = !isTimerPaused.current;
    setIsPaused(!isPaused);
  };

  const getMillisecondsRemaining = (): number => updateAt.current - currentTime.current;

  const getPercentElapsed = (interval): number =>
    100 - (getMillisecondsRemaining() / (interval * 60 * 1000)) * 100;

  const onTimeIntervalChange = (intervalInMinutes: number): void => {
    currentInterval.current = intervalInMinutes;
    setPercent(0);
    updateAt.current = Date.now() + currentInterval.current * 60 * 1000;
  };

  const progress = (): void => {
    if (isTimerPaused.current) {
      updateAt.current = updateAt.current + 1000;
    }
    if (Date.now() >= updateAt.current) {
      updateAt.current = Date.now() + currentInterval.current * 60 * 1000;
      setPercent(100);
      setTimeout(onRefresh, 1000);
    } else {
      currentTime.current = Date.now();
      setPercent(getPercentElapsed(currentInterval.current));
    }
  };

  useEffect(() => {
    const timer = setInterval(progress, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.refreshControl}>
      <CircularProgress radius={20} stroke={3} progress={percent}>
        <RefreshControlFab
          onClick={() => {
            togglePause();
          }}
          size="small"
        >
          {isPaused ? <PlayArrow fontSize="small" /> : <Pause fontSize="small" />}
        </RefreshControlFab>
      </CircularProgress>
      <RefreshControlSelect
        disableUnderline
        displayEmpty={true}
        renderValue={() => translate('app.refreshControl.refresh')}
        value=""
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.value) {
            onTimeIntervalChange(parseFloat(event.target.value));
          }
        }}
        MenuProps={{
          PopoverClasses: popoverClasses,
          className: themeClass,
        }}
      >
        <RefreshControlListSubheader>
          {translate('app.refreshControl.timeIntervals')}
        </RefreshControlListSubheader>
        {TimeIntervals.map((intervalOption) => (
          <RefreshControlMenuItem key={intervalOption.value} value={intervalOption.value}>
            {intervalOption.value === currentInterval.current && <div className={classes.dot} />}
            {translate(intervalOption.translateKey)}
          </RefreshControlMenuItem>
        ))}
        <RefreshControlListSubheader>{translate('app.refreshControl.actions')}</RefreshControlListSubheader>
        <RefreshControlMenuItem onClick={() => onRefresh()} value={REFRESH}>
          {translate('app.refreshControl.refreshNow')}
        </RefreshControlMenuItem>
        <RefreshControlMenuItem
          onClick={() => {
            togglePause();
          }}
        >
          {translate(isPaused ? 'app.refreshControl.resume' : 'app.refreshControl.pause')}
        </RefreshControlMenuItem>
      </RefreshControlSelect>
    </div>
  );
};

export default KUIConnect(({ translate }) => ({ translate }))(RefreshControl);
