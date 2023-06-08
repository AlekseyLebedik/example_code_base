import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { RenderRoutes } from 'dw/core/helpers/routes';

import UnitLayout from 'dw/core/components/UnitLayout';
import CriticalError from 'dw/core/components/CriticalError';
import LoadingComponent from 'dw/core/components/Loading';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import eventManagerTheme, { useStyles } from './theme';

import Navigation from './components/Navigation';
import MissingProjectPanel from './components/MissingProjectPanel';

import styles from './index.module.css';

const StatelessApp = ({
  basePath,
  currentProject,
  hasCurrentProjectSettings,
  isMissingSettings,
  routes,
}) => {
  const classes = useStyles();
  const navBarProps = useMemo(() => ({ routes, basePath }), [routes, basePath]);
  return (
    <UnitLayout
      NavbarComponent={Navigation}
      navBarProps={navBarProps}
      classes={classes}
    >
      <CriticalError>
        {isMissingSettings ? (
          <LoadingComponent />
        ) : (
          <MuiThemeProvider theme={eventManagerTheme}>
            <div className={styles.EventManagerMainRow}>
              {!hasCurrentProjectSettings && (
                <MissingProjectPanel projectName={currentProject.name} />
              )}
              <RenderRoutes
                routes={routes}
                basePath={basePath}
                id="projectId"
                hideEnv
              />
            </div>
          </MuiThemeProvider>
        )}
      </CriticalError>
    </UnitLayout>
  );
};

StatelessApp.propTypes = {
  basePath: PropTypes.string.isRequired,
  currentProject: PropTypes.object.isRequired,
  hasCurrentProjectSettings: PropTypes.bool.isRequired,
  isMissingSettings: PropTypes.bool.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StatelessApp;
