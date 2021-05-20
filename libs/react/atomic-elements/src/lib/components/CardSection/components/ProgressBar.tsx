import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  containerBar: {
    height: 'var(--wh-4XS)',
    width: 'var(--wh-7XS)',
    marginRight: 'var(--pm-2XS)',
    backgroundColor: 'var(--surface-color)',
    display: 'flex',
    alignItems: (props: { percentage: number; top: boolean }) => (props.top ? 'flex-end' : 'flex-start'),
    transition: 'align-items 0.1s',
  },
  innerBar: {
    height: (props: { percentage: number; top: boolean }) => `${props.percentage}%`,
    width: 'var(--wh-7XS)',
    backgroundColor: 'var(--secondary-color)',
    transition: 'height 0.1s',
  },
});

const calcPercentage = ({
  widgetHeight,
  widgetTop,
  widgetBottom,
  containerTop,
  containerBottom,
}: {
  widgetHeight: number;
  widgetTop: number;
  widgetBottom: number;
  containerTop: number;
  containerBottom: number;
}): { percentage: number; top: boolean } => {
  const result = { percentage: 0, top: true };
  if (widgetTop > containerTop) {
    result.top = false;
  }
  if (widgetBottom < containerTop || widgetTop > containerBottom) {
    return result;
  }
  if (result.top) {
    if (widgetBottom >= containerBottom) {
      result.percentage = 100;
    } else {
      const visiblePart = widgetBottom - containerTop;
      result.percentage = (visiblePart * 100) / widgetHeight;
    }
  } else {
    if (widgetBottom <= containerBottom) {
      result.percentage = 100;
    } else {
      const visiblePart = containerBottom - widgetTop;
      result.percentage = (visiblePart * 100) / widgetHeight;
    }
  }
  return result;
};

export const ProgressBar = ({
  widgetRef,
  containerId,
}: {
  widgetRef: any;
  containerId: string;
}): JSX.Element => {
  const [percentage, setPercentage] = useState(0);
  const [top, setTop] = useState(true);
  const [time, setTime] = useState(0);
  useEffect(() => {
    const handler = setInterval(() => {
      setTime((previous) => previous + 1);
    }, 100);

    return () => clearInterval(handler);
  }, []);
  useEffect(() => {
    const widgetsContainerDOM = document.getElementById(containerId);
    const rect = widgetRef.current?.getBoundingClientRect();
    const containerRect = widgetsContainerDOM?.getBoundingClientRect();
    const calcResult = calcPercentage({
      widgetHeight: widgetRef.current?.clientHeight,
      widgetTop: rect?.top,
      widgetBottom: rect?.bottom,
      containerTop: containerRect?.top,
      containerBottom: containerRect?.bottom,
    });
    if (calcResult.percentage !== percentage || calcResult.top !== top) {
      setPercentage(calcResult.percentage);
      setTop(calcResult.top);
    }
  }, [time]);
  const classes = useStyles({ percentage, top });
  return (
    <div className={classes.containerBar}>
      <div className={classes.innerBar} />
    </div>
  );
};
