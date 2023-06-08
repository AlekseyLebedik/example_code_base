import React, { useContext, useMemo } from 'react';
import { components } from 'react-select';

import Select from 'dw/core/components/Select';
import { ClansContext } from 'dw/clans/components/ClansProvider';

import styles from './index.module.css';

const EnvSelector = props => {
  const { env, envs, onSetEnv } = useContext(ClansContext);

  const onMouseDown = e => e.stopPropagation();

  const options = useMemo(
    () =>
      envs
        ? Object.values(envs).map(value => ({
            value,
            label: value,
          }))
        : [],
    [envs]
  );

  return (
    <components.DropdownIndicator {...props} innerProps={{ onMouseDown }}>
      <Select
        classes={{ root: styles.serviceSelectRoot }}
        InputProps={{ disableUnderline: true }}
        onChange={({ target: { value } }) => onSetEnv(value)}
        options={options}
        SelectProps={{
          classes: { select: styles.serviceSelect },
          'data-cy': 'clanEnvSelector',
        }}
        value={env}
      />
    </components.DropdownIndicator>
  );
};

export default EnvSelector;
