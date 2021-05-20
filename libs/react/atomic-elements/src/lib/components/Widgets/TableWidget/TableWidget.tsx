import { GroupByProps, ValueProp, ValuesProps, VizCommonParams } from '../../../../types/types';
import { formatDataList, formatSeverity, parseAttributes } from '@kleeen/frontend/utils';

import { Attribute } from '@kleeen/types';
import React from 'react';
import { SimpleList } from '@kleeen/react/components';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
    // Table widgets are the only type of widgets that need to ignore the card-content imposed padding
    margin: '0 calc(-1 * var(--pm-L))',
  },
});
export interface TableWidgetProps extends VizCommonParams {
  attributes?: Attribute[];
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

export const TableWidget = ({ attributes, params, taskName, widgetId }: TableWidgetProps): JSX.Element => {
  const widgetData = useWidgetContext({ taskName, widgetId, params }) || { data: {} };
  const { format, crossLinking, results } = widgetData.data || {};
  const listColumns = parseAttributes(attributes, format);
  const hideHeader = false;
  const { data } = formatDataList({ crossLinking, results, format, params });
  const newWidgetData = {
    isLoading: false,
    ...widgetData,
    data,
    format: formatSeverity(format, params),
  };
  const classes = useStyles();

  return (
    <div className={classes.widgetContent}>
      <SimpleList hideHeader={hideHeader} data={newWidgetData.data} columns={listColumns} />
    </div>
  );
};

export default TableWidget;
