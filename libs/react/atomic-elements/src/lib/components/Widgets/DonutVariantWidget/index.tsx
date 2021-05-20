import { Attribute } from '@kleeen/types';
import { DonutVariant } from '../../donut-variant';
import { Loader } from '@kleeen/react/components';
import { VizCommonParams } from '../../../../types/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});
export interface DonutVariantWidgetProps extends VizCommonParams {
  attributes?: Attribute[];
  taskName: string;
  widgetId: string | number;
}

export const DonutVariantWidget = ({
  attributes,
  params,
  taskName,
  widgetId,
}: DonutVariantWidgetProps): JSX.Element => {
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
      <DonutVariant sliceResultsBy={4} context={widgetData} attributes={attributes} params={params} />
    </div>
  );
};

export default DonutVariantWidget;
