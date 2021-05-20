import { Transformation } from '../utils';

export type ListItem = number | string | boolean | undefined;

// Duplicated type, must unify in types library
export interface Attribute {
  aggregation?: Transformation;
  name: string;
  // TODO @carreta remove this when XORs can be aggregated [KSE3-1735]
  isXor?: boolean;
  hasMany?: boolean;
  formatType?: string;
}

export interface Axis {
  categories?: string[] | ListItem[];
  key?: string;
  type?: string;
}

export type CrossLinking = {
  id: string;
  $metadata: {
    entityType: string;
  };
};

export interface GetWidgetDataResult {
  format: {
    xAxis?: Axis;
    yAxis?: Axis;
  };
  results: number[] | number[][];
  crossLinking?: CrossLinking[][];
}

interface ListingItem {
  displayValue: any;
  id?: string;
}

interface EntityList {
  [key: string]: ListingItem | ListingItem[];
}

interface ListingFormatItem {
  aggregations?: null;
  examples?: null;
  max?: null;
  min?: null;
  prefix?: null;
  severityBad?: null;
  severityGood?: null;
  severityLevels?: null;
  suffix?: null;
}

export interface GetListingDataResults {
  data: EntityList[];
  format: { [key: string]: ListingFormatItem };
  pagination: { totalCount: number };
}

interface ActionItem {
  link?: string;
  title?: string;
  type?: string;
}

export interface DispatchCustomActionResults {
  data: {
    actions?: ActionItem[];
    customMessage?: string;
    customTitle?: string;
    functionName: string;
    success: boolean;
  };
}

export interface MultiTransFormationArgs {
  entity: string;
  filters: any;
  transformations: Transformation[];
}

export interface MultiTransFormationResults {
  crossLinking?: CrossLinking[];
  format: {
    xAxis?: Axis;
    yAxis?: Axis;
  };
  results: number[] | number[][];
  transformation: Transformation;
}

export interface AuthContext {
  dataSources: Record<string, any>;
  headers: Record<string, any>;
  user: {
    email: string;
    'cognito:id': string;
  };
  token: string;
}
