import React from 'react';
import PropTypes from 'prop-types';
import ReactIframe from 'react-iframe';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '350px',
    '& iframe': {
      border: 'none',
    },
  },
}));

const Iframe = ({ url, id }) => {
  const classes = useStyles();

  if (!url) return null;

  return (
    <div className={classes.root}>
      <ReactIframe
        id={id}
        url={url}
        width="100%"
        height="100%"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

Iframe.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Iframe;
