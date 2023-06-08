import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import { connect } from '../../../../../AppStore';
import { hasData } from '../../../../../helpers/object';
import { SectionTitleContext } from '../../../SectionTitleWrapper';
import { profileSelector } from '../../../../../modules/user/selectors';
import { GROUPING_MAPPING, FEEDBACK_URL } from './constants';
import styles from './index.module.css';

const dialogStyles = theme => ({
  dialogPaper: {
    minHeight: '700px',
    minWidth: '900px',
    maxWidth: '900px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  dialogContent: {
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: 'rgb(246, 246, 246)',
  },
});

const stateToProps = state => ({
  profile: profileSelector(state),
});

const FeedbackDialog = ({ classes, open, handleClose, profile }) => {
  const { email } = profile;
  const { section } = useContext(SectionTitleContext);
  const [loading, setLoading] = useState(true);
  let feedbackUrl = FEEDBACK_URL.replace('<email>', email);
  if (hasData(section)) {
    const { parent } = section;
    const { title } = parent || section;
    feedbackUrl = feedbackUrl.replace(
      '<grouping>',
      title in GROUPING_MAPPING ? GROUPING_MAPPING[title] : title
    );
  }
  const showLoading = () => {
    setLoading(true);
  };
  const hideLoading = () => {
    setLoading(false);
  };
  const onClose = () => {
    handleClose();
    showLoading();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogContent className={classes.dialogContent}>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
        {loading ? (
          <div className={styles.loadingContainer}>
            <CircularProgress size={80} thickness={5} />
          </div>
        ) : null}
        <iframe
          src={feedbackUrl}
          className={styles.feedbackFrame}
          onLoad={hideLoading}
          title="Devzone Feedback"
        />
      </DialogContent>
    </Dialog>
  );
};

FeedbackDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  profile: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const FeedbackDialogConnected = connect(stateToProps)(FeedbackDialog);
export default withStyles(dialogStyles)(FeedbackDialogConnected);
