import React, { Component } from 'react';
import Upload from 'dw/core/components/FormFields/Upload';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { hasData } from 'dw/core/helpers/object';
import styles from './index.module.css';

import {
  cohortUsersListFormSelector,
  getTestSelector,
  selectedContextFormSelector,
} from '../../selectors';
import * as actions from '../../actions';

import { UPLOAD_FILE_HELP } from './constants';

const stateToProps = (state, props) => ({
  cohortUsersList: cohortUsersListFormSelector(state, props),
  selectedContext: selectedContextFormSelector(state),
  test: getTestSelector(state),
});

const dispatchToProps = dispatch => ({
  fetchCohortUsers: (context, testID, cohortID) =>
    dispatch(actions.fetchCohortUsers(context, testID, cohortID)),
  deleteCohortUsers: (context, testID, cohortID) =>
    dispatch(actions.deleteCohortUsers(context, testID, cohortID)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  fetchCohortUsers: cohortID =>
    dispatchProps.fetchCohortUsers(
      stateProps.selectedContext,
      stateProps.test.testID || stateProps.test.removedTestID,
      cohortID
    ),
  deleteCohortUsers: cohortID =>
    dispatchProps.deleteCohortUsers(
      stateProps.selectedContext,
      stateProps.test.testID || stateProps.test.removedTestID,
      cohortID
    ),
});

const UsersFile = ({ cohort, cohortID, deleteCohortUsers, disabled }) => (
  <>
    <UploadButton cohort={cohort} disabled />
    <div className={styles.file}>
      <Icon className={styles.attachedFileIcon}>attach_file</Icon>users.csv
      {!disabled ? (
        <ConfirmActionComponent
          tooltip="Delete File"
          className={styles.deleteButton}
          confirm={{
            title: 'Confirm Delete',
            confirmMsg: (
              <div>
                Are you sure you want to delete this file? <br />
                <br />
                You will not be able to undo this operation.
              </div>
            ),
            mainButtonLabel: 'Delete',
            destructive: true,
          }}
          component="IconButton"
          onClick={() => deleteCohortUsers(cohortID)}
          iconClassName={styles.deleteIcon}
        >
          highlight_off
        </ConfirmActionComponent>
      ) : null}
    </div>
  </>
);

UsersFile.propTypes = {
  cohort: PropTypes.object.isRequired,
  cohortID: PropTypes.string.isRequired,
  deleteCohortUsers: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const UploadButton = ({ cohort, disabled }) => (
  <div className={styles.uploadButton}>
    <Upload
      {...cohort.fileData}
      type="text"
      buttonProps={{
        ...(!disabled ? { color: 'primary' } : {}),
        size: 'small',
      }}
      iconProps={{ fontSize: 'small' }}
      disabled={disabled}
    />
    <Tooltip title={UPLOAD_FILE_HELP}>
      <Icon className={styles.helpIcon}>help_outline</Icon>
    </Tooltip>
  </div>
);

UploadButton.propTypes = {
  cohort: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

class CohortUsersFileComponent extends Component {
  state = {
    // eslint-disable-next-line
    fetchCohortUsers: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.selectedContext && state.fetchCohortUsers && props.cohortID) {
      props.fetchCohortUsers(props.cohortID);
      return { fetchCohortUsers: false };
    }

    return null;
  }

  render() {
    const { cohortUsersList } = this.props;
    return !hasData(cohortUsersList) ? (
      <UploadButton {...this.props} />
    ) : (
      <UsersFile {...this.props} />
    );
  }
}

CohortUsersFileComponent.propTypes = {
  cohortID: PropTypes.string.isRequired,
  cohortUsersList: PropTypes.arrayOf(PropTypes.object),
  fetchCohortUsers: PropTypes.func.isRequired,
  selectedContext: PropTypes.string,
};

CohortUsersFileComponent.defaultProps = {
  cohortUsersList: undefined,
  selectedContext: undefined,
};

export default connect(
  stateToProps,
  dispatchToProps,
  mergeProps
)(CohortUsersFileComponent);
