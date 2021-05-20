import StepLine from '../../StepLine/StepLine';
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
interface StepLineWidgetProps extends VizCommonParams {
  taskName: string;
  widgetId: string | number;
}

export const StepLineWidget = ({ params, taskName, widgetId }: StepLineWidgetProps): JSX.Element => {
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
      <StepLine context={widgetData} params={params} />
    </div>
  );
};

export default StepLineWidget;
