import { makeStyles } from '@material-ui/core/styles';

export const styleList = makeStyles(() => ({
  list: {
    fontSize: 'var(--tx-M)',
    height: '100%',
    overflowY: 'auto',
    borderRadius: 'var(--card-border-radius)',
  },
}));
