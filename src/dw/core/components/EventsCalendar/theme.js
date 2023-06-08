import range from 'lodash/range';

import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
import lightBlue from '@material-ui/core/colors/lightBlue';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import yellow from '@material-ui/core/colors/yellow';

import {
  ENV_TYPE_FILTERS,
  PLATFORM_FILTERS,
  STORY_FILTERS,
  ABTESTING_STATUSES,
} from './constants';

export const BASE_COLORS = [
  cyan[500],
  lightBlue.A700,
  lightBlue.A400,
  green.A400,
  green.A700,
  lightBlue.A200,
  green.A200,
  purple[200],
  orange[700],
  deepPurple[200],
  red[200],
  yellow[700],
  grey[500],
  grey[500],
];

const assignColors = items =>
  items.reduce(
    (acc, value, idx) => ({ ...acc, [value]: BASE_COLORS[idx] }),
    {}
  );

export const calendarTheme = theme =>
  createMuiTheme({
    customTags: {
      colors: {
        0: amber[500],
        1: blue[500],
        2: cyan[400],
        3: deepPurple[300],
        4: green[500],
        5: indigo[300],
        6: orange[500],
        7: pink[300],
        8: red[400],
        9: teal[500],
        noCustomTags: grey[500],
      },
    },
    defaultCheckbox: {
      colors: {
        checkbox: grey[500],
      },
    },
    filters: {
      environments: {
        colors: {
          cert: yellow[800],
          crossEnv: deepPurple[300],
          dev: teal.A700,
          live: lightBlue.A700,
          [undefined]: grey[500],
        },
      },
      platforms: {
        colors: {
          ...assignColors(PLATFORM_FILTERS),
          [undefined]: grey[500],
        },
      },
      projects: {
        colors: {
          0: teal[500],
          1: orange[500],
          2: red[400],
          3: green[500],
          4: indigo[300],
          5: amber[500],
          6: cyan[400],
          7: deepPurple[300],
          8: blue[500],
          9: pink[300],
          [undefined]: grey[500],
        },
      },
      stories: {
        colors: {
          Group: teal[500],
          Timewarp: deepPurple[300],
          None: grey[500],
        },
      },
      demonwareEvents: {
        colors: {
          criticalEvents: lightBlue.A400,
          maintenance: yellow[700],
          incidents: orange[700],
          generalComments: cyan[500],
          [undefined]: grey[500],
        },
      },
      abTesting: {
        colors: {
          ...assignColors(ABTESTING_STATUSES),
          proposed: indigo[500],
          approved: orange.A700,
          [undefined]: grey[500],
        },
      },
      externalEvents: {
        colors: {
          holidays: green[500],
          pmg: yellow[900],
          [undefined]: grey[500],
        },
      },
      sources: {
        colors: {
          eventManager: blue[800],
          demonwareEvents: lightBlue[500],
          externalEvents: yellow[800],
          abTesting: green[800],
          informationalEvents: green[500],
        },
      },
    },
    eventsCalendar: {
      bg: {
        calendarChoice: grey[800],
        dayHeaderCurrent: `${grey[600]} !important`,
        dayHeaderSelected: `${grey[300]} !important`,
        dayMonth: 'white !important',
        dayMonthOutOfRange: `${grey[100]} !important`,
        dayMonthResetHover: `${lightBlue[200]} !important`,
        dayMonthSelectedInRange: `${lightBlue[50]} !important`,
        dayMonthSelection: `${lightBlue[100]} !important`,
        miniCalendarCurrentDay: lightBlue.A200,
        miniCalendarCurrentDayHover: lightBlue[200],
      },
      colors: {
        dayHeaderCurrent: `${grey[50]} !important`,
        dayHeaderSelected: `${grey[900]} !important`,
        miniCalendarCurrentDay: grey[50],
        miniCalendarDayNotDisplayedMonth: grey[400],
        toggleCalendarView: 'white',
      },
    },
    loading: {
      colors: {
        loadingErrorIcon: red[900],
      },
    },
    overrides: {
      ...theme.overrides,
      MuiChip: {
        label: {
          paddingLeft: '10px',
          paddingRight: '10px',
        },
      },
      MuiIconButton: {
        root: {
          padding: '6px',
        },
      },
      MuiButton: {
        ...theme.overrides.MuiButton,
        containedPrimary: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      },
    },
  });

const dayProps = {
  cursor: 'pointer',
  fontSize: '0.85em',
  minHeight: '30px',
  minWidth: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  textAlign: 'center',
  transition: '0.2s',
};

