import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '.75rem',
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: '68px',
  },
}));

export default function OpenAll({ className, expandAll, onClick }) {
  const classes = useStyles();
  const handleClick = e => {
    e.stopPropagation();
    onClick(!expandAll);
  };
  return (
    <Button
      color="primary"
      className={cn(classes.root, className)}
      onClick={handleClick}
    >
      {`${!expandAll ? 'Open All' : 'Close All'}`}
    </Button>
  );
}

OpenAll.propTypes = {
  className: PropTypes.string,
  expandAll: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
OpenAll.defaultProps = { className: undefined };
