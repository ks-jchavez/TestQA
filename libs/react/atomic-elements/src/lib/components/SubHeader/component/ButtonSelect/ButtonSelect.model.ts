import { Action } from '@kleeen/types';
import { TranslateProps } from '../../../../../types';
export interface ButtonSelectProps extends TranslateProps {
  viewOptions: ViewOptionsProps[];
  handleChangeTab: (e) => void;
  value: string;
  taskName?: string;
}

export interface ViewOptionsProps {
  actions?: Action[];
  entity: string;
  entityName: string;
  modalAttributes: { name: string }[];
  name: string;
  type: string;
  viewId: string;
  translate: (key: string) => string;
  viewOrder?: number;
}
