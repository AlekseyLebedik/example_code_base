import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import hash from 'object-hash';

import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles(theme => ({
  errorIcon: {
    marginLeft: '8px',
  },
  graphQLErrorContainer: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '24px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  graphQLError: {
    color: theme.palette.error.main,
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  graphQLErrorItemsContainer: {
    paddingLeft: '5px',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: '#ffffff',
    maxWidth: '600px',
    padding: theme.spacing(1),
  },
}));

const renderErrorHeading = error => {
  if (error.networkError)
    return `Network Error (${get(error, 'networkError.statusCode')})`;
  if (error.graphQLErrors) return 'Query Error';
  return 'Internal Error';
};

const renderErrorMessage = error => {
  if (get(error, 'networkError')) {
    return (
      <>
        <div>{get(error, 'networkError.result.error.name')}</div>
        <div>{get(error, 'networkError.result.error.msg')}</div>
      </>
    );
  }
  if (get(error, 'graphQLErrors'))
    return (
      <>
        {error.graphQLErrors.map(({ message, path }) => (
          <>
            <div>{`Path: ${path?.join('.')}`}</div>
            <p>{message}</p>
          </>
        ))}
      </>
    );
  if (Array.isArray(error))
    return (
      <>
        {error.map(({ message }) => (
          <p>{message}</p>
        ))}
      </>
    );
  return error.message;
};

const ErrorMessageDisplay = ({ error }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.graphQLErrorContainer}>
      {renderErrorHeading(error)}
      <Icon
        aria-haspopup="true"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        className={classes.errorIcon}
        color="secondary"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        error
      </Icon>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div>{renderErrorMessage(error)}</div>
      </Popover>
    </div>
  );
};

ErrorMessageDisplay.propTypes = {
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export const GraphQLErrorsDisplay = props => {
  const { error } = props;
  const classes = useStyles();
  return (
    <div className={classes.graphQLError}>
      There was an error retrieving data:
      <div className={classes.graphQLErrorItemsContainer}>
        {error.graphQLErrors.map(({ message, path }) => (
          <div key={hash(message)}>
            {message}. Path: {path.join(', ')}
          </div>
        ))}
      </div>
    </div>
  );
};
GraphQLErrorsDisplay.propTypes = {
  error: PropTypes.object.isRequired,
};

export default ErrorMessageDisplay;
