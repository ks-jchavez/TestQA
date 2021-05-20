import './CardSection.scss';

import { CardSectionProps, RenderChildrenProps, Widget } from './CardWidget.model';
import React, { ReactElement, ReactNode } from 'react';

import { AccessControl } from '@kleeen/core-react';
import { TransformToWidgetComponent } from './components';
import { roleAccessKeyTag } from '@kleeen/common/utils';

/**
 * viableSolutions needs the current chartType included
 * adding this only if there is a existing alternative solution
 * added failsafe to prevent multiple solutions of the same chartType
 */
const addCurrentWidgetTypeToViableSolutions = (widget: Widget): Widget => {
  const resultWidget = { ...widget };

  if (resultWidget.viableSolutions.length && !resultWidget.viableSolutions.includes(resultWidget.chartType)) {
    resultWidget.viableSolutions.unshift(resultWidget.chartType);
  }

  return resultWidget;
};

function renderChildren({
  taskName,
  widgets,
  children,
  registerEvents,
  hideSaveAndClose,
  onInputChange,
}: RenderChildrenProps): JSX.Element | ReactNode {
  if (widgets) {
    return widgets.map((widget: Widget) => {
      const widgetCompleted = addCurrentWidgetTypeToViableSolutions(widget);
      return (
        <AccessControl
          id={roleAccessKeyTag(`${taskName}.widgets.${widget.id}`)}
          key={`card-section-widget-${widget.id}`}
        >
          <TransformToWidgetComponent
            key={`card-section-widget-${widget.id}`}
            taskName={taskName}
            widget={widgetCompleted}
            registerEvents={registerEvents}
            hideSaveAndClose={hideSaveAndClose}
            onInputChange={onInputChange}
          />
        </AccessControl>
      );
    });
  } else {
    return children;
  }
}

export const CardSection = ({
  children,
  justifyContent = 'flex-start',
  taskName,
  widgets,
  registerEvents,
  hideSaveAndClose,
  onInputChange,
}: CardSectionProps): ReactElement => {
  return (
    <div className="card-section" style={{ justifyContent }} key={`card-section-${taskName}`}>
      {renderChildren({ taskName, widgets, children, registerEvents, hideSaveAndClose, onInputChange })}
    </div>
  );
};

export default CardSection;
