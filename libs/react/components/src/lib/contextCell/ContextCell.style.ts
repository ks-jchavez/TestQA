import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  contextMenuButton: {
    textTransform: 'initial',
    color: 'var(--secondary-color)',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  
  contextCellArrow: {
    '> svg.arrow-neutral': {
      display: 'block',
      opacity: 0,
    }
  },
  textAlignRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textAlignLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  cell: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
});
