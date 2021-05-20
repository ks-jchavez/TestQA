import { Action } from '@kleeen/types';

export interface ActionsSectionProps {
  actions: Action[];
  entity?: string;
  handleAddClick: (action: Action) => void;
  skinny?: boolean;
}
