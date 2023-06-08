import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import styles from './index.module.css';

const useStyles = () => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
});

const PanelContainer = ({ header, Component, classes, ...props }) => (
  <div className={styles.container}>
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Typography variant="h5">{header}</Typography>
        <Component {...props} />
      </CardContent>
    </Card>
  </div>
);

PanelContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  Component: PropTypes.elementType.isRequired,
  header: PropTypes.string,
};

PanelContainer.defaultProps = {
  header: '',
};

export default withStyles(useStyles)(PanelContainer);
