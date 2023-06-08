import {
  blue,
  blueGrey,
  brown,
  deepPurple,
  green,
  grey,
  lightBlue,
  indigo,
  orange,
  red,
  teal,
  yellow,
} from '@material-ui/core/colors';
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { get } from 'lodash';

export const eventStateColors = {
  active: lightBlue.A200,
  approved: green.A700,
  cancelled: brown[400],
  ended: blueGrey[500],
  expired: grey[500],
  open: green[700],
  pending: orange[700],
  published: lightBlue.A700,
  rejected: red[600],
  scheduled: deepPurple.A400,
};

// Stories height: calc(100vh - 80px) and padding-top: 102px
export const useStyles = makeStyles(theme => ({
  unitLayout: {
    paddingTop: `0px !important`,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    height: `calc(100vh - ${get(
      theme,
      'navigationBar.height',
      0
    )}px) !important`,
  },
}));

export default (theme: Theme): Theme =>
  createMuiTheme({
    ...theme,
    abTesting: {
      bg: {
        abTesting: teal[400],
        active: lightBlue[600],
        analysis: deepPurple[600],
        archived: grey[600],
        config: teal[600],
        killed: red[600],
        proposed: indigo[500],
        approved: orange.A400,
      },
    },
    demonwareEvents: {
      bg: {
        demonwareEvents: theme.palette.primary.main,
        criticalEvents: red[400],
        generalComments: lightBlue[400],
        incidents: yellow[600],
        maintenance: deepPurple[300],
      },
    },
    externalEvents: {
      bg: {
        externalEvents: orange[600],
        holidays: green[400],
        'video-games': lightBlue[400],
        sports: yellow[600],
        pmg: indigo[900],
      },
    },
    activities: {
      thunderpants: {
        live: lightBlue.A200,
        deploy: green.A700,
        undeploy: red[600],
        modify: yellow[600],
        deprecated: orange[600],
      },
    },
    informationalEvents: {
      bg: {
        ...eventStateColors,
        demonware: lightBlue.A200,
        informationalEvents: deepPurple[300],
        'first-party': orange[700],
        cdl: green[700],
      },
    },
    eventManager: {
      bg: {
        ...eventStateColors,
        eventManager: blue[600],
        grey: '#F5F5F5 !important',
        inherit: '#FFF',
        status: grey[600],
      },
      palette: {
        red: theme.palette.error.main,
        green: '#009788',
        yellow: '#E09E38',
        grey: '#000',
        dev: '#9e9e9e',
        cert: '#6aa8be',
        live: '#00BD1F',
      },
      taskBg: {
        cancelled: grey[400],
        failed: red[400],
        inProgress: yellow[400],
        succeeded: lightBlue.A700,
        timedOut: orange.A400,
      },
    },
    conflicts: {
      palette: {
        'all-conflict-types': grey[500],
        'event-overlap': green.A400,
        'activity-overlap': yellow[700],
        'activity-title-overlap': orange.A400,
        'activity-title-conflict': red.A400,
        conflictToggleBlock: teal[600],
      },
    },
    tasks: {
      palette: {
        cancelled: grey[500],
        failed: red.A400,
        'in-progress': yellow.A400,
        succeeded: green.A400,
        'timed-out': orange.A400,
      },
    },
    overrides: {
      ...theme.overrides,
      MuiAppBar: {
        root: {
          boxShadow: 'none',
        },
      },
      MuiTabs: {
        root: {
          borderBottom: '1px solid #E8E8E8',
        },
        indicator: { backgroundColor: '#707070', height: '3px' },
      },
      MuiTab: {
        root: {
          minWidth: '100px !important',
          fontWeight: 400,
        },
      },
      MuiIconButton: {
        root: {
          padding: '6px',
        },
      },
      MuiBadge: {
        badge: {
          height: '14px',
          minWidth: '14px',
          fontSize: '10px',
          color: '#FFF',
          backgroundColor: theme.palette.error.main,
        },
        dot: {
          right: '-5px',
        },
      },
      MuiSelect: {
        select: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
      },
    },
  });
