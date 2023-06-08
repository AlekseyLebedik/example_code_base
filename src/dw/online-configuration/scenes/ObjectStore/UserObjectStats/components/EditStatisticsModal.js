import React from 'react';
import PropTypes from 'prop-types';
import ModalForm from 'dw/core/components/ModalForm';
import StatisticsForm from './StatisticsForm';
import { EditStatisticsButton } from './Buttons';
import { FORM_NAME } from '../constants';

function EditStatisticsModal(props) {
  return (
    <ModalForm
      {...props}
      FormComponent={StatisticsForm}
      form={`${FORM_NAME}_${props.data.metadata.objectID}`}
      formName={`${FORM_NAME}_${props.data.metadata.objectID}`}
      title="Modify Report Statistics Value"
      submitText="Modify"
      maxWidth="md"
      pristine={false}
      OpenModalComponent={EditStatisticsButton}
    />
  );
}

EditStatisticsModal.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EditStatisticsModal;
