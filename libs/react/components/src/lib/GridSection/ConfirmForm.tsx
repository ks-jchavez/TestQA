import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import './ConfirmForm.scss';
import { Localization } from './GridSection.model';
interface ConfirmFormProps {
  localization: Localization;
  confirmMethod: Function;
  rejectMethod: Function;
}

const ConfirmForm: React.FC<ConfirmFormProps> = (props: ConfirmFormProps) => {
  const {
    localization: { confirmArialLabel, rejectAriaLabel },
    confirmMethod,
    rejectMethod,
  } = props;
  return (
    <Toolbar className="confirm-form-container">
      <Tooltip title={confirmArialLabel}>
        <IconButton aria-label={confirmArialLabel} onClick={() => confirmMethod()}>
          <CheckIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={rejectAriaLabel}>
        <IconButton aria-label={rejectAriaLabel} onClick={() => rejectMethod()}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
export default ConfirmForm;
