import { GroupByProps, ValueProp, ValuesProps, VizCommonParams } from '../../../../types/types';

import { Loader } from '@kleeen/react/components';
import React from 'react';
import { Waterfall } from '../../Waterfall/Waterfall';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'var(--card-viz-height-S)',
  },
});
export interface PositiveNegativeAreaWidgetProps extends VizCommonParams {
  taskName: string;
  widgetId: string | number;
  params: {
    baseModel: string;
    aggregatedByType?: string;
    aggregatedBy?: string;
    aggregation_attribute?: string;
    aggregation?: string;
    groupBy?: GroupByProps;
    value?: ValueProp | ValuesProps;
  };
}

export const WaterfallWidget = ({
  taskName,
  widgetId,
  params,
}: PositiveNegativeAreaWidgetProps): JSX.Element => {
  const widgetData = useWidgetContext({
    taskName,
    widgetId,
    params: { ...params, aggregatedByType: 'over' },
  });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <Waterfall context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
};

export default WaterfallWidget;
