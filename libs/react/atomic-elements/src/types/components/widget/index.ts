import { Action, Attribute, AttributeProps, CustomWidget } from '@kleeen/types';

import { StatisticalType } from '@kleeen/render-utils';
import { VizCommonParams } from '../../types';
import { WidgetTypes } from '../../../enums';

export interface Widget extends VizCommonParams {
  actions: Action[];
  addModalAttributes: AttributeProps[];
  attributes: Attribute[];
  chartType: WidgetTypes;
  component: CustomWidget | undefined;
  entityId?: string;
  flags: {
    download: boolean;
    navigation: boolean;
  };
  id: string | number;
  statisticalType?: StatisticalType;
  title: string;
  viableSolutions?: WidgetTypes[];
}
