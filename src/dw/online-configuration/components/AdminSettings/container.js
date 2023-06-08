import React from 'react';
import { isStaffSelector } from '@demonware/devzone-core/modules/user/selectors';
import { connect } from 'dw/core/helpers/component';
import { getTitleEnvId } from './selectors';

import AdminSettingsPresentational from './presentational';

const AdminSettings = props => <AdminSettingsPresentational {...props} />;

const stateToProps = state => ({
  id: getTitleEnvId(state),
  isStaff: isStaffSelector(state),
});
export default connect(stateToProps, null, AdminSettings);
