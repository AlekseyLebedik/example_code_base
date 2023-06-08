import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => {
  const drawerXSWidth = 300;
  const drawerSMWidth = 450;
  const drawerMDWidth = 500;
  const drawerLGWidth = 550;
  const drawerXLWidth = 675;

  return {
    rootContainer: {
      margin: '0',
      overflow: 'auto',
    },
    main: {
      display: 'flex',
    },
    headerContainer: {
      [theme.breakpoints.down('xs')]: {
        marginLeft: '15px',
        marginTop: '15px',
      },
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      margin: '0',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    title: {
      fontSize: '2.25rem',
      margin: '1rem 1.5rem',
    },
    createBtn: {
      marginRight: '1.5rem',
      backgroundColor: theme.palette.primary.main,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      [theme.breakpoints.down('xs')]: {
        width: drawerXSWidth,
      },
      [theme.breakpoints.up('sm')]: {
        width: drawerSMWidth,
      },
      [theme.breakpoints.up('md')]: {
        width: drawerMDWidth,
      },
      [theme.breakpoints.up('lg')]: {
        width: drawerLGWidth,
      },
      [theme.breakpoints.up('xl')]: {
        width: drawerXLWidth,
      },
      flexShrink: 0,
    },
    drawerPaper: {
      [theme.breakpoints.down('xs')]: {
        width: drawerXSWidth,
      },
      [theme.breakpoints.up('sm')]: {
        width: drawerSMWidth,
      },
      [theme.breakpoints.up('md')]: {
        width: drawerMDWidth,
      },
      [theme.breakpoints.up('lg')]: {
        width: drawerLGWidth,
      },
      [theme.breakpoints.up('xl')]: {
        width: drawerXLWidth,
      },
      backgroundColor: theme.palette.grey[100],
      paddingTop: theme.spacing(12),
    },
    drawerPaperFullWidth: {
      width: '100vw',
      transition: 'all 250ms ease !important',
      backgroundColor: '#FAFAFA',
      paddingTop: theme.spacing(12),
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.down('xs')]: {
        marginRight: -drawerXSWidth,
      },
      [theme.breakpoints.up('sm')]: {
        marginRight: -drawerSMWidth,
      },
      [theme.breakpoints.up('md')]: {
        marginRight: -drawerMDWidth,
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: -drawerLGWidth,
      },
      [theme.breakpoints.up('xl')]: {
        marginRight: -drawerXLWidth,
      },
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    drawerBtnContainer: {
      position: 'absolute',
      top: '0',
      right: '20px',
    },
    expandBtn: {
      marginRight: theme.spacing(1),
      fontSize: '11px',
    },
    closeBtn: {
      fontSize: '11px',
    },
    zIndex: {
      zIndex: '-1',
    },
  };
});
