import './SnackBarSection.scss';

import { KsButton as Button, KsSnackbarContainer } from '@kleeen/react/components';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MuiDialog from '@material-ui/core/Dialog';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiSelect from '@material-ui/core/Select';
import MuiTooltip from '@material-ui/core/Tooltip';
import MuiTypography from '@material-ui/core/Typography';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import { styled } from '@material-ui/core/styles';
import { useTheme } from '@kleeen/react/hooks';

const Paper = styled(KsSnackbarContainer)({
  borderRadius: '0',
});

const TypographyBold = styled(MuiTypography)({
  fontSize: 'var(--tx-M)',
  fontWeight: 'bold',
  left: 'auto',
});

const FormControl = styled(MuiFormControl)({
  color: 'var(--alt-light-color)',
});

const InputLabel = styled(MuiInputLabel)({
  color: 'var(--secondary-color)',
  fontSize: 'var(--tx-M)',
  left: 'auto',
  '&.Mui-focused': {
    color: 'var(--secondary-color-variant)',
  },
});

const Select = styled(MuiSelect)({
  '& fieldset': {
    'border-color': 'var(--secondary-color)',
  },
  '&:hover': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      'border-color': 'var(--secondary-color-variant)',
    },
  },
  '&.Mui-focused': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      'border-color': 'var(--secondary-color-variant)',
    },
    '& .MuiSelect-root': {
      color: 'var(--secondary-color-variant)',
    },
  },
  '& .MuiSelect-root': {
    color: 'var(--secondary-color)',
  },
  '& svg': {
    color: 'var(--secondary-color)',
  },
});

const Dialog = styled(MuiDialog)({
  '& Button': {
    color: 'var(--secondary-color)',
    background: 'var(--transparent)',
    '&:hover': {
      background: 'var(--transparent)',
    },
  },
});

export interface SnackBarSectionProps {
  actions: Action[];
  entityActions: { [key: string]: Function };
  showSelectAndExecute: boolean;
  selectedRows: any[];
  entity: string;
  showSnackBar: boolean;
  setSelectedRows: any;
}

interface DeleteDialogProps {
  entity: string;
  open: boolean;
  entityActions: { [key: string]: Function };
  selectedRows: any[];
  setSelectedRows: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clearOnClose?: boolean;
  title?: string;
  description?: string;
}

interface SelectedStatsSectionProps {
  showSelectAndExecute: boolean;
  actions: Action[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Action {
  type: string;
  label?: string;
  func?: (params?: any) => any;
  disabled?: boolean;
  tooltip?: string;
}

enum ActionEnum {
  DELETE = 'DELETE',
  CUSTOM = 'CUSTOM',
}

// Select And Execute
const SelectedStatsSection1 = (props: {
  actions: Action[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <FormControl variant="outlined" className="select-action-form">
        <InputLabel id="select-action-label" className="select-action-label">
          Select Action
        </InputLabel>
        <Select
          labelId="select-action-label"
          id="select-action-label"
          className="select-action"
          label="Select Action"
        >
          <MenuItem value="delete">Delete</MenuItem>
        </Select>
        <MuiTypography variant="caption" display="block" className="action-tip">
          Select an action to bulk perform
        </MuiTypography>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className="action-button"
        onClick={() => {
          console.log('GO');
        }}
      >
        GO
      </Button>
    </>
  );
};

// Multi button group
const SelectedStatsSection2 = (props: {
  actions: Action[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  return (
    <>
      {props.actions.map(({ type, label, func, disabled, tooltip = '' }, index) => {
        switch (type) {
          case ActionEnum.DELETE:
            return (
              <MuiTooltip key={`${label}-${index}`} title={tooltip} placement="top">
                <span>
                  <Button
                    key={'delete'}
                    variant="contained"
                    color="primary"
                    className="multi-button"
                    onClick={handleClickOpen}
                    disabled={disabled}
                    data-kleeen-analytics-on="click"
                    data-kleeen-analytics-name="click"
                    data-kleeen-analytics-attrs={`component:ActionsSection,action:${type.toLowerCase()}`}
                  >
                    DELETE
                  </Button>
                </span>
              </MuiTooltip>
            );
          case ActionEnum.CUSTOM:
            return (
              <MuiTooltip key={`${label}-${index}`} title={tooltip} placement="top">
                <span>
                  <Button
                    key={label}
                    data-testid={`${(label || '').toLowerCase()}-action`}
                    variant="contained"
                    color="primary"
                    className="multi-button"
                    onClick={func}
                    disabled={disabled}
                    data-kleeen-analytics-on="click"
                    data-kleeen-analytics-name="click"
                    data-kleeen-analytics-attrs={`component:ActionsSection,action:${type.toLowerCase()}`}
                  >
                    {label}
                  </Button>
                </span>
              </MuiTooltip>
            );
        }
      })}
    </>
  );
};

const SelectedStatsSection = ({ showSelectAndExecute, actions, setOpen }: SelectedStatsSectionProps) => {
  return showSelectAndExecute ? (
    <SelectedStatsSection1 actions={actions} setOpen={setOpen} />
  ) : (
    <SelectedStatsSection2 actions={actions} setOpen={setOpen} />
  );
};

export const DeleteDialog = (props: DeleteDialogProps) => {
  const { themeClass } = useTheme();
  const title = props.title || `Deleting ${props.entity}`;
  const description = props.description || `Are you sure you want to delete this ${props.entity}?`;

  const handleClose = () => {
    if (props.clearOnClose) {
      props.setSelectedRows([]);
    }
    props.setOpen(false);
  };

  const handleDelete = () => {
    props.entityActions['deleteRequest']({ id: props.selectedRows[0].id });
    props.setOpen(false);
    props.setSelectedRows([]);
  };

  return (
    <Dialog
      className={themeClass}
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          data-testid="cancel-action"
          data-kleeen-analytics-on="click"
          data-kleeen-analytics-name="click"
          data-kleeen-analytics-attrs="component:DeleteDialog,action:cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="primary"
          data-testid="delete-action"
          data-kleeen-analytics-on="click"
          data-kleeen-analytics-name="click"
          data-kleeen-analytics-attrs="component:DeleteDialog,action:delete"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const SnackBarSection = (props: SnackBarSectionProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Slide in={props.showSnackBar} mountOnEnter unmountOnExit direction="up" timeout={400}>
        <Paper className={`snack-bar ${props.showSnackBar ? 'visible' : 'hidden'}`}>
          <Toolbar>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2} />
              <Grid container item xs={12} sm={8} justify="center" alignItems="center">
                {props.selectedRows.length > 0 && (
                  <>
                    <TypographyBold variant="button" display="block" className="snackbar-text">
                      {props.selectedRows.length}
                    </TypographyBold>
                    <MuiTypography variant="caption" display="block" className="snackbar-text">
                      {props.entity} selected
                    </MuiTypography>
                  </>
                )}
                <SelectedStatsSection
                  showSelectAndExecute={props.showSelectAndExecute}
                  actions={props.actions}
                  setOpen={setOpen}
                />
              </Grid>
              <Grid container item xs={12} sm={2} justify="flex-end" alignItems="center">
                {props.selectedRows.length > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    className="action-button"
                    onClick={() => {
                      props.setSelectedRows([]);
                    }}
                  >
                    DESELECT ALL
                  </Button>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </Paper>
      </Slide>
      <DeleteDialog
        entity={props.entity}
        open={open}
        setOpen={setOpen}
        entityActions={props.entityActions}
        selectedRows={props.selectedRows}
        setSelectedRows={props.setSelectedRows}
      />
    </>
  );
};

export default SnackBarSection;
