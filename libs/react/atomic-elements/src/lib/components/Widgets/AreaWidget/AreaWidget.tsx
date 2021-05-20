import { GroupByProps, ValueProp, ValuesProps, VizCommonParams } from '../../../../types/types';

import Area from '../../Area/Area';
import AreaGradient from '../../AreaGradient/AreaGradient';
import AreaMacroMicro from '../../AreaMacroMicro/AreaMacroMicro';
import AreaMasterDetail from '../../AreaMasterDetail/AreaMasterDetail';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { WidgetTypes } from '../../../../enums';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS) + var(--wh-S))',
  },
  widgetMacroMicroContent: {
    height: 'calc(var(--wh-7XL) - var(--wh-4XS) - var(--pm-5XS))',
  },
});

const AreaWidgetSubtype = ({ chartType, widgetData, params }): JSX.Element => {
  switch (chartType) {
    case WidgetTypes.AREA_GRADIENT:
      return <AreaGradient context={widgetData} base={params.baseModel} params={params} />;
    case WidgetTypes.AREA_MASTER_DETAIL:
      return <AreaMasterDetail context={widgetData} base={params.baseModel} />;
    case WidgetTypes.AREA_MACRO_MICRO:
      return <AreaMacroMicro context={widgetData} base={params.baseModel} params={params} />;
    default:
    case WidgetTypes.AREA:
      return <Area context={widgetData} base={params.baseModel} params={params} />;
  }
};

interface AreaWidgetProps extends VizCommonParams {
  taskName: string;
  widgetId: string | number;
  chartType: string;
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
export const AreaWidget = ({ chartType, params, taskName, widgetId }: AreaWidgetProps): JSX.Element => {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div
      className={
        chartType === WidgetTypes.AREA_MACRO_MICRO ? classes.widgetMacroMicroContent : classes.widgetContent
      }
    >
      <AreaWidgetSubtype chartType={chartType} widgetData={widgetData} params={params} />
    </div>
  );
};

export default AreaWidget;
