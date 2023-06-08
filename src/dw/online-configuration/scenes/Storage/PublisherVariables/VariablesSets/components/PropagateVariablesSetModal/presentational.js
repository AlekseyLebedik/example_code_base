import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from '../PropagateVariablesSetForm';

const PropagateVariablesSetModalStateless = props => {
  const {
    visible,
    submitting,
    onCancel,
    onRemoteSubmit,
    onSubmit,
    selectedListItemDetails,
    isAllowed,
    setAllowed,
  } = props;
  const { namespace } = selectedListItemDetails;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button
      key="primary"
      color="primary"
      focusRipple
      onClick={onRemoteSubmit}
      disabled={!isAllowed}
    >
      {submitting ? 'Propagating...' : 'Propagate Pub Vars'}
    </Button>,
  ];

  return (
    <Dialog
      title={`Propagate NameSpace ${namespace}`}
      actions={footerButtons}
      modal
      open={visible}
      onRequestClose={onCancel}
      contentStyle={{ width: '550px' }}
    >
      <Form
        initialValues={{ ...selectedListItemDetails }}
        externalSubmit={onSubmit}
        isAllowed={isAllowed}
        setAllowed={setAllowed}
      />
    </Dialog>
  );
};
PropagateVariablesSetModalStateless.propTypes = {
  visible: PropTypes.bool,
  submitting: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedListItemDetails: PropTypes.object.isRequired,
  isAllowed: PropTypes.bool.isRequired,
  setAllowed: PropTypes.func.isRequired,
};
PropagateVariablesSetModalStateless.defaultProps = {
  visible: false,
  submitting: false,
};

export default PropagateVariablesSetModalStateless;
