import React from 'react';
import UpdateForm from 'abtesting/scenes/Update';
import { FORM_MODE_ENUM } from '../ABTestForm/constants';

const CloneForm = () => (
  <UpdateForm mode={FORM_MODE_ENUM.CLONE} disableFormContext={false} />
);

export default CloneForm;
