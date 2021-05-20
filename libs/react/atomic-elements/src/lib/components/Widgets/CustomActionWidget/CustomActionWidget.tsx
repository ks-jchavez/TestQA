import { GroupByProps, ValueProp, ValuesProps } from '../../../../types';
import { Button, CircularProgress, useStyles } from './CustomActionWidget.styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useKleeenActions, useKleeenContext, useUrlQueryParams } from '@kleeen/react/hooks';

import { ActionDialogs, Loader } from '@kleeen/react/components';
import capitalize from 'lodash.capitalize';
import { Action } from '@kleeen/types';

interface CustomActionWidgetProps {
  actions?: Action[];
  params: {
    baseModel: string;
    displayName?: string;
    operationName?: string;
    groupBy?: GroupByProps;
    value?: ValueProp | ValuesProps;
  };
  taskName: string;
  widgetId: string | number;
}

export const CustomActionWidget = ({
  actions,
  params,
  taskName,
  widgetId,
}: CustomActionWidgetProps): ReactElement => {
  const { dispatchCustomAction, addWidget } = useKleeenActions(taskName);
  const { widgets } = useKleeenContext(taskName);
  const paramsBasedOnRoute = useUrlQueryParams({ useNestedObjects: true });
  const [currentAction, setCurrentAction] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const classes = useStyles();

  const widget = widgets[widgetId];
  const { isLoading, data } = widget || {};

  useEffect(() => {
    addWidget({ widgetId });
  }, []);

  function dispatchAction(action: Action): void {
    const isCustomDialogOpen = isCustomOpen;
    const needsConfirmation = action?.areYouSure;

    if (isCustomDialogOpen && needsConfirmation) {
      setIsConfirmationOpen(true);
    } else {
      dispatchCustomAction({
        params,
        paramsBasedOnRoute,
        taskName,
        widgetId,
      });
    }
  }

  function handleClick(action: Action): void {
    setCurrentAction(action.displayName);

    if (action?.component) {
      setIsCustomOpen(true);
    } else if (action?.areYouSure) {
      setIsConfirmationOpen(true);
    } else {
      dispatchAction(action);
    }
  }

  function handleIsConfirmationOpenChange(): void {
    setIsConfirmationOpen(!isConfirmationOpen);
  }

  function handleIsCustomOpenChange(): void {
    setIsCustomOpen(!isCustomOpen);
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <div className={classes.divContainer}>
        {actions.map((action) => {
          return (
            <Button
              color="primary"
              disabled={isLoading}
              key={`${action.name}-button`}
              onClick={() => handleClick(action)}
              variant="contained"
            >
              {action.displayName}
            </Button>
          );
        })}

        {isLoading && (
          <>
            <CircularProgress size={24} />
            <span className={classes.message}>{capitalize(currentAction)} in progress...</span>
          </>
        )}
      </div>
      {actions.map((action) => (
        <ActionDialogs
          action={action}
          dispatchAction={dispatchAction}
          isConfirmationOpen={isConfirmationOpen}
          isCustomOpen={isCustomOpen}
          key={`${action.name}-action-dialogs`}
          onIsConfirmationOpenChange={handleIsConfirmationOpenChange}
          onIsCustomOpenChange={handleIsCustomOpenChange}
        />
      ))}
    </>
  );
};

export default CustomActionWidget;
