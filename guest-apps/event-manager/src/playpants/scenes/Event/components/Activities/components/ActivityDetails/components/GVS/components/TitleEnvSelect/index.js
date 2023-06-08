import React from 'react';
import PropTypes from 'prop-types';

import { GVS_PUBLISH_CONFIGURATION } from '@demonware/devzone-core/access/PermissionCheck/permissions';

import Select from 'dw/core/components/FormFields/Select';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';

import TitleEnvSelect from 'dw/core/components/TitleEnvSelect';

const requiredPermission = GVS_PUBLISH_CONFIGURATION;

export const GVSTitleEnvSelect = ({
  currentProject,
  onChange,
  titleEnvId,
  ...props
}) => {
  return (
    <TitleEnvSelect
      {...props}
      label="Title"
      InputLabelProps={{ shrink: true }}
      input={{
        value: titleEnvId || '',
        onChange(e) {
          onChange(e.target.value);
        },
      }}
      valueSelector={e => e.environment.id}
      serviceName={SERVICE_NAMES.GVS}
      filterByPermissionName={requiredPermission}
      meta={{}}
      component={Select}
      optionGroupName="options"
      excludeCurrent={false}
      displayEnvsFromCurrentProject={currentProject.id}
      fullWidth
    />
  );
};

GVSTitleEnvSelect.propTypes = {
  currentProject: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  titleEnvId: PropTypes.number,
};
GVSTitleEnvSelect.defaultProps = {
  currentProject: {},
  titleEnvId: null,
};
export default GVSTitleEnvSelect;
