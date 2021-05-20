import { AggregationType } from '@kleeen/types';

export interface GroupByProps {
  name: string;
  transformation: string;
  formatType: string;
}

export interface TransformationProps {
  isPrimary: boolean;
  transformation: AggregationType;
  transformationMetadata?: TransformationMetadataProps;
  metadata?: TransformationMetadataProps;
}

export interface TransformationMetadataProps {
  changeDirections: string;
}

export interface ValueProp {
  name: string;
  transformation: string;
  formatType: string;
}

export interface ValuesProps {
  label: string;
  name: string;
  transformations: TransformationProps[];
  formatType: string;
}

export interface VizParams {
  baseModel: string;
  cardinality?: string;
  displayName?: string;
  groupBy?: GroupByProps;
  operationName?: string;
  taskName?: string;
  value?: ValueProp | ValuesProps;
}

export interface VizCommonParams {
  params: VizParams;
}
