import { GroupByProps, ValueProp, ValuesProps, VizCommonParams } from '../../../../types';

import { Attribute } from '@kleeen/types';

export interface BubbleChartWidgetProps extends VizCommonParams {
  attributes?: Attribute[];
  params: {
    baseModel: string;
    aggregatedByType?: string;
    aggregatedBy?: string;
    aggregation_attribute?: string;
    aggregation?: string;
    groupBy?: GroupByProps;
    value?: ValueProp | ValuesProps;
  };
  taskName: string;
  widgetId: string | number;
}
