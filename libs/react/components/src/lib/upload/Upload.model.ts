import { BadgeProps as MuiBadgeProps } from '@material-ui/core/Badge';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { Translate } from '@kleeen/types';

export interface FileResult {
  filteredFiles: Array<File>;
  filteredFilesRead: Array<string>;
}
interface Localization {
  uploadLabel: string;
  filesAllowed: string;
}
interface UploadProps {
  onChange: (result: FileResult) => void;
  label?: string;
  allowedExtensions?: [];
  hasMultiple?: boolean;
  translate?: Translate;
  buttonConfig?: MuiButtonProps;
  badgeConfig?: MuiBadgeProps;
}
interface ButtonUploadProps {
  label?: string;
  onChange: (result: FileResult) => void;
  allowedExtensions?: [];
  hasMultiple?: boolean;
  localization: Localization;
  buttonConfig?: MuiButtonProps;
  badgeConfig?: MuiBadgeProps;
}

export { UploadProps, ButtonUploadProps };
