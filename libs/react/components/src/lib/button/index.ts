import MuiButton from '@material-ui/core/Button';
import { styled } from '@material-ui/core';

export const KsButton = styled(MuiButton)({
  background: 'var(--secondary-color)',
  boxShadow: 'var(--shadow-button)',
  color: 'var(--on-secondary-color)',
  '&:hover': {
    background: 'var(--secondary-color-variant)',
    color: 'var(--on-secondary-color-variant)',
  },
});
