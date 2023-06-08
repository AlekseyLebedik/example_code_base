import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from '../UploadStoreForm';

const UploadFileModal = props => {
  const {
    visible,
    loading,
    onCancel: onExternalCancel,
    onRemoteSubmit,
    onSubmit: onExternalSubmit,
  } = props;

  const cancelToken = axios.CancelToken.source();

  const onCancel = useCallback(
    (...args) => {
      cancelToken.cancel('Store upload canceled by user');
      onExternalCancel(...args);
    },
    [onExternalCancel, cancelToken]
  );

  const onSubmit = useCallback(
    (values, params = {}) =>
      onExternalSubmit(values, { ...params, cancelToken: cancelToken.token }),
    [onExternalSubmit, cancelToken]
  );

  const footerButtons = [
    <Button key="cancel" onClick={onCancel} disabled={loading}>
      Cancel
    </Button>,
    <Button
      key="primary"
      color="primary"
      focusRipple
      onClick={onRemoteSubmit}
      disabled={loading}
    >
      {loading ? 'Uploading...' : 'Upload Store'}
    </Button>,
  ];

  return (
    <div className="stores-details__tabs__user-files__upload-file-modal">
      <Dialog
        title="Upload Store"
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '350px' }}
      >
        <Form onSubmit={onSubmit} cancelToken={cancelToken.token} />
      </Dialog>
    </div>
  );
};
UploadFileModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UploadFileModal;
