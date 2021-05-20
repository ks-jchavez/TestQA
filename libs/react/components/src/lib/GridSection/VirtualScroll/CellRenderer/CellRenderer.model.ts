import { AmendCellUpdate, Attribute, AutocompleteState } from '@kleeen/types';

import { EditingCell } from '../../GridSection.model';
import { ListingModalSettings } from '../../../ListingModal/ListingModal';

export enum allComponentEnum {
  DataViewRow = 'DataViewRow',
  EditDataView = 'EditDataView',
  RemainingRow = 'RemainingRow',
}

export interface TypeOfProps {
  typeOf: allComponentEnum;
}

export interface CellData {
  id?: string;
  displayValue: number | string | Date;
}

export interface CellRendererProps {
  amendCellUpdate: AmendCellUpdate;
  actions: Array<any>;
  cellData: CellData;
  classes: any;
  columnIndex: number;
  columns: Array<any>;
  deleteContainer: Array<any>;
  deleteProcess: (id: string) => void;
  displayColumnAttribute: Attribute;
  editingCell: EditingCell;
  hasActions: boolean;
  isDeletable: boolean;
  localization: any;
  openShowMoreModal: (listingModalSettings: ListingModalSettings) => void;
  rowData: any;
  toggleDelete: (id: string) => void;
  triggerCustomAction: (action: any, id: string) => void;
  typeOf: (row: any) => any;
  draggable?: boolean;
  orderColumnName?: string;
}

export interface DataViewRowProps {
  hasActions: boolean;
  idx: number;
  attr: Attribute;
  row: any;
  toggleDelete: (id: string) => void;
  localization: any;
  isDeletable: boolean;
  actions: Array<any>;
  triggerCustomAction: (action: any, id: string) => void;
  deleteContainer: Array<any>;
  rowData: any;
  props: any;
  deleteProcess: (id: string) => void;
  displayColumnAttribute: Attribute;
  openShowMoreModal: (listingModalSettings: ListingModalSettings) => void;
  draggable?: boolean;
  orderColumnName?: string;
}

export interface EditDataViewProps {
  amendCellUpdate: AmendCellUpdate;
  attr: Attribute;
  autocomplete: AutocompleteState;
  deleteProcess: (id: string) => void;
  displayColumnAttribute: Attribute;
  editingCell: EditingCell;
  idx: number;
  isDeletable: boolean;
  onAutocompleteRequest: (attribute: string) => void;
  openShowMoreModal: (listingModalSettings: ListingModalSettings) => void;
  orderColumnName?: string;
  props: any;
  row: any;
  rowData: any;
  setEditingCell: React.Dispatch<React.SetStateAction<{}>>;
  draggable?: boolean;
}
