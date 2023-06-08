import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import AdapterLink from 'dw/core/components/AdapterLink';
import { Tabs, Tab } from 'dw/core/components/Tabs';
import { joinPath } from 'dw/core/helpers/path';

const useStyles = theme => ({
  root: {
    backgroundColor: theme.navigationBar.sectionTitle.backgroundColor,
    color: theme.navigationBar.sectionTitle.color,
  },
});

const RouteTabs = ({ baseUrl, value, routesList, classes }) => (
  <AppBar position="static" elevation={0} className={classes.root}>
    <Tabs value={value}>
      {routesList.map(route => (
        <Tab
          key={route.key}
          component={AdapterLink}
          label={route.label}
          baseUrl={baseUrl}
          to={joinPath(baseUrl, route.key)}
        />
      ))}
    </Tabs>
  </AppBar>
);

RouteTabs.propTypes = {
  baseUrl: PropTypes.string,
  value: PropTypes.number,
  routesList: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object,
};

RouteTabs.defaultProps = {
  baseUrl: undefined,
  value: undefined,
  routesList: [],
  classes: {},
};

export default compose(withStyles(useStyles))(RouteTabs);
