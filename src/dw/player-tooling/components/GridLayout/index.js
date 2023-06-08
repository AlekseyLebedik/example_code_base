import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    alignItems: 'flex-start',
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: 'repeat(4, 1fr)',
    width: '100%',
  },
  gridCol: {
    display: 'grid',
    gridGap: 'inherit',
    gridTemplateRows: 'auto',
  },
  gridItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.035)',
    borderRadius: 0,
    padding: '7px 5px 0 5px',
    maxHeight: '600px',
  },
}));

const accountsStyles = makeStyles(theme => ({
  [theme.breakpoints.down(1423)]: {
    gridContainer: { gridTemplateColumns: 'repeat(3, 1fr)' },
  },
  [theme.breakpoints.down('md')]: {
    gridContainer: { gridTemplateColumns: 'repeat(2, 1fr)' },
  },
  [theme.breakpoints.down(900)]: {
    gridContainer: { gridTemplateColumns: '1fr' },
  },
}));

const gameDataStyles = makeStyles(theme => ({
  [theme.breakpoints.down(1723)]: {
    gridContainer: { gridTemplateColumns: 'repeat(3, 1fr)' },
  },
  [theme.breakpoints.down(1520)]: {
    gridContainer: { gridTemplateColumns: 'repeat(2, 1fr)' },
  },
  [theme.breakpoints.down(1085)]: {
    gridContainer: { gridTemplateColumns: '1fr' },
  },
}));

export function GridItem({ children, className, variant }) {
  const classes = useStyles();
  const variantClasses =
    variant === 'accounts' ? accountsStyles() : gameDataStyles();
  return (
    <div className={cn(classes.gridItem, variantClasses.gridItem, className)}>
      {children}
    </div>
  );
}
GridItem.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['accounts', 'gameData']),
};
GridItem.defaultProps = {
  className: '',
  variant: 'gameData',
};

export function GridCol({ children, className, variant }) {
  const classes = useStyles();
  const variantClasses =
    variant === 'accounts' ? accountsStyles() : gameDataStyles();
  return (
    <div className={cn(classes.gridCol, variantClasses.gridCol, className)}>
      {children}
    </div>
  );
}
GridCol.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['accounts', 'gameData']),
};
GridCol.defaultProps = {
  className: '',
  variant: 'gameData',
};

export function GridLayout({ children, className, variant }) {
  const classes = useStyles();
  const variantClasses =
    variant === 'accounts' ? accountsStyles() : gameDataStyles();
  return (
    <div
      className={cn(
        classes.gridContainer,
        variantClasses.gridContainer,
        className
      )}
    >
      {children}
    </div>
  );
}
GridLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['accounts', 'gameData']),
};
GridLayout.defaultProps = {
  className: '',
  variant: 'gameData',
};
