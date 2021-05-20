import MuiContainer from '@material-ui/core/Container';
import MuiDialog from '@material-ui/core/Dialog';
import MuiTypography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

export const Container = styled(MuiContainer)({
  background: 'var(--page-intro-bg-color)',
  color: 'var(--page-intro-text-color)',
  boxShadow: 'var(--page-intro-shadow)',
  padding: 'var(--pm-S)',
});

export const Dialog = styled(MuiDialog)({
  '& Button': {
    color: 'var(--secondary-color)',
    background: 'var(--transparent)',
    '&:hover': {
      background: 'var(--transparent)',
    },
  },
});

export const Typography = styled(MuiTypography)({
  color: 'var(--page-intro-text-color)',
}) as typeof MuiTypography;
