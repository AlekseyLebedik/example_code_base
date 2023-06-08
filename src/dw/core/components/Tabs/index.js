import React from 'react';
import PropTypes from 'prop-types';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const tabsStyles = theme => ({
  root: {
    minHeight: 32,
  },
  indicatorRoot: {
    height: 3,
  },
  indicatorRootDefault: {
    height: 2,
  },
  indicatorColorPrimary: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  indicatorColorDefault: {
    backgroundColor: theme.palette.text.secondary,
  },
  flexContainer: {},
});

const tabStyles = {
  root: {
    maxWidth: 265,
    minHeight: 32,
  },

  selected: {},
  textColorPrimary: {},

  textColorInherit: {
    '&:hover': {
      color: 'inherit',
      opacity: 0.87,
      '&$selected': {
        opacity: 1,
      },
    },
  },
};

const TabsComponent = ({ classes, indicatorColor, ...props }) => (
  <MuiTabs
    {...props}
    classes={{ root: classes.root, flexContainer: classes.flexContainer }}
    TabIndicatorProps={{
      color: 'primary',
      classes: {
        root:
          indicatorColor === 'default'
            ? classes.indicatorRootDefault
            : classes.indicatorRoot,
        colorPrimary:
          indicatorColor === 'default'
            ? classes.indicatorColorDefault
            : classes.indicatorColorPrimary,
      },
    }}
  />
);
TabsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  indicatorColor: PropTypes.string,
};
TabsComponent.defaultProps = {
  indicatorColor: 'primary',
};

const Tabs = withStyles(tabsStyles)(TabsComponent);
const Tab = withStyles(tabStyles)(MuiTab);

export { Tabs, Tab };
