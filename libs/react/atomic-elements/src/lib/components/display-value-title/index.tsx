import { WidgetContextAttributes, useWidgetContext } from '@kleeen/react/hooks';

import React from 'react';
import { TextFormatter } from '@kleeen/react/components';
import { pathOr } from 'ramda';
import { WidgetDataAttributes } from '@kleeen/types';

interface DisplayValueTitleProps {
  objectValue: string;
  operationName: string;
  taskName: string;
  formatType?: string;
}

export function DisplayValueTitle({
  objectValue,
  operationName,
  taskName,
  formatType,
}: DisplayValueTitleProps): JSX.Element {
  const params = {
    baseModel: objectValue,
    operationName,
    taskName,
    formatType,
  };
  const attributes = [{ name: objectValue, aggregation: 'noAggregation' }];
  const widgetData = useWidgetContext({
    taskName,
    widgetId: WidgetContextAttributes.DisplayValueTitle,
    params: { ...params, attributes },
  });

  const getDisplayValue = pathOr('', [
    'data',
    'data',
    0,
    `${WidgetDataAttributes.DisplayValue}::${objectValue}`,
    'displayValue',
  ]);
  const displayValue = getDisplayValue(widgetData);
  const format = pathOr({}, ['data', 'format', objectValue], widgetData);

  if (!widgetData) {
    return <>{'...'}</>;
  }

  return (
    <TextFormatter format={format} formatType={formatType} transformation="selfSingle">
      {displayValue}
    </TextFormatter>
  );
}
