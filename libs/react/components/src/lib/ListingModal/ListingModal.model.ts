import { Attribute, FormatProps, Result } from '@kleeen/types';

interface ListingCell {
  displayValue: string;
}

export interface ListingModalSettings {
  isOpen: boolean;
  columnLabel: string;
  rowDisplayValue: string;
  data: Result[];
  format: FormatProps;
  attribute: Attribute;
}

export interface ListingModalProps extends ListingModalSettings {
  onClose: () => void;
}
