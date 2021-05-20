import { ContextProps, ValueProp, ValuesProps } from '../../../types';

import { Attribute } from '@kleeen/types';

export interface SummaryStatisticsProps {
  attribute?: Attribute;
  context: ContextProps;
  isWidget?: boolean;
  values: ValueProp | ValuesProps;
}
