import { CrossLinking, FormatProps, ResultsProps } from '@kleeen/types';

export interface ContextProps {
  data: DataProps;
  error: string;
  isLoading: boolean;
}

export interface DataProps extends ResultsProps {
  crossLinking: CrossLinking[] | CrossLinking;
  format: FormatProps;
}

export interface TranslateProps {
  translate: (key: string) => string;
}
