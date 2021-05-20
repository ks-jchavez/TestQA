import { Cardinality, Transformation } from '../utils';

export interface DataAggregationArgsDataPoint {
  name: string;
  transformation?: Transformation;
  transformations?: Transformation[];
}

export interface DataAggregationArgs {
  cardinality?: Cardinality;
  filters?: any;
  groupBy?: DataAggregationArgsDataPoint;
  value: DataAggregationArgsDataPoint;
}

export interface GetFiltersArgs {
  attributes: string[];
}

export interface AutoCompleteParams {
  entity: string;
  offset?: number;
  limit?: number;
  totalCount?: number;
}

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
  pagination?: { startIndex: number, stopIndex: number }
}

export interface CustomActionArgs {
  entity: string;
  functionName: string;
  filters?: any;
}
