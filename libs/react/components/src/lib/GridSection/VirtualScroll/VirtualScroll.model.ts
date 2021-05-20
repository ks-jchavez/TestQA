import { AmendCellUpdate, Attribute, AutocompleteState } from '@kleeen/types';

import { WithStyles } from '@material-ui/core/styles';
import { styles } from './VirtualScroll.style';

export interface ColumnData {
  attr?: Attribute;
  dataKey: string;
  label: string;
  numeric?: boolean;
  props?: any;
  width?: number;
}

export interface Row {
  index: number;
}

export interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
  amendCellUpdate: AmendCellUpdate;
  actions: Array<any>;
  attributes: Array<Attribute>;
  autocomplete: AutocompleteState;
  columns: Array<ColumnData>;
  deleteContainer: Array<any>;
  deleteProcess: (id: string) => void;
  enableEditMode?: boolean;
  editingCell: { rowId?: string; attributeName?: string };
  handleChange: (column: string, value: string) => any;
  hasActions: boolean;
  headerHeight?: number;
  isDeletable: boolean;
  localization: { [key: string]: string };
  onAutocompleteRequest: (attribute: string) => void;
  onRowClick?: () => void;
  onSort: (any) => any;
  order: number;
  orderBy: string;
  rowCount: number;
  rowGetter: (row: Row) => Data;
  rowHeight?: number;
  setEditingCell: React.Dispatch<React.SetStateAction<{}>>;
  toggleDelete: (id: string) => void;
  translate?: (key: string) => string;
  triggerCustomAction: (action: any, id: string) => void;
  typeOf: (row: any) => any;
  sortable?: boolean;
  sortableColumns?: boolean;
  onSortRow?: (newI: number, oldI: number) => void;
  orderColumnName?: string;
  getMoreRows?: any;
  widgetId?: string | number;
}

export interface Data {
  calories: number;
  carbs: number;
  dessert: string;
  fat: number;
  id: number;
  protein: number;
}

export type Sample = [string, number, number, number, number];
