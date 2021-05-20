import React, { MouseEvent } from 'react';

import { ConfirmationDialogProps } from './ConfirmationDialog.model';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button as KsButton } from '../../ActionDialogs.styles';
import { KsDialog } from '../../../dialog';
import capitalize from 'lodash.capitalize';
import { useTheme } from '@kleeen/react/hooks';

export function ConfirmationActionDialog({
  description,
  onAction,
  onClose,
  open,
  title,
}: ConfirmationDialogProps): JSX.Element {
  const { themeClass } = useTheme();

  function handleAction(e: MouseEvent): void {
    onAction(e);
    onClose();
  }

  function handleClose(): void {
    onClose();
  }

  return (
    <KsDialog aria-labelledby="form-dialog-title" className={themeClass} onClose={handleClose} open={open}>
      <DialogTitle id="form-dialog-title">{capitalize(title)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <KsButton onClick={handleClose}>Cancel</KsButton>
        <KsButton color="primary" onClick={handleAction}>
          {title}
        </KsButton>
      </DialogActions>
    </KsDialog>
  );
}
