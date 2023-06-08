import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import CreatableSelect from 'react-select/creatable';

import AddIPControlForm from '../AddIPControlForm';
import './presentational.css';

const AddIPControlModal = props => {
  const {
    visible,
    submitting,
    onCancel,
    onSubmit,
    group,
    ipGroupsOptions,
    showGroupSelectInModal,
    isLoading,
    handleGroupChange,
  } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel} disabled={submitting}>
      Cancel
    </Button>,
    <Button
      key="primary"
      color="primary"
      focusRipple
      onClick={onSubmit}
      disabled={submitting}
    >
      {submitting ? 'Saving...' : 'Save'}
    </Button>,
  ];
  return (
    <Dialog
      className="common-modal-dialog ip-control"
      title={
        showGroupSelectInModal
          ? 'Create Group and/or add Anticheat Whitelist'
          : 'Add Anticheat Whitelist'
      }
      actions={footerButtons}
      modal
      open={visible}
      onRequestClose={onCancel}
      classes={{
        paperWidthSm: 'ipWhiteListModalMaxWidth',
      }}
    >
      {showGroupSelectInModal && (
        <CreatableSelect
          isClearable
          key={ipGroupsOptions.length}
          placeholder="Select/create Group"
          onChange={handleGroupChange}
          options={ipGroupsOptions}
          isLoading={isLoading}
          value={group}
        />
      )}
      <AddIPControlForm {...props} externalSubmit={onSubmit} />
    </Dialog>
  );
};

AddIPControlModal.propTypes = {
  group: PropTypes.number,
  visible: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ipGroupsOptions: PropTypes.array,
  handleGroupChange: PropTypes.func,
  showGroupSelectInModal: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};
AddIPControlModal.defaultProps = {
  group: 0,
  ipGroupsOptions: [],
  handleGroupChange: undefined,
  isLoading: false,
};

export default AddIPControlModal;
