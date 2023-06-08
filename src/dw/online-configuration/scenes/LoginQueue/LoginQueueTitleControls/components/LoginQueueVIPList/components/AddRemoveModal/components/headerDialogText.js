import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import DeleteButton from './deleteButton';
import BulkUpload from './bulkUpload';

const HeaderDialogText = ({
  actionMode,
  onDeleteAll,
  isUploadBulk,
  onToggle,
  toolTipClass,
}) => (
  <div className={styles.loginQueueDialogHeadHolder}>
    <div className={styles.loginQueueDialogText}>
      <span className={styles.loginQueueDialogTextHead}> GamerTags </span>
      <span className={styles.loginQueueDialogTextSub}>
        {' '}
        Please ensure you enter the correct Gamertag as there is no validation
        currently{' '}
      </span>
    </div>
    <div className={styles.loginQueueDialogHeaderButtons}>
      <BulkUpload
        actionMode={actionMode}
        onToggle={onToggle}
        isUploadBulk={isUploadBulk}
        toolTipClass={toolTipClass}
      />
      <DeleteButton
        onClick={onDeleteAll}
        title="Delete All"
        toolTipClass={toolTipClass}
      />
    </div>
  </div>
);

HeaderDialogText.propTypes = {
  actionMode: PropTypes.string.isRequired,
  onDeleteAll: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  isUploadBulk: PropTypes.bool.isRequired,
  toolTipClass: PropTypes.string,
};

HeaderDialogText.defaultProps = {
  toolTipClass: '',
};

export default HeaderDialogText;
