import { GroupByProps, ValueProp, ValuesProps, VizCommonParams } from '../../../../types';
import React, { ReactElement } from 'react';

import { Loader } from '@kleeen/react/components';
import Scatter from '../../Scatter/Scatter';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});
interface ScatterWidgetProps extends VizCommonParams {
  params: {
    baseModel: string;
    aggregatedByType?: string;
    aggregatedBy?: string;
    aggregation_attribute?: string;
    aggregation?: string;
    groupBy?: GroupByProps;
    value?: ValueProp | ValuesProps;
  };
  taskName: string;
  widgetId: string | number;
}

export function ScatterWidget({ params, taskName, widgetId }: ScatterWidgetProps): ReactElement {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <Scatter context={widgetData} params={params} />
    </div>
  );
}
