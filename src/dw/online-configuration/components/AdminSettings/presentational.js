import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { LEGACY_HOST } from 'dw/config';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const useStyles = theme => ({
  icon: {
    color: theme.palette.inherit.main,
    position: 'relative',
    top: '1px',
    fontSize: '24px',
    margin: '0 0 0 10px',
    padding: '0',
    opacity: '0.7',
    transition: 'opacity .5s ease-in-out',
    '&:hover': {
      opacity: '1',
    },
  },
  iconButton: {
    textDecoration: 'none !important',
    '&:hover': {
      textDecoration: 'none !important',
    },
  },
});
const AdminSettingsPresentational = ({ id, isStaff, classes }) => {
  if (isStaff) {
    return (
      <Tooltip title="Admin Settings">
        <IconButton
          size="medium"
          target="_blank"
          className={classNames(classes.icon, classes.iconButton)}
          rel="noopener noreferrer"
          href={`${LEGACY_HOST}/admin/src/titleenv/${id}/change/`}
        >
          <Icon className={classes.icon}>settings</Icon>
        </IconButton>
      </Tooltip>
    );
  }
  return null;
};

AdminSettingsPresentational.propTypes = {
  id: PropTypes.number,
  isStaff: PropTypes.bool,
  classes: PropTypes.object,
};

AdminSettingsPresentational.defaultProps = {
  id: undefined,
  isStaff: false,
  classes: undefined,
};

export default withStyles(useStyles)(AdminSettingsPresentational);
