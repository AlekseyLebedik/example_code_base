import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Svg from '../../Svg';
import ErrorIcon from '../../../icons/ErrorIcon';

const useStyles = makeStyles(theme => ({
  root: {
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    textAlign: 'center',
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginBottom: theme.spacing(3),
  },
}));

const ErrorWarning = ({ heading, description }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.container}>
        <Svg
          className={classes.icon}
          icon={<ErrorIcon />}
          size="illustration"
        />
        <Typography className={classes.heading} variant="h5" component="h3">
          {heading}
        </Typography>
        <p>{description}</p>
      </div>
    </Container>
  );
};

ErrorWarning.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ErrorWarning.defaultProps = {
  description: '',
};

export default ErrorWarning;
