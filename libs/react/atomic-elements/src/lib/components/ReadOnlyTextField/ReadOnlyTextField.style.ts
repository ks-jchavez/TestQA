import MuiTextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core';

export const StyledTextField = styled(MuiTextField)({
  width: '100%',
  padding: '6px 0px',
  '& Label': {
    color: 'var(--outlined-input)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    textAlign: 'left',
  },
  '& .Mui-focused': {
    color: 'var(--outlined-input-focus)',
  },
  '& .Mui-disabled': {
    color: 'var(--alt-mid-color);',
  },
  '& .MuiInputBase-input': {
    color: 'var(--on-surface-color)',
    textOverflow: 'ellipsis',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'var(--pm-7XS) solid var(--outlined-input)',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottom: 'var(--pm-6XS) solid var(--outlined-input-hover)',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'var(--pm-6XS) solid var(--outlined-input-focus)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--outlined-input)',
    borderRadius: '8px',
  },
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--outlined-input-hover)',
    },
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    color: 'var(--outlined-input-focus)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--outlined-input-focus)',
    },
  },
  '& svg': {
    color: 'var(--outlined-input)',
  },
});
