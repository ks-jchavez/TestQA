import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Filter {
  results: [string, string[]][];
}

export interface Params {
  baseModel: string;
  attributes: string;
  operationName?: string;
}

export enum Operator {
  max = 'max',
  from = 'from',
  min = 'min',
  in = '_in',
  to = 'to',
  relativeDate = 'relativeDate',
}

export enum FilterSectionEnum {
  Bounds = 'Bounds',
  FilterBy = 'SELECT FILTER TYPE',
  Values = 'Values',
}

export const optionsByStatisticalType = [
  {
    included: [
      'Data - Numeric - Discrete',
      'Data - Numeric',
      'Data - Numeric - Continuous',
      'Data - Numeric - Percentage',
      'Data - Numeric - NTG - Discrete',
      'Data - Numeric - NTG - Severity Ranking',
    ],
    options: [
      { name: 'Maximum', section: FilterSectionEnum.Bounds, operator: Operator.max },
      { name: 'Minimum', section: FilterSectionEnum.Bounds, operator: Operator.min },
    ],
    section: FilterSectionEnum.Bounds,
  },
];

export interface FilterAdded {
  [Operator.in]?: Array<string | number>;
  [Operator.min]?: number;
  [Operator.max]?: number;
}

export interface FiltersAddedState {
  [category: string]: FilterAdded;
}

export interface FilterOption {
  name: string;
  statisticalType?: string;
  section: string;
  operator?: Operator;
  category?: string;
  value?: string;
}

export const addFilterText = 'Add Filter';
export const materialAutocompleteClearSignal = 'clear';

export interface FilterSectionProps {
  filters: { name: string; statisticalType: string }[];
  taskName: string;
  onChangeFilterVisible?: (e: boolean) => void;
  hasDateFilter?: boolean;
}
