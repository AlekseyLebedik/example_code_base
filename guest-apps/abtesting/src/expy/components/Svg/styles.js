import { makeStyles } from '@material-ui/core/styles';
import { themeStyles } from '../../../shared/theme';

export const useStyles = makeStyles(theme => {
  const { approved, pending, denied, info } = themeStyles;

  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      margin: '0.5rem 0',
    },
    xsmall: {
      width: '0.95rem',
      height: '0.95rem',
    },
    small: {
      width: '1rem',
      height: '1rem',
    },
    medium: {
      width: '1.25rem',
      height: '1.25rem',
    },
    large: {
      width: '1.5rem',
      height: '1.5rem',
    },
    xlarge: {
      width: '3rem',
      height: '3rem',
    },
    illustration: {
      width: '6.5rem',
      height: '6.5rem',
    },
    approved: {
      fill: approved.main,
    },
    pending: {
      fill: pending.main,
    },
    denied: {
      fill: denied.main,
    },
    info: {
      fill: info.main,
    },
    placeholder: {
      fill: theme.palette.grey[400],
    },
  };
});
