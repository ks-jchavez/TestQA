import React, { ReactElement, useEffect } from 'react';
import { ValuesProps, VizCommonParams } from '../../../../types';
import { useMasonry, useWidgetContext } from '@kleeen/react/hooks';

import { Attribute } from '@kleeen/types';
import { Loader } from '@kleeen/react/components';
import SummaryStatistics from '../../SummaryStatistics/SummaryStatistics';
import { pathOr } from 'ramda';

interface SummaryStatisticsWidgetProps extends VizCommonParams {
  attributes?: Attribute[];
  isWidget?: boolean;
  taskName: string;
  widgetId: string | number;
}

export const SummaryStatisticsWidget = ({
  attributes,
  isWidget = false,
  params,
  taskName,
  widgetId,
}: SummaryStatisticsWidgetProps): ReactElement => {
  const values: ValuesProps = pathOr({}, ['value'], params);
  const attribute = pathOr({}, ['0'], attributes);
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const { updateLayout } = useMasonry();

  useEffect(() => {
    const minCardHeight = 60;
    updateLayout(minCardHeight);
  }, [widgetData]);

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div>
      <SummaryStatistics
        attribute={attribute}
        context={widgetData}
        isWidget={isWidget}
        values={values}
      ></SummaryStatistics>
    </div>
  );
};
export default SummaryStatisticsWidget;
