import { Loader } from '@kleeen/react/components';
import PolarArea from '../../PolarArea/PolarArea';
import React from 'react';
import { VizCommonParams } from '../../../../types/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';
import { Attribute } from '@kleeen/types';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});
export interface PolarAreaWidgetProps extends VizCommonParams {
  taskName: string;
  widgetId: string | number;
  attributes: Attribute[];
}

export const PolarAreaWidget = ({
  params,
  taskName,
  widgetId,
  attributes,
}: PolarAreaWidgetProps): JSX.Element => {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <PolarArea context={widgetData} params={params} attributes={attributes} />
    </div>
  );
};

export default PolarAreaWidget;
