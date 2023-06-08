import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { ReactComponent as CSVIcon } from 'dw/core/components/IconsSvg/noun_CSV_631188.svg';
import FeatureSwitchesCheck, {
  featureSwitches as fn,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import ModalForm from 'dw/core/components/ModalForm';
import ReplaceUsersForm from '../../ReplaceUsersForm';

import { REPLACE_USERS_FORM_NAME } from '../../../constants';

const OpenModalButtonUpload = ({ onClick }) => (
  <Tooltip title="Upload CSV" placement="bottom">
    <IconButton onClick={onClick}>
      <CSVIcon style={{ fill: 'black' }} />
    </IconButton>
  </Tooltip>
);

OpenModalButtonUpload.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const ReplaceUsersGroup = props => {
  const { onSubmitReplaceUsers } = props;
  return (
    <FeatureSwitchesCheck
      featureSwitches={[fn.GROUPS_UPLOAD_PLAYERS]}
      isStaffAllowed={false}
    >
      <ModalForm
        formName={REPLACE_USERS_FORM_NAME}
        FormComponent={ReplaceUsersForm}
        onFormSubmit={onSubmitReplaceUsers}
        OpenModalComponent={OpenModalButtonUpload}
        title="Replace Users"
        submittingText="Replacing..."
        submitText="Replace Users"
        fullWidth
        maxWidth="md"
      />
    </FeatureSwitchesCheck>
  );
};

ReplaceUsersGroup.propTypes = {
  onSubmitReplaceUsers: PropTypes.func.isRequired,
};
