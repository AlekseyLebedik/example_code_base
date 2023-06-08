import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';

import '../../../themes/ABTestingIcons/style.css';
import '../../../themes/EventManagerIcons/style.css';
import '../../../themes/AuditLogIcons/style.css';
import '../../../themes/TAOnlineIcon/style.css';
import styles from './index.module.css';

const useStyles = theme => ({
  ...theme.navigationBar,
  megaMenuButton: {
    color: theme.palette.inherit.main,
    backgroundColor: theme.navigationBar.backgroundColor,
  },
  title: {
    color: theme.navigationBar.color,
  },
  megaMenuBox: {
    backgroundColor: theme.navigationBar.megaMenu.backgroundColor,
    color: theme.navigationBar.color,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      height: '15px',
    },
    '&::-webkit-scrollbar-thumb': {
      border: '0px',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: theme.navigationBar.megaMenu.backgroundColor,
    },
  },
  menu: {
    backgroundColor: theme.navigationBar.backgroundColor,
  },
  paper: {
    position: 'fixed',
    top: '40px !important',
    left: '0px !important',
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    backgroundColor: theme.navigationBar.megaMenu.backgroundColor,
    borderRadius: '0px !important',
  },
  list: {
    padding: '0px',
    height: '100%',
  },
});

const SuiteButtonBase = ({
  onClick,
  onMouseEnter,
  isActive,
  icon,
  classes,
  children,
  title,
  badge,
  bookmarkCount,
}) => {
  let renderIcon;
  if (icon && badge) {
    renderIcon = (
      <Badge color="primary" badgeContent={bookmarkCount}>
        <Icon>{icon}</Icon>
      </Badge>
    );
  } else if (icon && !badge) {
    renderIcon = <Icon className={icon}>{icon}</Icon>;
  }
  return (
    <span className={styles.megaMenuGroup}>
      <Tooltip title={title}>
        <button
          type="button"
          color="inherit"
          className={classNames(styles.megaMenuButton, classes.megaMenuButton, {
            [styles.megaMenuButtonActive]: isActive,
            [styles.megaMenuButtonBadge]: badge,
          })}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
        >
          {renderIcon}
        </button>
      </Tooltip>
      {children}
    </span>
  );
};

SuiteButtonBase.propTypes = {
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  icon: PropTypes.string.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isActive: PropTypes.bool,
  title: PropTypes.string,
  badge: PropTypes.bool,
  bookmarkCount: PropTypes.number,
};

SuiteButtonBase.defaultProps = {
  classes: {},
  children: undefined,
  onClick: () => {},
  onMouseEnter: () => {},
  isActive: false,
  title: '',
  badge: false,
  bookmarkCount: null,
};

export const SuiteButton = withStyles(useStyles)(SuiteButtonBase);

const MegaMenuBase = ({ classes, menuProps, children }) => (
  <Menu
    {...menuProps}
    PaperProps={{ className: classes.paper }}
    MenuListProps={{ className: classes.list }}
  >
    <div className={classNames(styles.megaMenuBox, classes.megaMenuBox)}>
      <div className={styles.megaMenuContent}>{children}</div>
    </div>
  </Menu>
);

MegaMenuBase.propTypes = {
  classes: PropTypes.object,
  showFavorites: PropTypes.bool,
  showSearch: PropTypes.bool,
  items: PropTypes.array,
  menuProps: PropTypes.object,
  children: PropTypes.node.isRequired,
};

MegaMenuBase.defaultProps = {
  classes: {},
  showFavorites: true,
  showSearch: true,
  items: [],
  menuProps: {},
};

const StyledMegaMenu = withStyles(useStyles)(MegaMenuBase);

const WithThemeMegaMenu = ({ ...props }) => {
  const megaMenuTheme = theme =>
    createMuiTheme({
      ...theme,
      overrides: {
        MuiModal: {
          root: {
            zIndex: 1502,
          },
        },
      },
    });
  return (
    <MuiThemeProvider theme={megaMenuTheme}>
      <StyledMegaMenu {...props} />
    </MuiThemeProvider>
  );
};

export default WithThemeMegaMenu;
