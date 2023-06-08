import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

import styles from '../MegaMenu/index.module.css';
import FeedbackDialog from './components/FeedbackDialog';
import { useSelector } from '../../../AppStore';

const useStyles = theme => ({
  megaMenuButton: {
    color: theme.palette.inherit.main,
    backgroundColor: theme.navigationBar.backgroundColor,
  },
});

const Feedback = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const disabled = useSelector(
    state => get(state, 'user.profile.id') === undefined
  );
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Suggest feature/Report a bug">
        <span>
          <button
            type="button"
            className={classNames(
              styles.megaMenuButton,
              classes.megaMenuButton
            )}
            onClick={handleOpen}
            disabled={disabled}
          >
            <Icon>chat</Icon>
          </button>
        </span>
      </Tooltip>
      {open && <FeedbackDialog open handleClose={handleClose} />}
    </>
  );
};

Feedback.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Feedback);
