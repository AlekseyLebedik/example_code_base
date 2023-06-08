import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import './index.css';

const trackClick =
  (onClick, ...args) =>
  () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked on Show More Button',
      label: `Location: ${window.location.pathname}`,
    });

    onClick(...args);
  };

const NextPageButton = ({
  nextPageToken,
  onClick,
  isLoading,
  className,
  label,
}) =>
  nextPageToken &&
  (isLoading ? (
    <div className="NextPageButton__loading-container">
      <CircularProgress size={28} />
    </div>
  ) : (
    <Button
      variant="contained"
      className={className || 'NextPageButton'}
      fullWidth
      onClick={trackClick(onClick, nextPageToken)}
      disableRipple
    >
      {label}
    </Button>
  ));

NextPageButton.propTypes = {
  nextPageToken: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
};

NextPageButton.defaultProps = {
  nextPageToken: null,
  isLoading: false,
  label: 'Show More',
};

export default NextPageButton;
