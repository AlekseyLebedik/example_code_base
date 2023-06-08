import React from 'react';
import UpdateForm from 'abtesting/scenes/Update';
import { FORM_MODE_ENUM } from '../ABTestForm/constants';

const ViewForm = () => (
  <UpdateForm
    mode={FORM_MODE_ENUM.VIEW}
    disableFormContext
    showActionsPanel
    viewOnly
  />
);

export default ViewForm;
