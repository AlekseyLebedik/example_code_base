import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export const handleScrollToTop = event => {
  const anchor = (event?.target.ownerDocument || document).querySelector(
    '#back-to-top-anchor'
  );
  if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
export default function ScrollTop({ target }) {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <Fab
        className={classes.fab}
        color="primary"
        onClick={handleScrollToTop}
        size="small"
      >
        <Icon>keyboard_arrow_up</Icon>
      </Fab>
    </Zoom>
  );
}

ScrollTop.propTypes = { target: PropTypes.object };
ScrollTop.defaultProps = { target: undefined };
