import { GroupByProps, ValueProp, ValuesProps, VizCommonParams } from '../../../../types/types';

import { Loader } from '@kleeen/react/components';
import PositiveNegativeArea from '../../PositiveNegativeArea/PositiveNegativeArea';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
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

export const PositiveNegativeAreaWidget = ({
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
      <PositiveNegativeArea context={widgetData} params={params} />
    </div>
  );
};

export default PositiveNegativeAreaWidget;
