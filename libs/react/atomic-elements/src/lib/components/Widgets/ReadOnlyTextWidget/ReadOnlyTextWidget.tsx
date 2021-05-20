import React, { ReactElement } from 'react';

import { Attribute } from '@kleeen/types';
import { Loader } from '@kleeen/react/components';
import ReadOnlyText from '../../ReadOnlyText/ReadOnlyText';
import { VizCommonParams } from '../../../../types/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});
interface ReadOnlyTextWidgetProps extends VizCommonParams {
  attributes?: Attribute[];
  taskName: string;
  widgetId: string | number;
  params: {
    baseModel: string;
    aggregatedByType?: string;
    aggregatedBy?: string;
    aggregation_attribute?: string;
    aggregation?: string;
  };
}

export function ReadOnlyTextWidget({ params, taskName, widgetId }: ReadOnlyTextWidgetProps): ReactElement {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <ReadOnlyText context={widgetData}></ReadOnlyText>
    </div>
  );
}
