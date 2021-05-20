import { TranslateProps } from '../../../../../types';
import { OutContainerProps } from '../ContainerHeader/ContainerHeader.model';

export interface ButtonFilterProps extends OutContainerProps, TranslateProps {
  filters?: FilterProps[];
  taskName?: string;
}

export interface FilterProps {
  name: string;
  statisticalType: string;
}
