import { GroupByProps, ValueProp, ValuesProps } from '../../../../types/types';

import { Attribute } from '@kleeen/types';
import ColumnBar from '../../ColumnBar/ColumnBar';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS) + var(--wh-S))',
  },
});
interface ColumnBarWidgetProps {
  taskName: string;
  widgetId: string | number;
  chartType: string;
  attributes?: Attribute[];
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

export const ColumnBarWidget = ({
  attributes,
  params,
  taskName,
  widgetId,
  chartType,
}: ColumnBarWidgetProps): JSX.Element => {
  const widgetData = useWidgetContext({
    params,
    taskName,
    widgetId,
  });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <ColumnBar
        context={widgetData}
        base={params.baseModel}
        params={params}
        subType={chartType}
        attributes={attributes}
      />
    </div>
  );
};

export default ColumnBarWidget;
