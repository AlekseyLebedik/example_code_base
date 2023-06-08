import React from 'react';
import UpdateForm from 'abtesting/scenes/Update';
import { FORM_MODE_ENUM } from 'abtesting/scenes/ABTestForm/constants';

const PropagateForm = () => (
  <UpdateForm
    mode={FORM_MODE_ENUM.PROPAGATE}
    disableFormContext={false}
    viewOnly
  />
);

export default PropagateForm;
