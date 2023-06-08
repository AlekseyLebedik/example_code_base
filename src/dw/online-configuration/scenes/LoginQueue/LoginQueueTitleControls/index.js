import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';

import LoginQueueSettings from './components/LoginQueueSettings';
import LoginQueueVIPList from './components/LoginQueueVIPList';

import {
  loginQueueTitleStatusSelector,
  loginQueueTitleStatusLoadingSelector,
  loginQueueSettingsErrorSelector,
  loginQueueTitleSettingsErrorSelector,
} from '../selectors';

import * as Actions from '../actions';

import styles from './index.module.css';

export const LoginQueueTitleOverview = props => {
  const {
    fetchLoginQueueStatus,
    titleStatus,
    loadingStatus,
    editLoginQueueSettings,
    editLoginQueueTitleSettings,
    currentTitleId,
    queueSettingsError,
    titleSettingsError,
  } = props;
  const [selectedQueue, setSelectedQueue] = useState(0);

  useEffect(() => {
    fetchLoginQueueStatus();
  }, [fetchLoginQueueStatus]);

  return (
    <div className={styles.flexContainer}>
      <LoginQueueSettings
        titleStatus={titleStatus}
        selectedQueue={selectedQueue}
        setSelectedQueue={setSelectedQueue}
        loading={loadingStatus}
        editLoginQueueSettings={editLoginQueueSettings}
        editLoginQueueTitleSettings={editLoginQueueTitleSettings}
        currentTitleId={currentTitleId}
        queueSettingsError={queueSettingsError}
        titleSettingsError={titleSettingsError}
      />
      <LoginQueueVIPList selectedQueue={selectedQueue} />
    </div>
  );
};

const mapStateToProps = state => ({
  titleStatus: loginQueueTitleStatusSelector(state),
  loadingStatus: loginQueueTitleStatusLoadingSelector(state),
  currentTitleId: state.Components?.TitleSelector?.currentTitle?.id,
  queueSettingsError: loginQueueSettingsErrorSelector(state),
  titleSettingsError: loginQueueTitleSettingsErrorSelector(state),
});

LoginQueueTitleOverview.propTypes = {
  titleStatus: PropTypes.object.isRequired,
  fetchLoginQueueStatus: PropTypes.func.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  currentTitleId: PropTypes.number.isRequired,
  queueSettingsError: PropTypes.object,
  titleSettingsError: PropTypes.object,
  editLoginQueueSettings: PropTypes.func.isRequired,
  editLoginQueueTitleSettings: PropTypes.func.isRequired,
};

LoginQueueTitleOverview.defaultProps = {
  queueSettingsError: undefined,
  titleSettingsError: undefined,
};

const mapDispatchToProps = dispatch => ({
  fetchLoginQueueStatus: bindActionCreators(
    Actions.fetchLoginQueueStatus,
    dispatch
  ),
  editLoginQueueSettings: bindActionCreators(
    Actions.editQueueSettings,
    dispatch
  ),
  editLoginQueueTitleSettings: bindActionCreators(
    Actions.editTitleSettings,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginQueueTitleOverview);
