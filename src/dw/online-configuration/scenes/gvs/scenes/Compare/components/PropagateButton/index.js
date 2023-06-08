import React, { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { GVS_EDIT_CONFIGURATION } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';

import { useEnvironments } from 'dw/core/components/TitleEnvSelect/hooks';

import { useQueryParam } from 'dw/core/hooks';
import { GLOBAL_PLAYERS } from '@gvs/constants';
import PropagateDialog from '../PropagateDialog';

const PropagateButton = () => {
  const { scopeURI } = useParams();
  const [sourcePopulation] = useQueryParam('sourcePopulation', GLOBAL_PLAYERS);
  const [targetPopulation] = useQueryParam('targetPopulation', GLOBAL_PLAYERS);
  const [targetScopeURI] = useQueryParam('targetScopeURI');
  const targetEnvScopeURI = useMemo(() => {
    const parts = targetScopeURI.split(':');
    return parts.slice(0, 3).join(':');
  }, [targetScopeURI]);
  const { loading, environments } = useEnvironments({
    serviceName: SERVICE_NAMES.GVS,
    requiredPermission: GVS_EDIT_CONFIGURATION,
  });
  const [btnTooltip, disabled] = useMemo(() => {
    if (loading || environments.length === 0) return [];
    if (scopeURI === targetScopeURI && sourcePopulation === targetPopulation)
      return ['Source and Target should be different', true];
    if (
      sourcePopulation !== GLOBAL_PLAYERS ||
      targetPopulation !== GLOBAL_PLAYERS
    ) {
      return ['Global Players propagation only', true];
    }
    const env = environments.find(
      e => e.environment.options.scopeURI === targetEnvScopeURI
    );
    return env
      ? ['Propagate', false]
      : ['No permissions for propagation', true];
  }, [
    sourcePopulation,
    targetPopulation,
    loading,
    environments,
    scopeURI,
    targetEnvScopeURI,
    targetScopeURI,
  ]);
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
      {open && <PropagateDialog onClose={() => setOpen(false)} />}
    </>
  );
};

export default PropagateButton;
