import { AttributeInputEvents } from '@kleeen/react/hooks';
import { ReactNode } from 'react';
import { Widget } from '../../../types';

interface CardWidgetProps {
  children: ReactNode;
  hideTitle?: boolean;
  icon: boolean;
  selectedViz?: number;
  title: string | JSX.Element;
  widgetSelector?: null | JSX.Element;
  disabled?: boolean;
}

interface CardTitleProps {
  icon: boolean;
  title: string | JSX.Element;
}

type GridJustification =
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

interface CardSectionProps {
  children?: ReactNode;
  hideTOC?: boolean;
  fullWidth?: boolean;
  justifyContent?: GridJustification;
  taskName?: string;
  widgets?: Widget[];
  registerEvents?: (event: AttributeInputEvents) => void;
  hideSaveAndClose?: boolean;
  onInputChange?: (hasChanged: boolean) => void;
  containerId?: string;
  skipAccessControlCheck?: boolean;
}

interface RenderChildrenProps {
  taskName: string;
  widgets?: Widget[];
  children?: ReactNode;
  registerEvents?: (event: AttributeInputEvents) => void;
  hideSaveAndClose?: boolean;
  onInputChange?: (hasChanged: boolean) => void;
  widgetsRefs?: any;
}

interface RenderWidgetProps {
  preferredWidget: string;
  widget: Widget;
  taskName: string;
  registerEvents?: (event: AttributeInputEvents) => void;
  hideSaveAndClose?: boolean;
  onInputChange?: (hasChanged: boolean) => void;
}

export { CardSectionProps, CardTitleProps, CardWidgetProps, RenderWidgetProps, RenderChildrenProps, Widget };
