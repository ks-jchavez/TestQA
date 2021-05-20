import {
  Action,
  AmendCellUpdate,
  Attribute,
  AutocompleteState,
  FormatProps,
  Translate,
  GenericFunction,
} from '@kleeen/types';

import { Order } from './stableSort';

export interface EditingCell {
  rowId?: string;
  attributeName?: string;
  temporaryValue?: any;
}

interface Localization {
  searchPlaceholder: string;
  searchTooltip: string;
  clearSearchAriaLabel: string;
  addButtonAriaLabel: string;
  actionsTableHeaderRow: string;
  editButtonAriaLabel: string;
  deleteButtonAriaLabel: string;
  confirmArialLabel: string;
  rejectAriaLabel: string;
  confirmDeleteLabel: string;
}

interface GridSectionProps {
  actions?: Action[];
  attributes: Attribute[];
  autocomplete: AutocompleteState;
  enableEditMode?: boolean;
  entity: { isLoading: boolean; data: any[]; format?: FormatProps };
  entityActions?: { [key: string]: GenericFunction };
  entityId?: string;
  entityName: string;
  hasToolBar?: boolean;
  onAutocompleteRequest: (attribute: string) => void;
  onCellUpdate?: AmendCellUpdate;
  onDeleteRow?: (id: string) => void;
  onSortRow?: (newI: number, oldI: number) => void;
  orderColumnName?: string;
  selectedRows: Row[];
  setSelectedRows: any;
  sortable?: boolean;
  sortableColumns?: boolean;
  taskName?: string;
  translate?: Translate;
  widgetId: string | number;
  getMoreRows?: any;
}

interface Row {
  [key: string]: string | number;
}

interface TableHeaderProps {
  onSort: GenericFunction;
  order: Order;
  orderBy: string;
  attributes: Attribute[];
  handleChange: GenericFunction;
  hasActions: boolean;
  localization: Localization;
  widgetId: string | number;
}

export { TableHeaderProps, Row, GridSectionProps, Localization };
