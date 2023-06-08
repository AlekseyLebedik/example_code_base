import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { useParams } from 'react-router-dom';
import { useQueryParam } from 'dw/core/hooks';

import { GVS_VIEW_CONFIGURATION } from '@demonware/devzone-core/access/PermissionCheck/permissions';

import Select from 'dw/core/components/FormFields/Select';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import TitleEnvSelect from 'dw/core/components/TitleEnvSelect';
import GameBuildSelector from 'dw/online-configuration/scenes/gvs/components/GameBuildSelector';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  env: {
    width: '300px',
  },
  envSelect: {
    padding: 0,
    paddingLeft: '3px',
    minWidth: '150px',
    ...theme.typography.subtitle2,
  },
  separator: {
    margin: `0 ${theme.spacing(2)}px`,
  },
}));

export const GVSTitleEnvSelect = ({
  includeGameBuild,
  targetScopeURI,
  setTargetScopeURI,
  requiredPermission,
  excludeCurrent,
  className,
}) => {
  const classes = useStyles();

  const scopeRoot = useMemo(() => {
    const parts = targetScopeURI.split(':');
    return parts.slice(0, 3).join(':');
  }, [targetScopeURI]);

  const onChange = useCallback(e => {
    setTargetScopeURI(e.target.value);
  }, []);

  return (
    <div className={classes.container}>
      <TitleEnvSelect
        input={{ value: scopeRoot, onChange }}
        serviceName={SERVICE_NAMES.GVS}
        filterByPermissionName={requiredPermission}
        valueSelector={e => e.environment.options.scopeURI}
        meta={{}}
        className={cn(classes.env, className)}
        classes={{ root: classes.envSelect }}
        component={Select}
        optionGroupName="options"
        excludeCurrent={excludeCurrent}
      />
      {includeGameBuild && [
        <Typography
          key="separator"
          variant="body1"
          className={classes.separator}
        >
          ›
        </Typography>,
        <GameBuildSelector
          key="game-build-selector"
          scopeURI={targetScopeURI}
          scopeRoot={scopeRoot}
          onScopeChange={setTargetScopeURI}
        />,
      ]}
    </div>
  );
};

GVSTitleEnvSelect.propTypes = {
  includeGameBuild: PropTypes.bool,
  excludeCurrent: PropTypes.bool,
  targetScopeURI: PropTypes.string,
  setTargetScopeURI: PropTypes.func.isRequired,
  requiredPermission: PropTypes.string.isRequired,
  className: PropTypes.string,
};
GVSTitleEnvSelect.defaultProps = {
  includeGameBuild: true,
  excludeCurrent: false,
  targetScopeURI: undefined,
  className: '',
};

const CompareTitleEnvSelect = () => {
  const { scopeURI } = useParams();
  const [targetScopeURI, setTargetScopeURI] = useQueryParam(
    'targetScopeURI',
    scopeURI
  );
  return (
    <GVSTitleEnvSelect
      targetScopeURI={targetScopeURI}
      setTargetScopeURI={setTargetScopeURI}
      requiredPermission={GVS_VIEW_CONFIGURATION}
    />
  );
};

export default CompareTitleEnvSelect;
