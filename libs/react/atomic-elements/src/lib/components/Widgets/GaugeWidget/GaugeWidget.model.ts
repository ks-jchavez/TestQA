import { VizCommonParams } from '../../../../types';

export interface GaugeWidgetProps extends VizCommonParams {
  taskName: string;
  widgetId: string | number;
}
