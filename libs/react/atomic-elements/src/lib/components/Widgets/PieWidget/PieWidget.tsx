import { Attribute } from '@kleeen/types';
import { Loader } from '@kleeen/react/components';
import Pie from '../../Pie/Pie';
import React from 'react';
import { VizCommonParams } from '../../../../types/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});
export interface PieWidgetProps extends VizCommonParams {
  attributes?: Attribute[];
  taskName: string;
  widgetId: string | number;
}

export const PieWidget = ({ attributes, params, taskName, widgetId }: PieWidgetProps): JSX.Element => {
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
      <Pie context={widgetData} attributes={attributes} params={params} />
    </div>
  );
};

export default PieWidget;
