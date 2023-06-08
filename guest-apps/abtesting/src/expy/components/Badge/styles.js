import { makeStyles } from '@material-ui/core/styles';
import { themeStyles } from '../../../shared/theme';

export const useStyles = makeStyles(() => {
  const { proposal, ready, cancelled, live, done } = themeStyles;

  return {
    badge: {
      display: 'inline',
      fontSize: '0.75rem',
      marginBottom: '0',
      backgroundColor: '#ddd',
      borderRadius: '4px',
      fontWeight: '700',
      letterSpacing: '0.5px',
      marginRight: '5px',
      padding: '0.25rem 0.75rem',
      fontFamily: 'Roboto, sans-serif',
    },
    bullet: {
      '&::before': {
        backgroundColor: '#666',
        borderRadius: '7px',
        content: '""',
        display: 'inline-block',
        height: '7px',
        marginRight: '7px',
        width: '7px',
      },
    },
    white: {
      backgroundColor: '#FFFFFF',
    },
    basic: {
      backgroundColor: 'rgba(90, 104, 112, 0.1)',
    },
    proposal: {
      backgroundColor: proposal.light,
      '&::before': {
        backgroundColor: proposal.main,
      },
    },
    ready: {
      backgroundColor: ready.light,
      '&::before': {
        backgroundColor: ready.main,
      },
    },
    cancelled: {
      backgroundColor: cancelled.light,
      '&::before': {
        backgroundColor: cancelled.main,
      },
    },
    live: {
      backgroundColor: live.light,
      '&::before': {
        backgroundColor: live.main,
      },
    },
    done: {
      backgroundColor: done.light,
      '&::before': {
        backgroundColor: done.main,
      },
    },
  };
});
