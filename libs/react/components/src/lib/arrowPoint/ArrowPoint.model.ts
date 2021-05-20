import { ChangeDirectionsProps } from '@kleeen/types';

export interface ArrowPointProps extends ChangeDirectionsProps, ResultProps {
  className?: string;
  showPercentage?: boolean;
}

export interface ResultProps {
  result: number;
}
