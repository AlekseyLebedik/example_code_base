import { createMuiTheme } from '@material-ui/core/styles';

export const themeStyles = {
  info: {
    main: '#136EE0',
  },
  proposal: {
    main: '#ffc107',
    light: 'rgba(255, 193, 7, 0.1)',
  },
  ready: {
    main: '#25bf58',
    light: 'rgba(17, 132, 55, 0.1)',
  },
  live: {
    main: '#116edf',
    light: 'rgba(17, 110, 223, 0.1)',
  },
  done: {
    main: '#4b37bc',
    light: 'rgba(75, 55, 188, 0.1)',
  },
  cancelled: {
    main: '#f44336',
    light: 'rgba(250, 92, 124, 0.18)',
  },
  denied: {
    main: '#f44336',
    light: 'rgba(250, 92, 124, 0.18)',
  },
  approved: {
    main: '#25bf58',
    light: 'rgba(17, 132, 55, 0.1)',
  },
  pending: {
    main: '#ffc107',
    light: 'rgba(255, 193, 7, 0.1)',
  },
};

export default theme =>
  createMuiTheme({
    ...theme,
    palette: {
      ...theme.palette,
      statuses: {
        ...themeStyles,
      },
    },
  });
