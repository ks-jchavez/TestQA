import { Translate } from '@kleeen/types';
export type IVariant = 'standard' | 'filled' | 'outlined';
export interface IColorPickerProps {
  handleOnChange: () => void;
  label?: React.ReactNode;
  disabled?: boolean;
  defaultValue?: string;
  translate?: Translate;
  variant?: IVariant;
}
