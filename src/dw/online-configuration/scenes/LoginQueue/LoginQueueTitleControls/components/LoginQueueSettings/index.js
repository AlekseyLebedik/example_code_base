import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

import styles from './index.module.css';
import LoginQueueSettingsSkeleton from './helpers/Skeleton';
import QueueSelector from './components/QueueSelector';
import QueueSettings from './components/QueueSettings';
import TitleSettings from './components/TitleSettings';

const LoginQueueLabel = ({ label }) => (
  <div className={styles.loginQueueLabel}>{label}</div>
);

LoginQueueLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

const LoginQueueSettings = props => {
  const {
    titleStatus,
    selectedQueue,
    setSelectedQueue,
    loading,
    editLoginQueueSettings,
    editLoginQueueTitleSettings,
    currentTitleId,
    queueSettingsError,
    titleSettingsError,
  } = props;

  const [submitting, setSubmitting] = useState(false);

  return (
    <div className={styles.loginQueueSettings}>
      {loading || !titleStatus || !titleStatus?.queues ? (
        <LoginQueueSettingsSkeleton />
      ) : (
        <>
          <QueueSelector
            queues={titleStatus?.queues}
            selectedQueue={selectedQueue}
            setSelectedQueue={setSelectedQueue}
          />
          <Divider className={styles.loginQueueDivider} />
          <LoginQueueLabel label={`QUEUE ${selectedQueue}`} />
          <QueueSettings
            queues={titleStatus?.queues}
            selectedQueue={selectedQueue}
            editLoginQueueSettings={editLoginQueueSettings}
            submitting={submitting}
            setSubmitting={setSubmitting}
            error={queueSettingsError}
          />
          <Divider className={styles.loginQueueDivider} />
          <LoginQueueLabel label={`ALL QUEUES FOR TITLE ${currentTitleId}`} />
          <TitleSettings
            targetOnlineUsers={titleStatus?.target_online_users}
            editLoginQueueTitleSettings={editLoginQueueTitleSettings}
            currentTitleId={currentTitleId}
            submitting={submitting}
            setSubmitting={setSubmitting}
            error={titleSettingsError}
          />
        </>
      )}
    </div>
  );
};

LoginQueueSettings.propTypes = {
  titleStatus: PropTypes.object.isRequired,
  selectedQueue: PropTypes.number.isRequired,
  setSelectedQueue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currentTitleId: PropTypes.number.isRequired,
  queueSettingsError: PropTypes.object,
  titleSettingsError: PropTypes.object,
  editLoginQueueSettings: PropTypes.func.isRequired,
  editLoginQueueTitleSettings: PropTypes.func.isRequired,
};

LoginQueueSettings.defaultProps = {
  queueSettingsError: undefined,
  titleSettingsError: undefined,
};

export default LoginQueueSettings;
