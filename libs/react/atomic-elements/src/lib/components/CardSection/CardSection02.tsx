import './CardSection02.scss';

import { CardSectionProps, RenderChildrenProps, Widget } from './CardWidget.model';
import React, { ReactElement, ReactNode, useRef } from 'react';
import { TableContent, TransformToWidgetComponent } from './components';

import { CardWidget02 } from './CardWidget02';
import classnames from 'classnames';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { useAccessControlChecker } from '@kleeen/core-react';

const rolePermissionOk = 'SHOW';

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
  children,
  hideSaveAndClose,
  onInputChange,
  registerEvents,
  taskName,
  widgets,
  widgetsRefs,
}: RenderChildrenProps): JSX.Element | ReactNode {
  if (widgets && !children) {
    return widgets.map((widget: Widget) => {
      const widgetCompleted = addCurrentWidgetTypeToViableSolutions(widget);

      return (
        <div ref={widgetsRefs[widget.id]} id={widget.id.toString()}>
          <TransformToWidgetComponent
            key={`card-section-widget-${widget.id}`}
            taskName={taskName}
            widget={widgetCompleted}
            registerEvents={registerEvents}
            hideSaveAndClose={hideSaveAndClose}
            onInputChange={onInputChange}
            CardWidgetElement={CardWidget02}
          />
        </div>
      );
    });
  }
  if (typeof children === 'function') {
    return children({
      widgetsRefs,
    });
  } else {
    return children;
  }
}

export const CardSection02 = ({
  children,
  justifyContent = 'flex-start',
  taskName,
  widgets = [],
  registerEvents,
  hideSaveAndClose,
  onInputChange,
  containerId,
  hideTOC,
  fullWidth,
  skipAccessControlCheck = false,
}: CardSectionProps): ReactElement => {
  const widgetsRefs = {};
  const filteredWidgets = [];

  if (!hideTOC) {
    widgets?.forEach((widget) => {
      widgetsRefs[widget.id] = useRef(null);
    });
  }

  if (!skipAccessControlCheck) {
    widgets.forEach((widget) => {
      if (
        rolePermissionOk ===
        useAccessControlChecker(roleAccessKeyTag(`${taskName}.WIDGETS.${widget.id}`)).permission
      ) {
        filteredWidgets.push(widget);
      }
    });
  }

  return (
    <div
      className={classnames('card-section02', { 'hide-toc': hideTOC, 'full-width': fullWidth })}
      style={{ justifyContent }}
      key={`card-section-${taskName}`}
    >
      {!hideTOC && (
        <TableContent widgets={filteredWidgets} widgetsRefs={widgetsRefs} containerId={containerId} />
      )}
      <div className={classnames('card-widgets-section', { 'full-width': fullWidth })}>
        {renderChildren({
          taskName,
          widgets: filteredWidgets,
          children,
          hideSaveAndClose,
          onInputChange,
          registerEvents,
          widgetsRefs,
        })}
      </div>
    </div>
  );
};

export default React.memo(CardSection02);
