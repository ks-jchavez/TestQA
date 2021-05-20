import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(() => ({
  root: {
    '&.color-picker-component': {
      position: 'relative',
      '&.is-disabled': {
        pointerEvents: 'none',
        '&::before': {
          display: 'none',
        },
      },
      '&::before': {
        position: 'absolute',
        left: 'var(--size-size0)',
        top: 'var(--size-size0)',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        content: '""',
        display: 'block',
        zIndex: '9',
        '&[disabled]': {
          cursor: 'default',
        },
      },
      '& .popover': {
        position: 'absolute',
        top: 'calc(100% + 2px)',
        left: '0',
        borderRadius: '9px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '9999',
      },
      '& .preview-color': {
        width: 'var(--size-size11)',
        height: 'var(--size-size11)',
        borderRadius: 'calc(var(--size-size11) / 2)',
        marginRight: 'var(--pm-6XS)',
        border: 'solid 1px var(--grey_light_0x)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'var(--on-surface-color)',
      '&.Mui-disabled': {
        color: 'var(--alt-mid-color)',
      },
    },

    '&.focused': {
      '& .MuiInputBase-root': {
        color: 'var(--on-surface-color)',
        '& fieldset': {
          borderColor: 'var(--on-surface-color)',
          borderWidth: '2px',
        },
      },
    },
    '& .MuiInputBase-root': {
      color: 'var(--on-surface-color)',
      width: '100%',
      '& .MuiInputBase-input': {
        textTransform: 'uppercase',
      },
      '& fieldset': {
        borderColor: 'var(--on-surface-color) !important',
      },
    },
  },
}));
