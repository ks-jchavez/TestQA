import { Action } from '@kleeen/types';
import { PopperProps } from '@material-ui/core';
import { WidgetTypes } from '../../../enums';

export interface ActionList extends Partial<PopperProps> {
  actions: Action[];
  handleClose: (event: React.MouseEvent<EventTarget, globalThis.MouseEvent>) => void;
  openDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ActionsProps {
  actions: Action[];
  openDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DeleteDialogProps {
  entity: string;
  taskName: string;
  open: boolean;
  deleteAction: (payload: { id: string; entity: string; goBack: () => void }) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DetailSummaryProps {
  actions: Action[];
  objectValue: string;
  operationName: string;
  slots: [Slot[], any];
  taskName: string;
  taskTitle: string;
}

export interface Slot {
  attributes: SlotAttribute[];
  chartType: WidgetTypes;
  id: string | number;
  params: {
    baseModel: string;
    operationName?: string;
    value?: {
      formatType?: string;
      name?: string;
      transformation?: string;
    };
  };
}

export interface SlotAttribute {
  aggregation: string;
  label: string;
  name: string;
}

export interface SlotsProps {
  slots: Slot[];
  taskName: string;
}
