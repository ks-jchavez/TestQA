import React, { ReactElement } from 'react';

import Gauge from '../../Gauge/Gauge';
import { GaugeWidgetProps } from './GaugeWidget.model';
import { Loader } from '@kleeen/react/components';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});

export function GaugeWidget({ params, taskName, widgetId }: GaugeWidgetProps): ReactElement {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <Gauge context={widgetData} params={params} />
    </div>
  );
}
