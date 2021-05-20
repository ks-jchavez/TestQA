import { CrossLinking, DataAggregationArgs, DataAggregationArgsDataPoint, ListItem } from '../types';

import { Transformation } from '../utils/enumerators';

export type PrimitiveType = boolean | number | string;

export interface DataListingArgs {
  entity: string;
  attributes: {
    name: string;
    aggregation?: Transformation;
    isDisplayValue?: boolean;
    transformation?: Transformation;
    rawEntityName: string;
  }[];
  filters?: any;
  pagination?: { startIndex: number, stopIndex: number };
}

export interface Entity {
  name: string;
  properties: { [property: string]: { statisticalType: string } };
}

export interface GenericEntityItem {
  displayValue: ListItem;
  id: string;
}

export interface GenericEntityItemNestedDisplayValue {
  displayValue: { displayValue: ListItem };
  id: string;
}

export type GetWidgetData = (input: DataAggregationArgs, chartType?: string) => unknown[];

export enum PrimitiveTypes {
  Boolean = 'boolean',
  Date = 'datetime',
  Number = 'number',
  String = 'string',
}

export interface FakeDataDataPoint extends DataAggregationArgsDataPoint {
  list: PrimitiveType[];
  idList: CrossLinking[];
  type: PrimitiveTypes;
  isCategorical: boolean;
  isSelf: boolean;
}
