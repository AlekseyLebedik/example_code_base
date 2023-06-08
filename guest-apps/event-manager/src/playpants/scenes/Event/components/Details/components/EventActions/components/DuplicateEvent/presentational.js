import React from 'react';
import PropTypes from 'prop-types';

import { OpenModalButton } from 'dw/core/components/ModalForm/components';
import ModalForm from 'dw/core/components/ModalForm';
import DuplicateEventForm from 'playpants/components/DuplicateEventForm';

import {
  DUPLICATE_EVENT_FORM_NAME,
  DUPLICATE_EVENT_FORM_TITLE,
} from 'playpants/components/DuplicateEventForm/constants';

export const DuplicateEventStateless = props => {
  const { handleFormSubmit } = props;
  return (
    <ModalForm
      {...props}
      FormComponent={DuplicateEventForm}
      formName={DUPLICATE_EVENT_FORM_NAME}
      onFormSubmit={handleFormSubmit}
      OpenModalComponent={componentProps => (
        <OpenModalButton
          title="Duplicate/Promote Event"
          icon="file_copy"
          {...componentProps}
        />
      )}
      submitText="Duplicate"
      submittingText="Duplicating..."
      title={DUPLICATE_EVENT_FORM_TITLE}
      pristine={false}
      cancelOnBackdropClick
    />
  );
};

DuplicateEventStateless.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};

export default DuplicateEventStateless;
