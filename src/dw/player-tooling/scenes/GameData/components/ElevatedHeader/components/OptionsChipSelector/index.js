import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import flatMap from 'lodash/flatMap';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { optionsSelector } from './selectors';
import SelectField from './components/SelectField';
import OptionsMenu from './components/OptionsMenu';

const PLAYER_TITLE_SERVICES_QUERY = gql`
  query PlayerLinkedAccounts($unoID: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      envs {
        id
        options
        title {
          id
          name
        }
        serviceConfigs {
          id
          type
        }
      }
    }
  }
`;
export default function OptionsChipSelector({
  accountsServiceConfigId,
  groupBy,
  highlightedOption,
  selectedOptions,
  setHighlightedOption,
  setSelectedOptions,
  unoID,
}) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { loading, error, data } = useQuery(PLAYER_TITLE_SERVICES_QUERY, {
    skip: !unoID,
    variables: { unoID, accountsServiceConfigId },
  });
  const hasFeaturesEnabledFunc = useSelector(hasFeaturesEnabledFuncSelector);
  const options = useMemo(
    () =>
      !loading && !error && data?.player
        ? optionsSelector(data, hasFeaturesEnabledFunc)
        : [],
    [loading, error, data, hasFeaturesEnabledFunc]
  );

  // set all titles/services as selected by default if no URL options provided
  useEffect(() => {
    if (
      options.length &&
      !selectedOptions.globals.length &&
      !selectedOptions.services.length &&
      !selectedOptions.titles.length
    ) {
      const titles = options
        .find(o => o.groupLabel === 'titles')
        .options.map(({ value }) => value);
      const services = options
        .find(o => o.groupLabel === 'services')
        .options.map(({ value }) => value);
      setSelectedOptions({ globals: ['activity'], titles, services });
    }
    // do not listen for selectedOptions updates
  }, [options, setSelectedOptions]);

  const handleOpenPopper = event => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleSelectOption = (group, option) => {
    const values = selectedOptions[group];
    if (!values.includes(option)) {
      values.push(option);
    } else {
      values.splice(values.indexOf(option), 1);
    }
    setSelectedOptions({ ...selectedOptions, [group]: values });
  };

  return (
    <>
      <SelectField
        itemProps={{ groupBy, highlightedOption, setHighlightedOption }}
        onClick={handleOpenPopper}
        onDelete={handleSelectOption}
        options={options}
        value={flatMap(Object.values(selectedOptions))}
      />
      {open && (
        <OptionsMenu
          anchorEl={anchorEl}
          handleClickAway={() => setOpen(prev => !prev)}
          onSelectOption={handleSelectOption}
          open={open}
          optionGroups={options}
          selectedOptions={selectedOptions}
        />
      )}
    </>
  );
}

OptionsChipSelector.propTypes = {
  accountsServiceConfigId: PropTypes.string.isRequired,
  groupBy: PropTypes.string.isRequired,
  highlightedOption: PropTypes.string.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  setHighlightedOption: PropTypes.func.isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
  unoID: PropTypes.string.isRequired,
};
