import React, { useState } from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import Grid from '@material-ui/core/Grid';
import styles from './index.module.css';

const getMessage = ({ isDeleted, isPrivate, isRepeat, isTemplate }) => {
  let message = 'an event';
  if (isDeleted) {
    message = 'a deleted event';
  } else if (isTemplate) {
    message = 'an event template';
  } else if (isPrivate) {
    message = 'a private event';
  } else if (isRepeat) {
    message = 'a repeating event';
  }
  return message;
};

const MessagePanel = ({ conditions, customMsg }) => {
  const [open, setOpen] = useState(true);

  return (
    <Paper
      classes={{
        root: conditions.isRepeat
          ? styles.messagePanelRepeat
          : styles.messagePanel,
      }}
      square
    >
      {(customMsg || some(conditions)) && (
        <Collapse in={open}>
          <div className={styles.messagePanelParent}>
            <Grid container justify="center" alignItems="center">
              <Grid container item justify="center" direction="row" xs>
                <Typography variant="button" color="inherit">
                  {customMsg || `You are viewing ${getMessage(conditions)}`}
                </Typography>
              </Grid>
              <Grid item>
                <Button color="inherit" onClick={() => setOpen(false)}>
                  Got it
                </Button>
              </Grid>
            </Grid>
          </div>
        </Collapse>
      )}
    </Paper>
  );
};

MessagePanel.propTypes = {
  conditions: PropTypes.object,
  customMsg: PropTypes.object,
};

MessagePanel.defaultProps = {
  customMsg: null,
  conditions: {},
};

export default MessagePanel;