export const useStyles = makeStyles(theme => ({
  ...Object.assign(
    {},
    ...Object.values(ENV_TYPE_FILTERS).map(envType => ({
      [`filters-environments-${envType}`]: {
        color: `${theme.filters.environments.colors[envType]} !important`,
      },
      [`filters-environments-${envType}-event`]: {
        backgroundColor: `${theme.filters.environments.colors[envType]} !important`,
      },
      [`filters-environments-${envType}-event-list`]: {
        borderLeft: `7px solid ${theme.filters.environments.colors[envType]} !important`,
      },
    }))
  ),
  ...Object.assign(
    {},
    ...PLATFORM_FILTERS.map(platform => ({
      [`filters-platforms-${platform}`]: {
        color: `${theme.filters.platforms.colors[platform]} !important`,
      },
      [`filters-platforms-${platform}-event`]: {
        backgroundColor: `${theme.filters.platforms.colors[platform]} !important`,
      },
      [`filters-platforms-${platform}-event-list`]: {
        borderLeft: `7px solid ${theme.filters.platforms.colors[platform]} !important`,
      },
    }))
  ),
  ...Object.assign(
    {},
    ...[...range(0, 10)].map(num => ({
      [`filters-projects-${num}`]: {
        color: `${theme.filters.projects.colors[num]} !important`,
      },
      [`filters-projects-${num}-event`]: {
        backgroundColor: `${theme.filters.projects.colors[num]} !important`,
      },
      [`filters-projects-${num}-event-list`]: {
        borderLeft: `7px solid ${theme.filters.projects.colors[num]} !important`,
      },
    }))
  ),
  ...Object.assign(
    {},
    ...STORY_FILTERS.map(story => ({
      [`filters-stories-${story}`]: {
        color: `${theme.filters.stories.colors[story]} !important`,
      },
      [`filters-stories-${story}-event`]: {
        backgroundColor: `${theme.filters.stories.colors[story]} !important`,
      },
      [`filters-stories-${story}-event-list`]: {
        borderLeft: `7px solid ${theme.filters.stories.colors[story]} !important`,
      },
    }))
  ),
  envTypeCheckbox: {
    marginLeft: '5px',
  },
  ...Object.assign(
    {},
    ...[...range(0, 10)].map(num => ({
      [`customTags${num}`]: {
        color: `${theme.customTags.colors[num]} !important`,
      },
    }))
  ),
  ...Object.assign(
    {},
    ...[...range(0, 10)].map(num => ({
      [`customTags${num}-event`]: {
        backgroundColor: `${theme.customTags.colors[num]} !important`,
      },
    }))
  ),
  ...Object.assign(
    {},
    ...[...range(0, 10)].map(num => ({
      [`customTags${num}-event-list`]: {
        borderLeft: `7px solid ${theme.customTags.colors[num]} !important`,
      },
    }))
  ),
  defaultCheckbox: {
    color: `${theme.defaultCheckbox.colors.checkbox} !important`,
  },
  noCustomTags: {
    color: `${theme.customTags.colors.noCustomTags} !important`,
  },
  'noCustomTags-event-list': {
    borderLeft: `7px solid ${theme.customTags.colors.noCustomTags} !important`,
  },
  tagFiltersCheckbox: {
    paddingLeft: '15px',
    transform: 'scale(0.9)',
  },
  tagFiltersNoTagsCheckbox: {
    transform: 'scale(0.9)',
  },
  noCustomTagsCheckbox: {
    margin: '3px 0px 0px 56px',
  },
  'noCustomTags-event': {
    backgroundColor: `${theme.customTags.colors.noCustomTags} !important`,
  },
  calendar: {
    borderBottom: '1px solid #ddd',
    padding: '10px 0px 20px 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'center',
  },
  checked: { color: theme.eventsCalendar.bg.calendarChoice },
  checkboxLabel: {
    color: theme.eventsCalendar.bg.calendarChoice,
    textTransform: 'capitalize',
    fontSize: '0.9em',
    margin: 0,
    marginLeft: '15px',
    padding: 0,
  },
  tagsCheckboxLabel: {
    color: theme.eventsCalendar.bg.calendarChoice,
    margin: 0,
    padding: '0px 2px',
  },
  tagsCheckboxNoTagsLabel: {
    color: theme.eventsCalendar.bg.calendarChoice,
    margin: 0,
    padding: '0px',
  },
  choice: {
    padding: '8px 8px 8px 0',
    transform: 'scale(0.9)',
  },
  currentDate: {
    ...dayProps,
    backgroundColor: theme.eventsCalendar.bg.miniCalendarCurrentDay,
    borderRadius: '30px',
    color: theme.eventsCalendar.colors.miniCalendarCurrentDay,
    '&:hover': {
      backgroundColor: theme.eventsCalendar.bg.miniCalendarCurrentDayHover,
    },
  },
  customTagChoice: {
    padding: '5px',
    transform: 'scale(0.9)',
  },
  dayHeader: {
    padding: '2px 0px 0px 2px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& a': {
      borderRadius: '30px',
      height: '23px !important',
      minWidth: '23px !important',
      padding: '0px 2px 0px 2px',
      textAlign: 'center',
    },
  },
  dayHeaderCurrent: {
    '& a': {
      backgroundColor: theme.eventsCalendar.bg.dayHeaderCurrent,
      color: theme.eventsCalendar.colors.dayHeaderCurrent,
    },
  },
  dayHeaderSelected: {
    '& a': {
      backgroundColor: theme.eventsCalendar.bg.dayHeaderSelected,
      color: theme.eventsCalendar.colors.dayHeaderSelected,
    },
  },
  dayMonth: {
    backgroundColor: theme.eventsCalendar.bg.dayMonth,
  },
  dayMonthHover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  dayMonthOutOfRange: {
    backgroundColor: theme.eventsCalendar.bg.dayMonthOutOfRange,
  },
  dayMonthResetHover: {
    backgroundColor: theme.eventsCalendar.bg.dayMonthResetHover,
  },
  dayMonthSelectedInRange: {
    backgroundColor: theme.eventsCalendar.bg.dayMonthSelectedInRange,
  },
  dayMonthSelection: {
    backgroundColor: theme.eventsCalendar.bg.dayMonthSelection,
  },
  dayStyle: {
    ...dayProps,
    '&:hover': {
      backgroundColor: '#e5e5e6',
      borderRadius: '30px',
    },
  },
  filterTag: {
    height: theme.spacing(3),
  },
  loadingErrorIcon: {
    color: theme.loading.colors.loadingErrorIcon,
    marginLeft: '23px',
  },
  loadingErrorIconColorsOff: {
    color: `${theme.defaultCheckbox.colors.checkbox} !important`,
    marginLeft: '23px',
  },
  calendarView: {
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
}));
