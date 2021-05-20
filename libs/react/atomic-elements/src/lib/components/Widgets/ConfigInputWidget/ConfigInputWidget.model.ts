import { Attribute, FormatProps } from '@kleeen/types';

import { AttributeInputEvents } from '@kleeen/react/hooks';
import { StatisticalType } from '@kleeen/render-utils';

export enum elementCase {
  FIELD_NOT_ADD_HAVE_MANY = 'Field Can Not Add Values and Have Many',
  FIELD_ADD = 'Field Can Add Values',
  FIELD_ADD_NOT_MANY = 'Field Can Add Values and Not Have Many',
  FIELD_CAN_NOT_ADD = 'Field Can Not Add Values',
  RADIO_GROUP = 'Group - Radio',
  CHECK_GROUP = 'Group - Check',
}

export enum airTableElementType {
  SELECT_ONLY = 'Selection Only',
  NEW_PLUS_EXISTING = 'New + Existing',
}

export enum transformationElements {
  SELF_SINGLE = 'selfSingle',
  SELF_MULTI = 'selfMulti',
}

export const KS_GLOBAL_APP = '[KS] GlobalApp';

export const INITIAL_ATTRIBUTE_VALUE_HAS_MANY = [];
export const INITIAL_ATTRIBUTE_VALUE_SINGLE = '';

export interface ConfigInputWidgetProps {
  attributes?: Attribute[];
  disabled?: boolean;
  hideSaveAndClose?: boolean;
  hideTitle?: boolean;
  inSummaryDetails?: boolean;
  icon: boolean;
  onInputChange?: (hasChanged: boolean) => void;
  params?: {
    baseModel: string;
  };
  registerEvents?: (events: AttributeInputEvents) => void;
  taskName: string;
  title: string;
  widgetId: string | number;
  statisticalType: StatisticalType;
}

export interface TransformToElementProps {
  attrLabel: any;
  autoCompleteValues?: any;
  canAddValues: boolean;
  disabled: boolean;
  hideTitle: boolean;
  elementToUse: any;
  format?: FormatProps;
  formatType?: string;
  inputValue: any;
  inSummaryDetails: boolean;
  setInputValue: any;
  setSelectedOption: any;
  statisticalType: StatisticalType;
  transformation?: string;
  refValue?: any;
  errors?: any;
  helpText?: string;
}
