import React, { ReactElement } from 'react';
import { useKleeenActions, useWidgetContext } from '@kleeen/react/hooks';

import { KsConfigTable } from '@kleeen/react/components';

export function ConfigTableWidget({
  actions,
  addModalAttributes,
  attributes,
  registerEvents,
  params,
  taskName,
  widgetId,
  ...props
}): ReactElement {
  const entityActions = useKleeenActions(taskName);
  const widgetData = useWidgetContext({
    taskName,
    widgetId,
    params: { ...params, attributes },
  });

  return (
    <KsConfigTable
      actions={actions}
      addModalAttributes={addModalAttributes}
      attributes={attributes}
      data={widgetData}
      entityActions={entityActions}
      onRegisterEvents={registerEvents}
      params={params}
      taskName={taskName}
      widgetId={widgetId}
      {...props}
    />
  );
}
