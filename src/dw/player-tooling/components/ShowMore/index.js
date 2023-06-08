import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  showMore: {
    fontSize: '.70rem',
    color: theme.palette.primary.main,
    padding: '5px 0 0 0',
    justifyContent: 'flex-start',
    textTransform: 'uppercase',
  },
}));

const ShowMore = ({ expanded, handleClick, lessMsg, moreMsg }) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        color="primary"
        className={classes.showMore}
        onClick={() => handleClick(!expanded)}
      >
        {expanded ? lessMsg : moreMsg}
      </Button>
    </div>
  );
};

ShowMore.propTypes = {
  expanded: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  lessMsg: PropTypes.string,
  moreMsg: PropTypes.string,
};

ShowMore.defaultProps = {
  lessMsg: 'Show Fewer',
  moreMsg: 'Show More',
};

export default ShowMore;
