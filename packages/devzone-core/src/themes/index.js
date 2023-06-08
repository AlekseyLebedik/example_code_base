import { createMuiTheme } from '@material-ui/core/styles';

import { green, grey, orange, red, yellow } from '@material-ui/core/colors';

import hexToRgba from 'hex-rgba';

import { SIDE_MARGIN, NAVBAR_HEIGHT, SUBNAVBAR_HEIGHT } from '../constants';

const grey50 = grey['50'];
const grey300 = grey['300'];
const grey500 = grey['500'];
const grey600 = grey['600'];
const grey700 = grey['700'];
const grey900 = grey['900'];

const newPrimaryColor = '#009688';
const newPrimaryContrast = '#fff';

const error = { light: '#c16e6f', main: '#d0021b', dark: '#721c24' };
const success = {
  light: '#6eb1a9',
  main: '#4db6ac',
  dark: '#00867d',
  contrastText: '#fff',
};

const baseMuiTheme = createMuiTheme({
  typography: {
    body2: {
      fontSize: '0.775rem',
    },
  },
});

export const theme = {
  typography: {
    htmlFontSize: 18,
    label1: {
      ...baseMuiTheme.typography.body2,
      fontSize: '0.66rem',
    },
  },
  globalTypography: {
    // also here avoiding <p> and <h6> since they are used for muliple mui styles
    '& h1:not(class^="ab")': baseMuiTheme.typography.h1,
    '& h2:not(class^="ab")': baseMuiTheme.typography.h2,
    '& h3:not(class^="ab")': baseMuiTheme.typography.h3,
    '& h4:not(class^="ab")': baseMuiTheme.typography.h4,
    '& h5:not(class^="ab")': baseMuiTheme.typography.h5,
    '& ul:not(class^="ab")': baseMuiTheme.typography.body2,
    '& ol:not(class^="ab")': baseMuiTheme.typography.body2,
  },
  palette: {
    primary: { main: '#4ac0f1', contrastText: '#fff' },
    secondary: { main: '#b71c1c' },
    inherit: { main: '#fff' },
    error,
    success,
  },
  overrides: {
    MuiFormControl: { root: { marginBottom: 8 } },
    MuiListItem: { root: { paddingTop: 6, paddingBottom: 6 } },
    MuiInput: { underline: { borderBottomColor: grey600 } },
    MuiTooltip: { tooltip: { fontSize: 14 } },
    MuiButton: {
      textPrimary: { color: newPrimaryColor },
      containedPrimary: {
        backgroundColor: newPrimaryColor,
        color: newPrimaryContrast,
      },
    },
    MuiChip: {
      root: { minWidth: 75 },
      colorPrimary: { backgroundColor: grey600, color: grey50 },
      clickableColorPrimary: {
        '&:hover': { backgroundColor: grey500 },
        '&:active, &:focus': { backgroundColor: grey600 },
      },
      deletableColorPrimary: {
        '&:hover': { backgroundColor: grey500 },
        '&:active, &:focus': { backgroundColor: grey600 },
      },
      outlined: {
        '$clickable&:focus, $deletable&:focus': {
          backgroundColor: 'transparent',
        },
      },
      deleteIcon: { fontSize: 20, borderRadius: 10, backgroundColor: grey50 },
      avatar: { backgroundColor: grey300 },
      avatarColorPrimary: { backgroundColor: grey700 },
    },
  },
  props: {
    MuiTabs: { indicatorColor: 'primary', textColor: 'inherit' },
    MuiIcon: { fontSize: 'small' },
  },
  datePicker: { headerColor: '#4ac0f1', selectColor: '#4ac0f1' },
  timePicker: { headerColor: '#4ac0f1', selectColor: '#4ac0f1' },
  header: {
    dark: {
      backgroundColor: '#333333',
      color: grey300,
      '&:hover': { color: grey50 },
    },
    light: { backgroundColor: 'white', color: grey900 },
  },
  avatar: { backgroundColor: grey600 },
  zIndex: { appBar: 10 },
  logLevels: {
    error: {
      color: hexToRgba(error.dark, 87),
      backgroundColor: error.light,
    },
    warning: {
      color: hexToRgba('#856404', 87),
      backgroundColor: '#FFF3CD',
    },
    debug: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    info: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
  },
  source: {
    mmp3: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    marketplace: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    auth3: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    dwsproxy: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    achievements_engine: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    'tournament-engine': {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    'loot-generation': {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    lsg: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    webservice: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    loginqueue: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    abtesting: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    objectstore: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    commsservice: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    'storage-script-service': {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    uno: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
    umbrella: {
      color: '#222222',
      backgroundColor: '#E2E3E5',
    },
  },
  navigationBar: {
    color: '#fff',
    backgroundColor: '#000000',
    height: NAVBAR_HEIGHT,
    sideMargin: SIDE_MARGIN,
    megaMenu: {
      color: '#fff',
      backgroundColor: '#282c34',
    },
    searchInput: {
      backgroundColor: grey700,
    },
    sectionTitle: {
      color: '#fff',
      backgroundColor: grey700,
    },
  },
  subnavBar: {
    color: '#fff',
    backgroundColor: '#282c34',
    height: SUBNAVBAR_HEIGHT,
  },
  taskStates: {
    palette: {
      cancelled: grey[500],
      failed: red.A400,
      'in-progress': yellow.A400,
      succeeded: green.A400,
      'timed-out': orange.A400,
    },
  },
  grayButton: {
    backgroundColor: '#616161',
    '&:hover': {
      background: '#282C34',
    },
  },
};

export default createMuiTheme(theme);
