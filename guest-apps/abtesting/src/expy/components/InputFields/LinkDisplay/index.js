import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { useStyles } from './styles';

const LinkDisplay = ({ id, url, title, onDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <a className={classes.title} href={url} rel="noreferrer" target="_blank">
        {title}
      </a>
      <IconButton
        className={classes.button}
        onClick={() => onDelete({ id })}
        aria-label="delete"
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

LinkDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LinkDisplay;
