import React, { ReactElement } from 'react';

import { ActionType } from '@kleeen/types';
import { ActionsSectionProps } from './ActionSection.model';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid } from '@material-ui/core';
import { KsButton } from '../button';
import { KsButtonText } from './ActionSection.styles';
import { isNilOrEmpty } from '@kleeen/common/utils';

function ActionsSection({
  actions,
  entity,
  handleAddClick,
  skinny = false,
}: ActionsSectionProps): ReactElement | null {
  if (isNilOrEmpty(actions)) {
    return null;
  }

  const { component: Button, size, variant } = getComponentAndProps(skinny);

  return (
    <Grid container item spacing={1} justify="flex-start" alignItems="center">
      {actions.map((action) => {
        const { displayName, name, type } = action;
        const actionType = type.toLowerCase();

        switch (actionType) {
          case ActionType.Add:
            return (
              <Grid item key={name}>
                <Button
                  color="primary"
                  onClick={() => handleAddClick(action)}
                  size={size}
                  startIcon={skinny && <AddCircleIcon fontSize="small" />}
                  variant={variant}
                >
                  {displayName} new {entity}
                </Button>
              </Grid>
            );
          case ActionType.Delete:
            return (
              <Grid item key={name}>
                <Button color="primary" size={size} variant={variant}>
                  {displayName} {entity}
                </Button>
              </Grid>
            );
          case ActionType.Custom:
            return (
              <Grid item key={name}>
                <Button color="primary" size={size} variant={variant}>
                  {displayName}
                </Button>
              </Grid>
            );
        }
      })}
    </Grid>
  );
}

function getComponentAndProps(skinny: boolean): { component: any; size: string; variant: string } {
  if (skinny) {
    return {
      component: KsButtonText,
      size: 'small',
      variant: 'text',
    };
  }

  return {
    component: KsButton,
    size: 'medium',
    variant: 'contained',
  };
}

export default ActionsSection;
