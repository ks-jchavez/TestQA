import { Attribute, Cell, ChangeDirectionsProps, FormatProps } from '@kleeen/types';
interface RowProps {
  id?: string;
}
export interface ContextMenuProps {
  attr: Attribute;
  cell: Cell | Cell[];
  format?: FormatProps;
  rowDisplayValue?: string;
  row?: RowProps;
  openShowMoreModal?: (ListingModalSettings) => void;
  hasDisplayMedia?: boolean;
}

export interface LabelResultsProps extends ChangeDirectionsProps {
  results: string | number;
  transformation: string;
  format?: FormatProps;
  formatType?: string;
  hasDisplayMedia?: boolean;
}
