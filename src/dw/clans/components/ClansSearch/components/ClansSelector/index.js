import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import { useDebouncedCallback } from 'dw/core/hooks';
import EnvSelector from '../EnvSelector';

import styles from './index.module.css';

export const formatGroup = (id, name) =>
  id ? { label: `Clan ${id} | ${name}`, value: `${id}` } : '';

const formatGroups = clans =>
  clans?.map(({ id, name }) => formatGroup(id, name)) || [];

const CLANS_QUERY = gql`
  query ClansSelect($titleId: ID!, $env: Env!, $query: String, $clanId: ID) {
    clans(
      titleId: $titleId
      env: $env
      clanName: $query
      clanTag: $query
      clanId: $clanId
    ) {
      id
      name
    }
  }
`;

const ClansSelector = ({ displayEnvSelector }) => {
  const { clanId, titleId, env, onSelectClanId } = useContext(ClansContext);
  const { data: clanById } = useQuery(CLANS_QUERY, {
    skip: !titleId || !env || !clanId,
    variables: { titleId, env, clanId },
  });
  const clanName = clanById
    ? clanById.clans?.length && clanById.clans[0].name
    : '';
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [resetKey, setResetKey] = useState(`${env}-${clanId}-${clanName}`);

  useEffect(() => {
    setResetKey(`${env}-${clanId}-${clanName}`);
  }, [env, clanId, clanName]);

  // Debounce the query execution
  const debouncedQueryInputChange = useDebouncedCallback(setQuery);
  const { data } = useQuery(CLANS_QUERY, {
    skip: !titleId || !env || !query,
    variables: {
      titleId,
      env,
      ...(/^\d+$/.test(query) ? { clanId: query } : { query }),
    },
  });

  const formatThenCallback =
    callback =>
    (result = []) => {
      callback(formatGroups(result));
    };

  /* With the `useQuery` we don't have a posibility to call the GraphQL endpoint on demand.
   * It will make a query every time the query variables change.
   * In our case we are debouncing query variable change so the query execution is debounced.
   * But we still need to pass the query results to the AutoComplete component.
   * It is calling onLoadData every time it's input changes with the `callback` param.
   * The trick is to save the callback in a ref and call it whenever query returns results.
   */
  const loadOptionsRef = useRef();

  const onLoadData = useCallback((_, callback) => {
    loadOptionsRef.current = callback;
  }, []);

  useEffect(() => {
    if (!data) return;
    formatThenCallback(loadOptionsRef.current)(data.clans);
  }, [data]);

  const onChange = (...args) => {
    onSelectClanId(...args);
    setInputValue('');
  };

  const onInputChange = (value, { action }) => {
    if (action === 'input-change') {
      // Input cleared onChange so handling separately
      setInputValue(value);
      debouncedQueryInputChange(value);
      return value;
    }
    return inputValue;
  };

  const defaultValue = useMemo(
    () => formatGroup(clanId, clanName),
    [clanId, clanName]
  );

  return (
    <div className={styles.autoComplete}>
      <AutocompleteGeneral
        cacheOptions
        components={{
          ...(displayEnvSelector && { DropdownIndicator: EnvSelector }),
        }}
        defaultValue={defaultValue}
        formatOptionLabel={(option, { context }) => {
          if (context === 'menu' || !query) return option.label;
          return `${query} | ${option.label}`;
        }}
        handleBlur
        inputValue={inputValue}
        isOptionDisabled={option => option.value === clanId}
        key={resetKey}
        loadOptions={onLoadData}
        onChange={onChange}
        onInputChange={onInputChange}
        placeholder="Search Clan Name, Clan ID, Tag, Member Name or ID"
        regularInputMode
        size="big"
        textFieldProps={{
          variant: 'outlined',
          className: styles.textField,
          'data-cy': 'clansSelector',
        }}
        valueContainerClass={styles.valueContainer}
      />
    </div>
  );
};

ClansSelector.propTypes = {
  displayEnvSelector: PropTypes.bool,
};
ClansSelector.defaultProps = {
  displayEnvSelector: true,
};

export default ClansSelector;
