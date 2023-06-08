import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import devzoneTheme from '../themes';

import { LinkSuite, FavoritesSuite, SearchSuite } from './components/Suites';
import Subnav from './components/Subnav';
import Dropdown from './components/Dropdown';
import Notifications from './components/Notifications';
import Feedback from './components/Feedback';
import { MAIN_NAVBAR_HEIGHT, SUBNAVBAR_HEIGHT } from '../constants';
import logo from '../themes/dw-logo-blue.svg';
import { NavbarChildrenContext } from './context';
import { SectionTitleContext } from './components/SectionTitleWrapper';

const useStyles = theme => ({
  growContainer: {
    zIndex: 1300,
    position: 'relative',
  },
  navbarContainer: {
    height: `${theme.navigationBar.height}px !important`,
  },
  navbarCenter: {
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  userDrivenSuites: {
    minWidth: '6rem',
    height: theme.navigationBar.height,
  },
  suites: {
    display: 'inline-block',
    [theme.breakpoints.down(1300)]: {
      display: 'none',
    },
    height: theme.navigationBar.height,
    flexShrink: '0',
  },
  childrenSection: {
    padding: '0 20px',
    height: theme.navigationBar.height,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackSection: {
    width: '50%',
    flexShrink: '10',
  },
  feedbackButtonContainer: {
    width: '100%',
    textAlign: 'center',
  },
  titleSection: {},
  separator: {
    borderRight: '1px solid #9E9E9E',
  },
  title: {
    color: theme.palette.inherit.main,
    display: 'block',
    textAlign: 'left',
    fontSize: '13px',
    maxWidth: 'fit-content',
  },
  subtitle: {
    color: theme.palette.primary.main,
    textAlign: 'left',
    fontSize: '8px',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    fontWeight: '100',
    display: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: '2px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
    margin: '0 2em',
    padding: '10px',
    width: 'auto',
  },
  searchIcon: {
    width: '2em',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '2em',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  profileSection: {
    display: 'flex',
  },
  logoSection: {
    width: 26,
    height: 'auto',
    marginRight: '10px',
  },
});

const NavigationBarBase = props => {
  const {
    companyColumnRoutes,
    suites,
    bookmarksRoutes,
    devzoneReleaseNote,
    eventManagerReleaseNote,
    frameworkReleaseNote,
    classes,
    childrenSectionProps,
    ProfileComponent,
    showSubnav,
    currentMaintenanceList,
    hasFeatureSwitch,
  } = props;
  const { section } = useContext(SectionTitleContext);
  const { setNavbarChildrenContainer } = useContext(NavbarChildrenContext);
  useEffect(() => {
    document.title = `${section.title} - Devzone`;
  }, [section.title]);
  return (
    <div className={classes.growContainer}>
      <div className={classes.navbarContainer}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <img
              alt="Demonware logo"
              src={logo}
              className={classes.logoSection}
            />

            <div className={classes.userDrivenSuites}>
              <SearchSuite items={companyColumnRoutes} classes={classes} />
              <FavoritesSuite items={bookmarksRoutes} />
            </div>

            <div className={classes.navbarCenter}>
              <div className={classes.titleSection}>
                <Typography className={classes.title} noWrap>
                  {section.title}
                </Typography>
                <Typography className={classes.subtitle} noWrap>
                  by Demonware
                </Typography>
              </div>
              <div
                className={classes.childrenSection}
                ref={setNavbarChildrenContainer}
                {...childrenSectionProps}
              />
            </div>
            <div className={classes.feedbackSection}>
              <div className={classes.feedbackButtonContainer}>
                <Feedback />
              </div>
            </div>

            <div className={classes.suites}>
              {suites.map(s => (
                <LinkSuite
                  suiteProps={s}
                  key={s.key || s.title}
                  classes={classes}
                  buttonProps={{ title: s.title }}
                />
              ))}
            </div>

            {ProfileComponent && (
              <div className={classes.profileSection}>
                <ProfileComponent
                  avatarProps={{
                    style: {
                      width: '25px',
                      height: '25px',
                      fontSize: '15px',
                      margin: '10px',
                      backgroundColor: '#4ac0f1',
                    },
                  }}
                />
              </div>
            )}
            <Notifications
              hasFeatureSwitch={hasFeatureSwitch}
              currentMaintenanceList={currentMaintenanceList}
              devzoneReleaseNote={devzoneReleaseNote}
              eventManagerReleaseNote={eventManagerReleaseNote}
              frameworkReleaseNote={frameworkReleaseNote}
            />
            <Dropdown />
          </Toolbar>
        </AppBar>
      </div>
      {showSubnav && section.subnav !== false && <Subnav />}
    </div>
  );
};

NavigationBarBase.propTypes = {
  companyColumnRoutes: PropTypes.array.isRequired,
  routes: PropTypes.array.isRequired,
  suites: PropTypes.array.isRequired,
  bookmarksRoutes: PropTypes.array.isRequired,
  hasFeatureSwitch: PropTypes.func.isRequired,
  devzoneReleaseNote: PropTypes.object,
  eventManagerReleaseNote: PropTypes.object,
  frameworkReleaseNote: PropTypes.object,
  classes: PropTypes.object.isRequired,
  childrenSectionProps: PropTypes.object,
  ProfileComponent: PropTypes.elementType,
  showSubnav: PropTypes.bool,
  currentMaintenanceList: PropTypes.arrayOf(PropTypes.object),
};

NavigationBarBase.defaultProps = {
  devzoneReleaseNote: {},
  eventManagerReleaseNote: {},
  frameworkReleaseNote: {},
  childrenSectionProps: {},
  ProfileComponent: null,
  showSubnav: false,
  currentMaintenanceList: [],
};

const StyledNavigationBar = withStyles(useStyles)(NavigationBarBase);

const navBarTheme = createMuiTheme({
  ...devzoneTheme,
  navigationBar: {
    ...devzoneTheme.navigationBar,
    height: MAIN_NAVBAR_HEIGHT,
  },
  subnavBar: {
    ...devzoneTheme.subnavBar,
    height: SUBNAVBAR_HEIGHT,
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: devzoneTheme.navigationBar.color,
        backgroundColor: devzoneTheme.navigationBar.backgroundColor,
        height: MAIN_NAVBAR_HEIGHT,
      },
      colorSecondary: {
        color: devzoneTheme.subnavBar.color,
        backgroundColor: devzoneTheme.subnavBar.backgroundColor,
        height: SUBNAVBAR_HEIGHT,
      },
    },
    MuiToolbar: {
      root: {
        padding: '0 15px !important',
      },
      regular: {
        [devzoneTheme.breakpoints.up('xs')]: {
          minHeight: MAIN_NAVBAR_HEIGHT,
        },
      },
    },
  },
  props: {
    MuiIcon: { fontSize: 'default' },
  },
});

const WithThemeNavigationBar = props => (
  <MuiThemeProvider theme={navBarTheme}>
    <StyledNavigationBar {...props} />
  </MuiThemeProvider>
);

export default WithThemeNavigationBar;
