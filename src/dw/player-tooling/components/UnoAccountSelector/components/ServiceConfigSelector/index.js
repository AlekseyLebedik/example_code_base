import React, { useEffect, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { components } from 'react-select';

import { useQueryParam } from 'dw/core/hooks';
import Select from 'dw/core/components/Select';
import { SERVICE_CONFIG_QUERY } from '../../queries';

const useStyles = makeStyles({
  serviceSelectRoot: {
    marginBottom: 0,
    maxWidth: '95px',
  },
});

const serviceConfigsSorted = data =>
  data?.serviceConfigs
    ? data.serviceConfigs.slice().sort((a, b) => {
        if (a.name.toUpperCase().includes('PROD')) {
          if (
            !a.name.toUpperCase().includes('SHA') ||
            !b.name.toUpperCase().includes('PROD')
          )
            return -1;
        }
        if (b.name.toUpperCase().includes('PROD')) return 1;
        return 0;
      })
    : [];

export const useServiceConfigs = (paramName = 'serviceConfigID') => {
  const [serviceConfigId, setServiceConfigId] = useQueryParam(paramName);
  const { error, data, loading } = useQuery(SERVICE_CONFIG_QUERY);
  const serviceConfigs = useMemo(() => {
    return serviceConfigsSorted(data);
  }, [data]);

  useEffect(() => {
    if (
      !(
        serviceConfigId &&
        serviceConfigs.some(({ id }) => id === serviceConfigId)
      ) &&
      serviceConfigs.length > 0
    ) {
      const [{ id }] = serviceConfigs;
      setServiceConfigId(id);
    }
  }, [serviceConfigs, serviceConfigId, setServiceConfigId]);
  return useMemo(
    () => ({
      id: serviceConfigId,
      error,
      loading,
      serviceConfigs,
      onChange: setServiceConfigId,
    }),
    [serviceConfigId, setServiceConfigId, error, loading, serviceConfigs]
  );
};

const ServiceConfigSelector = ({ paramName, ...props }) => {
  const classes = useStyles();
  const { id, serviceConfigs, onChange } = useServiceConfigs(paramName);
  const options = useMemo(() => {
    return serviceConfigs.map(({ id: value, name }) => ({
      value,
      label: name.replace('Umbrella', ''),
    }));
  }, [serviceConfigs]);
  const innerProps = useMemo(
    () => ({
      onMouseDown(e) {
        e.stopPropagation();
      },
    }),
    []
  );

  if (!id) {
    // The default service config would be set automatically.
    return null;
  }

  return (
    <components.DropdownIndicator {...props} innerProps={innerProps}>
      <Select
        classes={{ root: classes.serviceSelectRoot }}
        InputProps={{ disableUnderline: true }}
        onChange={e => onChange(e.target.value)}
        options={options}
        SelectProps={{ classes: { select: classes.select } }}
        value={id}
      />
    </components.DropdownIndicator>
  );
};

ServiceConfigSelector.propTypes = {
  paramName: PropTypes.string,
};
ServiceConfigSelector.defaultProps = {
  paramName: 'serviceConfigID',
};

export default ServiceConfigSelector;
