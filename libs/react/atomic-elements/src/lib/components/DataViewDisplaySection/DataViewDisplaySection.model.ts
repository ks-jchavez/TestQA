import { ReactText } from 'react';
import { Row } from '../../../../../components/src/lib/GridSection/GridSection.model';
import { Widget } from '@kleeen/react/atomic-elements';

export interface DataViewDisplaySectionAtomicProps {
  dashboardWidgets: Widget[];
  entityName: string;
  selectedRows: Row[];
  setSelectedRows: () => void;
  singleViewWidgets?: Widget[];
  atomicCustomViews?: any[];
  tableWidgets: Widget[];
  taskName: string;
  value: any;
  setCardsNumber?: (e: number) => void;
}

export type DisplaySectionViews = {
  widget: any;
  taskName?: string;
  selectedRows?: Row[];
  setSelectedRows?: () => void;
  dashboardWidgets?: any;
  indexToRender: number;
};

export type DashboardView = {
  type: ViewType;
  viewOrder: number;
  dashboardWidgets: Widget[];
  viewId: ReactText;
};

export enum ViewType {
  custom = 'Custom',
  dashboard = 'Dashboard',
  single = 'Single',
  table = 'Table',
}
