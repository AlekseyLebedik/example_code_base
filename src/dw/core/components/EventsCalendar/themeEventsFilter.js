import React from 'react';

import {
  ThemeProvider as MuiThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';

import { calendarTheme } from './theme';

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

function shadeColor(rawColor = '#adadad', percent) {
  const color = rawColor[0] === '#' ? rawColor : `#${rawColor}`;
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.ceil((R * (100 + percent)) / 100);
  G = Math.ceil((G * (100 + percent)) / 100);
  B = Math.ceil((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR =
    R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
  const GG =
    G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
  const BB =
    B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);

  return `#${RR}${GG}${BB}`;
}

export const useStyles = makeStyles(theme => ({
  ...Object.entries(theme.filters).reduce(
    (acc, [group, { colors }]) => ({
      ...acc,
      ...Object.entries(colors).reduce(
        (colorsAcc, [color, value]) => ({
          ...colorsAcc,
          [`filters-${group}-${color}-event`]: {
            borderColor: `${shadeColor(value, -25)} !important`,
            backgroundColor: `${value} !important`,
          },
          [`filters-${group}-${color}`]: {
            color: `${value} !important`,
          },
        }),
        {}
      ),
    }),
    {}
  ),
  envTypeCheckbox: {
    marginLeft: '5px',
  },
  defaultCheckbox: {
    color: `${theme.defaultCheckbox.colors.checkbox} !important`,
  },
  noCustomTags: {
    color: `${theme.customTags.colors.noCustomTags} !important`,
  },
  'noCustomTags-event-list': {
    borderLeft: `7px solid ${theme.customTags.colors.noCustomTags} !important`,
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
    padding: 0,
  },
  checkboxLabelHeader: {
    color: theme.eventsCalendar.bg.calendarChoice,
    textTransform: 'capitalize',
    fontSize: '1em',
    fontWeight: 500,
    opacity: 1,
  },
  checkboxLabelItem: {
    color: theme.eventsCalendar.bg.calendarChoice,
    textTransform: 'capitalize',
    fontSize: '0.9em',
    opacity: 0.8,
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
}));

const InnerWrapper = ({ children }) => {
  const classes = useStyles();
  return React.Children.map(children, child =>
    React.cloneElement(child, { classes }, null)
  );
};

export const CalendarThemeProvider = props => (
  <MuiThemeProvider theme={calendarTheme}>
    <InnerWrapper {...props} />
  </MuiThemeProvider>
);
