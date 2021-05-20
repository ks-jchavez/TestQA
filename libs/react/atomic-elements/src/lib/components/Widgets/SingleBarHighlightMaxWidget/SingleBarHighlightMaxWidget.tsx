import { Attribute } from '@kleeen/types';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import SingleBarHighlightMax from '../../SingleBarHighlightMax/SingleBarHighlightMax';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

interface SingleBarHighlightMaxWidgetProps {
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
  };
}

const useStyles = makeStyles({
  widgetContent: {
    height: 'var(--card-viz-height-L)',
  },
});
export const SingleBarHighlightMaxWidget = ({
  attributes,
  params,
  taskName,
  widgetId,
}: SingleBarHighlightMaxWidgetProps): JSX.Element => {
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
      <SingleBarHighlightMax
        context={widgetData}
        base={params.baseModel}
        params={params}
        widgetId={widgetId}
        attributes={attributes}
      />
    </div>
  );
};

export default SingleBarHighlightMaxWidget;
