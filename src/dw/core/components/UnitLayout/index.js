import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import './index.css';
import styles from './index.module.css';

const useStyles = makeStyles(() => ({
  unitLayout: {
    paddingTop: '0px !important',
    height: '100% !important',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function UnitLayout({
  NavbarComponent,
  children,
  className,
  navBarProps,
  classes,
}) {
  const componentClasses = useStyles();
  return (
    <>
      {NavbarComponent && <NavbarComponent {...navBarProps} />}
      <main
        className={classNames(
          componentClasses.unitLayout,
          classes.unitLayout,
          styles.printable,
          className
        )}
      >
        {children}
      </main>
    </>
  );
}

UnitLayout.propTypes = {
  NavbarComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
  ]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  navBarProps: PropTypes.object,
  classes: PropTypes.object,
};

UnitLayout.defaultProps = {
  NavbarComponent: null,
  className: null,
  navBarProps: {},
  classes: {},
};

export default UnitLayout;
