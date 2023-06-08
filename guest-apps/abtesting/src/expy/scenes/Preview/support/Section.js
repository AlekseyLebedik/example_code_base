import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  section: {
    borderTop: '1px solid #E6E6E6',
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  titleContainer: {
    marginBottom: '0.5rem',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    overflowWrap: 'break-word',
  },
}));

const Section = ({ title, description, children }) => {
  const classes = useStyles();

  if (!description && !children) return null;

  return (
    <div className={classes.section}>
      <div className={classes.titleContainer}>
        <Typography className={classes.title} component="p">
          {title}
        </Typography>
      </div>
      <div className={classes.description}>
        {description ? <p>{description}</p> : children}
      </div>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

Section.defaultProps = {
  title: '',
  description: '',
  children: undefined,
};

export default Section;
