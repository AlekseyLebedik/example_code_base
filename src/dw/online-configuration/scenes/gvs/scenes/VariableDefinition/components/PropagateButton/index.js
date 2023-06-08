import React, { useMemo, useState } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { GVS_EDIT_DEFINITIONS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';

import { useEnvironments } from 'dw/core/components/TitleEnvSelect/hooks';

import InfoButton from '../InfoButton';
import PropagateDialog from '../PropagateDialog';

const PropagateButton = ({ selected, gridApi }) => {
  const { loading, environments } = useEnvironments({
    serviceName: SERVICE_NAMES.GVS,
    requiredPermission: GVS_EDIT_DEFINITIONS,
    excludeCurrent: true,
  });
  const [btnTooltip, disabled] = useMemo(() => {
    if (!gridApi || loading || environments.length === 0) return [];

    return selected
      ? ['Propagate Variable Definitions', false]
      : ['Select Definitions', true];
  }, [loading, environments, selected]);
  const [open, setOpen] = useState(false);
  if (!btnTooltip) return null;
  return (
    <>
      <Tooltip title={btnTooltip}>
        <span>
          <IconButton disabled={disabled} onClick={() => setOpen(true)}>
            <Icon>call_split</Icon>
          </IconButton>
        </span>
      </Tooltip>
      {open && (
        <PropagateDialog onClose={() => setOpen(false)} gridApi={gridApi} />
      )}
    </>
  );
};

PropagateButton.propTypes = {
  selected: PropTypes.bool,
  gridApi: PropTypes.object,
};
PropagateButton.defaultProps = {
  selected: false,
  gridApi: undefined,
};

const PropagateBtn = props => {
  const { selected, ...rest } = props;
  const someArchived = useMemo(
    () => selected.some(({ data: { isArchived } }) => isArchived === true),
    [selected]
  );
  if (someArchived) {
    return (
      <InfoButton
        icon="call_split"
        tooltip="Propagate Variable Definitions"
        title="Propagate Variable Definitions"
      >
        Archived definition cannot be propagated.
      </InfoButton>
    );
  }
  return <PropagateButton {...rest} selected={selected.length > 0} />;
};
PropagateBtn.propTypes = {
  selected: PropTypes.array.isRequired,
};

export default PropagateBtn;
