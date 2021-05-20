import Line from '../../Line/Line';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { VizCommonParams } from '../../../../types/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});
interface LineWidgetProps extends VizCommonParams {
  taskName: string;
  widgetId: string | number;
}

export const LineWidget = ({ params, taskName, widgetId }: LineWidgetProps): JSX.Element => {
  const widgetData = useWidgetContext({
    taskName,
    widgetId,
    params,
  });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <Line context={widgetData} params={params} />
    </div>
  );
};

export default LineWidget;
