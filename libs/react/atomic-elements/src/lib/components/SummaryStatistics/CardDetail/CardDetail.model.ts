import { Attribute, FormatProps, ResultsProps } from '@kleeen/types';
import { DataProps, TransformationProps } from '../../../../types';

export interface CardDetailProps {
  attribute: Attribute;
  label: string;
  results: DataProps;
  transformation: TransformationProps;
}

export interface LabelResultsProps extends ResultsProps {
  transformation: TransformationProps;
  format: FormatProps;
  textAlignment?: 'center' | 'left' | 'flex-end';
  formatType?: string;
}
