import './DataViewControlSection.scss';

import { ActionDialogs, ActionsSection, AddDialogPayload, RefreshControl } from '@kleeen/react/components';
import { Container, Title, Typography } from './DataViewControlSection.styles';
import { HeaderTitle, HeaderTitleEllipsis } from '../HeaderTitle';
import React, { ReactElement, useState } from 'react';
import { isNilOrEmpty, sortByKeys } from '@kleeen/common/utils';

import { Action } from '@kleeen/types';
import { DataViewControlSectionProps } from './DataViewControlSection.model';
import Grid from '@material-ui/core/Grid';
import MuiTooltip from '@material-ui/core/Tooltip';
import { ViewSwitcher } from './ViewSwitcher';
import { isAddAction } from '@kleeen/render-utils';
import { isEmpty } from 'ramda';
import { useKleeenActions } from '@kleeen/react/hooks';

export function DataViewControlSection(props: DataViewControlSectionProps): ReactElement {
  const { refreshPage } = useKleeenActions(props.taskName);
  const [actionPayload, setActionPayload] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  // TODO: @cafe move this logic to a shared util and re-use it in HeaderAndSubSectionsComponent
  const viewOptionProps = props.viewOptions && props.viewOptions[props.value];
  const orderedViewProps = sortByKeys(props.viewOptions, ['viewOrder', 'viewId']);

  const addActions = getAddActions();
  const entityName = isNilOrEmpty(viewOptionProps?.entityName) ? props.entity : viewOptionProps.entityName;
  const modalAttributes = isNilOrEmpty(viewOptionProps?.modalAttributes)
    ? props.attributes
    : viewOptionProps.modalAttributes;

  function dispatchAction({ action, payload }: { action: Action; payload: AddDialogPayload }): void {
    const isCustomDialogOpen = isCustomOpen;
    const needsConfirmation = action?.areYouSure;

    if (isCustomDialogOpen && needsConfirmation) {
      setActionPayload(payload);
      setIsConfirmationOpen(true);
    } else {
      props.entityActions.addRequest(payload || actionPayload);
    }
  }

  function getAddActions(): Action[] {
    const localActions = isNilOrEmpty(viewOptionProps?.actions) ? props.actions : viewOptionProps.actions;
    return localActions?.filter(isAddAction);
  }

  function handleClick(action: Action): void {
    if (action?.component) {
      setIsCustomOpen(true);
    } else if (action?.areYouSure) {
      setIsConfirmationOpen(true);
    }
  }

  function handleIsConfirmationOpenChange(): void {
    setIsConfirmationOpen(!isConfirmationOpen);
  }

  function handleIsCustomOpenChange(): void {
    setIsCustomOpen(!isCustomOpen);
  }

  return (
    <>
      <Container className="dataview-control-section" maxWidth="xl">
        <Grid className="main-container" container alignItems="center">
          {props.showAvatar && (
            <Grid item xs={4} sm={2} container alignItems="center">
              <AvatarSection />
            </Grid>
          )}
          <Grid container className="typography-ellipsis" direction="column">
            <MuiTooltip title={HeaderTitle(props)} placement="top-start">
              <Title>
                <Typography variant="h2" component="h1">
                  {HeaderTitleEllipsis(props)}
                </Typography>
              </Title>
            </MuiTooltip>
            {props.results != null && (
              <Typography className="results">
                <>{props.results} Results</>
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid className="options" container alignItems="center">
          <ViewSwitcher
            handleChangeTab={props.handleChangeTab}
            showDropDown={props.showDropDown}
            taskName={props.taskName}
            value={props.value}
            viewOptions={orderedViewProps}
          />
        </Grid>
        <Grid className="actions" container alignItems="center">
          {!props.hideRefreshControl && <RefreshControl onRefresh={refreshPage} />}
          {!isEmpty(addActions) && (
            <ActionsSection actions={addActions} entity={entityName} handleAddClick={handleClick} />
          )}
        </Grid>
      </Container>
      {addActions.map((action) => (
        <ActionDialogs
          action={action}
          attributes={modalAttributes}
          dispatchAction={dispatchAction}
          entity={entityName}
          isConfirmationOpen={isConfirmationOpen}
          isCustomOpen={isCustomOpen}
          key={`${action.name}-dialogs`}
          onIsConfirmationOpenChange={handleIsConfirmationOpenChange}
          onIsCustomOpenChange={handleIsCustomOpenChange}
          parent={props.parent}
          taskName={props.taskName}
        />
      ))}
    </>
  );
}

function AvatarSection(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect id="blue_square" fill="#069" x="0" y="0" width="100%" height="100%" />
    </svg>
  );
}

export default DataViewControlSection;
