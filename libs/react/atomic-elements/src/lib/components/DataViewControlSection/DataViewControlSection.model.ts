import { Action, GenericFunctions } from '@kleeen/types';

export interface Attribute {
  name: string;
  type?: string;
}

export type HandleChangeTab = (value: number | unknown) => void;

export interface TabSwitcherProps {
  handleChangeTab: HandleChangeTab;
  viewOptions?: {
    actions?: Action[];
    entity: string;
    entityName: string;
    modalAttributes: { name: string }[]; // TODO: @carreta this should has only the required attributes.
    name: string;
    type: string;
    viewId?: string;
    viewOrder?: number;
  }[];
  value: number;
  taskName?: string;
}

export interface SwitcherProps extends TabSwitcherProps {
  showDropDown: boolean;
}

export interface DataViewControlSectionProps extends TabSwitcherProps {
  actions?: Action[];
  attributes: Attribute[];
  description?: string;
  entity?: string;
  entityActions?: GenericFunctions;
  hideRefreshControl?: boolean;
  isEntityDetails?: boolean;
  objectValue: string;
  parent?: { id: string; entity: string };
  results: number;
  showActions: boolean;
  showAvatar: boolean;
  showDesc: boolean;
  showDropDown: boolean;
  showTitle: boolean;
  slots: any[];
  taskName: string;
  title?: string;
  order?: number;
}

export enum DisplayViewType {
  FullView = 'fullView',
  Grid = 'grid',
  Listing = 'listing',
}
