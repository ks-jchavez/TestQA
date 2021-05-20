import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  entityBrowserArea: {
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
    width: '100%',
  },
  entityBrowserAreaWithFilterSection: {
    width: '100%',
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
  },
  entityBrowserTask: {
    background: 'var(--application-background)',
    display: 'flex',
    'grid-auto-flow': 'row',
    'grid-auto-rows': '100%',
    'grid-template-columns': 'var(--wh-5XL) calc(100% - var(--wh-5XL))',
    height: '100%',
    width: '100%',
  },
  dashboardCardSection: {
    height: 'calc(100% - 186px)',
    margin: 'var(--pm-0) var(--pm-L)',
    overflow: 'auto',
    'padding-bottom': 'var(--pm-L)',
  },
  entityBrowserFilterSection: {
    height: 'calc(100% - var(--pm-L) - var(--pm-L))',
    zIndex: 0,
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
  },
  gridPageIntro: {
    marginBottom: 'var(--pm-L)',
    marginRight: 'var(--pm-L)',
  },
  gridGridSection: {
    height: 'calc(100% - var(--wh-M) - var(--pm-L))',
    marginBottom: 'var(--pm-L)',
    marginRight: 'var(--pm-L)',
    transition: 'height 400ms',
  },
  snackbar: {
    height: 'calc(100% - var(--wh-L) - var(--pm-1XS) - var(--wh-M) - var(--pm-4XS))',
  },
});
