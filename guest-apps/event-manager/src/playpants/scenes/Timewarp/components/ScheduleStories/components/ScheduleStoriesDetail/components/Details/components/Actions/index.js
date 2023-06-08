import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import { joinPath } from 'dw/core/helpers/path';
import { getBaseURL } from 'playpants/components/App/selectors';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import IconButton from 'dw/core/components/IconButton';
import styles from './index.module.css';
import * as actions from './actions';

const DeleteScheduleStoryComponent = ({ eventCount, isSafe, onClick }) =>
  isSafe.toDelete ? (
    <ConfirmActionComponent
      className={styles.secondaryButton}
      component="IconButton"
      confirm={{
        title: 'Confirm Story Deletion',
        confirmMsg: `You are about to destroy this story and all the existing events (${eventCount}) on this story. Do you want to continue?`,
        mainButtonLabel: 'Delete',
        destructive: true,
      }}
      onClick={onClick}
      tooltip="Delete Story"
      cancelOnBackdropClick
    >
      delete_forever
    </ConfirmActionComponent>
  ) : (
    <IconButton tooltip={isSafe.unsafeReason} icon="delete_forever" disabled />
  );

DeleteScheduleStoryComponent.propTypes = {
  eventCount: PropTypes.number.isRequired,
  isSafe: PropTypes.shape({
    toDelete: PropTypes.bool,
    unsafeReason: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export const ActionsBase = ({
  eventCount,
  onDeleteThenRedirect,
  storyId,
  isSafe,
}) => (
  <div className={styles.actionPanel}>
    <Grid container justify="flex-end" spacing={0} className={styles.grid}>
      <Grid item>
        <DeleteScheduleStoryComponent
          styles={styles}
          onClick={() => onDeleteThenRedirect(storyId)}
          isSafe={isSafe}
          eventCount={eventCount}
        />
      </Grid>
    </Grid>
  </div>
);

ActionsBase.propTypes = {
  isSafe: PropTypes.shape({ toDelete: PropTypes.bool }).isRequired,
  eventCount: PropTypes.number.isRequired,
  onDeleteThenRedirect: PropTypes.func.isRequired,
  storyId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  baseUrl: getBaseURL(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteThenRedirect: bindActionCreators(
    actions.deleteThenRedirect,
    dispatch
  ),
});

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onDeleteThenRedirect: storyId =>
    propsFromDispatch.onDeleteThenRedirect(storyId, () =>
      ownProps.history.push(
        joinPath(propsFromState.baseUrl, 'timewarp', 'schedules')
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ActionsBase);
