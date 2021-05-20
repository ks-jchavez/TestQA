import { WidgetInitialState, WidgetState } from '../store/ducks/widget';

import { getWidgetContextName } from '../helpers';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useEffect } from 'react';
import { useInjectReducerToStore } from './use-inject-reducer-to-store';
import { useKleeenActions } from './useKleeenActions';
import { useKleeenContext } from './useKleeenContext';
import useUrlQueryParams from './useUrlQueryParams';

export interface WidgetContextProps {
  params: any;
  taskName: string;
  widgetId: string | number;
}

export enum WidgetContextAttributes {
  DisplayValueTitle = 'displayValueTitle',
  ObjectListing = 'object_listing_',
}

export function useWidgetContext({ params, taskName, widgetId }: WidgetContextProps): WidgetState {
  const { operationName } = params;
  const isCustomWidget = isNilOrEmpty(operationName);
  if (isCustomWidget) {
    return WidgetInitialState;
  }
  const widgetContext = getWidgetContextName({ taskName, widgetId: widgetId as string });

  const isContextReady = useInjectReducerToStore(widgetContext);

  const entityActions = useKleeenActions(widgetContext);

  const widgetData: WidgetState = useKleeenContext(widgetContext);
  const { status = { version: 0 } } = useKleeenContext(taskName);

  const paramsBasedOnRoute = useUrlQueryParams({ useNestedObjects: true });

  useEffect(() => {
    const canContinue = isContextReady && !isNilOrEmpty(entityActions);
    if (!canContinue) {
      return;
    }

    entityActions.getData({ taskName, widgetId, params, paramsBasedOnRoute });
  }, [isContextReady, entityActions, JSON.stringify(paramsBasedOnRoute), status.version]);

  return widgetData || WidgetInitialState;
}
