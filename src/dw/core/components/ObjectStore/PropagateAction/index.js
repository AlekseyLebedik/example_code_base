import React from 'react';
import PropTypes from 'prop-types';

import ModalForm from 'dw/core/components/ModalForm';
import { OpenModalButton } from 'dw/core/components/ModalForm/components';
import PropagateObjectsForm from './components/PropagateObjectsForm';

import { FORM_NAME as PROPAGATE_OBJECTS_FORM_NAME } from './components/PropagateObjectsForm/constants';

const PropagateButton = ({ disabled, ...props }) => (
  <OpenModalButton
    title="Propagate Publisher Objects"
    icon="call_split"
    iconButtonProps={{ color: 'inherit', disabled }}
    {...props}
  />
);

PropagateButton.propTypes = {
  disabled: PropTypes.bool,
};

PropagateButton.defaultProps = {
  disabled: undefined,
};

function PropagateAction({
  onPropagateAction,
  selectedRows,
  onPropagateSubmitSuccess,
}) {
  const objects = selectedRows.map(
    ({
      groupID,
      owner,
      expiresOn,
      checksum,
      acl,
      category,
      name: fileName,
      contentLength,
    }) => ({
      groupID,
      owner,
      expiresOn,
      checksum,
      acl,
      category,
      fileName,
      contentLength,
    })
  );
  return (
    <ModalForm
      formName={PROPAGATE_OBJECTS_FORM_NAME}
      FormComponent={PropagateObjectsForm}
      OpenModalComponent={PropagateButton}
      openModalComponentProps={{ disabled: selectedRows.length === 0 }}
      title={`Propagate ${selectedRows.length} Objects`}
      submittingText="Propagating..."
      submitText="Propagate Objects"
      externalSubmit={onPropagateAction}
      initialValues={{ objects }}
      onPropagateSubmitSuccess={onPropagateSubmitSuccess}
      dialogContentStyle={{ width: '550px' }}
    />
  );
}

PropagateAction.propTypes = {
  onPropagateAction: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  onPropagateSubmitSuccess: PropTypes.func.isRequired,
};

PropagateAction.defaultProps = {
  onPropagateAction: () => {},
  selectedRows: [],
};

export default PropagateAction;
