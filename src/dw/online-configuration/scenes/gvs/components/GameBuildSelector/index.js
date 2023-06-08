import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Select from 'dw/core/components/Select';
import { useScopes } from '../../graphql/hooks';

const useStyles = makeStyles(theme => ({
  buildSelectRoot: {
    marginBottom: 0,
    marginTop: '1px',
  },
  buildSelect: {
    padding: 0,
    paddingLeft: '3px',
    minWidth: '150px',
    ...theme.typography.subtitle2,
  },
  active: {
    fontWeight: '600',
  },
}));

const GameBuildSelector = ({
  scopeRoot,
  scopeURI,
  onScopeChange,
  disabled,
  label,
}) => {
  const classes = useStyles();
  const { envScope, buildScopes } = useScopes(scopeRoot);
  const buildOptions = useMemo(() => {
    const options = [{ value: envScope?.scopeURI || scopeRoot, label: 'All' }];
    return buildScopes
      ? [
          ...options,
          ...buildScopes.map(scope => ({
            value: scope.scopeURI,
            label: scope.scopeName,
          })),
        ]
      : options;
  }, [envScope, buildScopes, scopeRoot]);
  return (
    <Select
      label={label}
      options={buildOptions}
      onChange={e => onScopeChange(e.target.value)}
      value={scopeURI}
      classes={{
        root: cn(classes.buildSelect, {
          [classes.disabledBreadcrumb]: disabled,
        }),
      }}
      className={cn(classes.buildSelectRoot, {
        [classes.active]:
          buildScopes && buildScopes.find(s => s.scopeURI === scopeURI),
      })}
    />
  );
};
GameBuildSelector.propTypes = {
  scopeRoot: PropTypes.string.isRequired,
  scopeURI: PropTypes.string.isRequired,
  onScopeChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};
GameBuildSelector.defaultProps = {
  disabled: false,
  label: undefined,
};

export default GameBuildSelector;
