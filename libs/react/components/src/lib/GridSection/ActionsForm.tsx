import './ActionsForm.scss';

import { Action, ActionType } from '@kleeen/types';
import React, { FC, MouseEvent, ReactElement, useState } from 'react';

import ActionsMenu from '../ActionsMenu/ActionsMenu';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import { Localization } from './GridSection.model';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { RowData } from '../config-table';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface ActionsFormProps {
  actions: Action[];
  handleCustomAction: (action: Action) => void;
  handleDelete: () => void;
  handleEdit: () => void;
  isDeletable: boolean;
  isEditable?: boolean;
  localization: Localization;
  row: RowData;
}

const ActionsForm: FC<ActionsFormProps> = (props: ActionsFormProps): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const {
    actions,
    handleCustomAction,
    isDeletable,
    isEditable,
    localization: { editButtonAriaLabel, deleteButtonAriaLabel },
    row,
  } = props;

  const isEnable = (isActionEnable: boolean): boolean => isActionEnable;
  const numberOfActionsEnabled = [isDeletable, isEditable, !isNilOrEmpty(actions)].filter(isEnable).length;

  const getActionsContainerClass = (quantityOfActions: number): string =>
    quantityOfActions === 1 ? 'has-single-element' : '';
  const actionsContainerClass = getActionsContainerClass(numberOfActionsEnabled);

  const actionsFormContainerClass = `actions-form-container ${actionsContainerClass}`;

  function handleClick(e: MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(e.currentTarget);
  }

  function handleClose(e: MouseEvent): void {
    e.stopPropagation();
    setAnchorEl(null);
  }

  const customActions = actions?.filter(({ type }) => type === ActionType.Custom) || [];

  return (
    <Toolbar className={actionsFormContainerClass}>
      {isEditable && (
        <Tooltip title={editButtonAriaLabel}>
          <IconButton aria-label={editButtonAriaLabel} onClick={props.handleEdit}>
            <CreateIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {isDeletable && (
        <Tooltip title={deleteButtonAriaLabel}>
          <IconButton aria-label={deleteButtonAriaLabel} onClick={props.handleDelete}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {customActions.length > 0 && (
        <IconButton aria-controls="actions-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreHorizIcon fontSize="small" />
          {Boolean(anchorEl) && (
            <ActionsMenu
              actions={customActions}
              anchorEl={anchorEl}
              handleClose={handleClose}
              row={row}
              triggerAction={handleCustomAction}
            />
          )}
        </IconButton>
      )}
    </Toolbar>
  );
};

export default ActionsForm;
