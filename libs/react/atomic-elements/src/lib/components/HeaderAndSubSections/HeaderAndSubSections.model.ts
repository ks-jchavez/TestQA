import { ActionsManagerProps } from '@kleeen/react/components';
import { EntityDetailsSectionProps } from '../EntityDetailsSection/EntityDetailsSection';
import { FilterProps } from '../SubHeader/component/ButtonFilter/ButtonFilter.model';
import { Slot } from '../DetailSummary/DetailSummary.model';
import { TranslateProps } from '../../../types';
import { ViewOptionsProps } from '../SubHeader/component/ButtonSelect/ButtonSelect.model';

export interface HeaderAndSubSectionsProps extends TranslateProps {
  actionsProps: ActionsManagerProps;
  filters?: FilterProps[];
  handleChangeTab: (e: boolean) => void;
  hideRefreshControl?: boolean;
  objectValue: string;
  slots?: Slot[];
  subTitle?: string;
  taskName: string;
  title: string;
  upText?: string;
  value: string;
  viewOptions: ViewOptionsProps[];
  withDateFilter?: boolean;
  withFilterSection?: boolean;
  withSummarySection?: EntityDetailsSectionProps;
}
