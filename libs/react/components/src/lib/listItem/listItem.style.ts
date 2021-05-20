import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  item: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 'var(--tx-M)',
    height: 'var(--wh-1XS)',
    justifyContent: 'space-between',

    '&:nth-of-type(odd)': {
      color: 'var(--on-row-odd)',
      backgroundColor: 'var(--row-odd)',
    },
    '&:nth-of-type(even)': {
      color: 'var(--on-row-even)',
      backgroundColor: 'var(--row-even)',
    },
  },
  cell: {
    '&:first-of-type': {
      fontSize: 'var(--tx-L)',
      paddingTop: 'var(--pm-2XS)',
    },
    '&:last-of-type': {
      textAlign: 'right',
      paddingTop: 'var(--pm-1XS)',
    },
    position: 'relative',
    width: '50%',
    padding: '0 var(--pm-L)',
    height: '100%',
  },
  numericBar: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    top: '10%',
    left: 0,
    display: 'flex',
  },
  barSpace: {
    width: '50%',
    height: '100%',
    right: 0,
    top: 0,
  },
  bar: {
    height: '100%',
  },
  positiveBar: {
    backgroundColor: 'hsla(var(--viz1), .2)',
    borderLeft: 'var(--pm-6XS) solid hsla(var(--viz1), 1)',
    float: 'right',
  },
  negativeBar: {
    backgroundColor: 'hsla(var(--viz3), .2)',
    borderRight: 'var(--pm-6XS) solid hsla(var(--viz3), 1)',
    float: 'left',
  },
  textNumericBar: {
    position: 'inherit',
  },
}));
