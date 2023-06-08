import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import AddFileForm from './AddFileForm';

const UploadFileModal = props => {
  const {
    visible,
    submitting,
    onCancel,
    onRemoteSubmit,
    onSubmit,
    groups,
    categories,
    selectedGroup,
  } = props;

  const footerButtons = [
    <Button key="cancel" disabled={submitting} onClick={onCancel}>
      Cancel
    </Button>,
    <Button
      key="upload"
      disabled={submitting}
      color="primary"
      focusRipple
      onClick={onRemoteSubmit}
    >
      {submitting ? 'Uploading...' : 'Upload'}
    </Button>,
  ];

  return (
    <div className="publisher-objects__upload-file-modal">
      <Dialog
        title="Upload File"
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '500px' }}
      >
        <AddFileForm
          externalSubmit={onSubmit}
          groups={groups}
          categories={categories}
          selectedGroup={selectedGroup}
        />
      </Dialog>
    </div>
  );
};

UploadFileModal.propTypes = {
  visible: PropTypes.bool,
  submitting: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.string),
  selectedGroup: PropTypes.object,
};

UploadFileModal.defaultProps = {
  visible: false,
  submitting: false,
  groups: [],
  categories: [],
  selectedGroup: undefined,
};

export default UploadFileModal;
