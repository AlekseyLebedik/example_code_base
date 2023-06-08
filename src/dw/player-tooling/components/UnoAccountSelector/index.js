import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { components } from 'react-select';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { compose } from 'redux';
import sortBy from 'lodash/sortBy';
import { useQuery } from '@apollo/react-hooks';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import { withUserProfileActions } from '@demonware/devzone-core/modules/user/HOC';

import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';
import { useDebouncedCallback, useQueryParam } from 'dw/core/hooks';

import { PLAYERS_QUERY } from './queries';
import ServiceConfigSelector from './components/ServiceConfigSelector';

import styles from './index.module.css';

export const formatGroup = (id, username) =>
  id
    ? {
        label: username ? `${username} | ${id}` : `${id}`,
        value: `${id}`,
        username,
      }
    : '';

const formatGroups = accounts =>
  accounts?.map(({ accountID, username }) =>
    formatGroup(accountID, username)
  ) || [];

const Menu = props => (
  <components.Menu {...props}>
    {props.children}
    {
      (props.options.length && !props.isLoading,
      props.selectProps.displayMoreResults ? (
        <div className={styles.menuMoreResults}>
          More results available. Keep typing to refine.
        </div>
      ) : null)
    }
  </components.Menu>
);

Menu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectProps: PropTypes.object.isRequired,
};

const UnoAccountSelector = ({
  accountsServiceConfigId,
  classes,
  disabledOptions,
  hidelabel,
  hideServiceConfigs,
  label,
  menuPosition,
  onSelectAccount,
  placeholder,
  unoUserData,
  user,
  valueContainerClass,
  valuesOnly,
  variant,
}) => {
  const [paramServiceConfigId] = useQueryParam('serviceConfigID');
  const serviceConfigId = useMemo(
    () => accountsServiceConfigId || paramServiceConfigId,
    [accountsServiceConfigId, paramServiceConfigId]
  );
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [displayMoreResults, setDisplayMoreResults] = useState(false);
  const [shrink, setShrink] = useState(!!unoUserData.accountID || !!inputValue);
  const defaultValue = useMemo(
    () => formatGroup(unoUserData.accountID, unoUserData.username),
    [unoUserData.accountID, unoUserData.username]
  );
  const [resetKey, setResetKey] = useState(
    `${serviceConfigId}-${defaultValue.label}`
  );
  const queryString = useMemo(
    () =>
      // Check if value is number or email and avoid auto partial search if so
      /^\d+$/.test(query) || /^[a-zA-Z0-9_.+-]+[@]\w+[.]\w{2,3}$/.test(query)
        ? query
        : `${query.replace(/%/g, '')}%`,
    [query]
  );

  // Debounce the query execution
  const debouncedQueryInputChange = useDebouncedCallback(setQuery);
  const { data } = useQuery(PLAYERS_QUERY, {
    skip: !serviceConfigId || !query,
    variables: {
      accountsServiceConfigId: serviceConfigId,
      query: queryString,
      includeFirstParty: true,
    },
  });

  useEffect(() => {
    if (unoUserData.accountID || inputValue) setShrink(true);
  }, [unoUserData.accountID, !!inputValue]);

  useEffect(() => {
    setResetKey(`${serviceConfigId}-${defaultValue.label}`);
  }, [serviceConfigId, defaultValue.label]);

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
    const unoAccounts = data?.linkedAccounts?.unoAccounts || [];
    const consolidatedData = [
      ...sortBy(
        user.profile.favoritePlayers.map(fp => ({
          ...fp,
          accountID: fp.accountId,
        })),
        fp => fp.username?.toLowerCase()
      ),
      ...unoAccounts.filter(
        la =>
          !user.profile.favoritePlayers.find(
            fp => fp.accountId === la.accountID
          )
      ),
    ];
    formatThenCallback(loadOptionsRef.current)(consolidatedData);
    setDisplayMoreResults(!!data?.linkedAccounts?.nextPageToken);
  }, [data, user.profile.favoritePlayers]);

  const onChange = (...args) => {
    onSelectAccount(...args);
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

  const toggleFavoritePlayer = (event, playerData, isFavorite) => {
    const { addUserProfileFavoritePlayer, removeUserProfileFavoritePlayer } =
      user.actions;
    event.stopPropagation();
    return isFavorite
      ? removeUserProfileFavoritePlayer(playerData)
      : addUserProfileFavoritePlayer(playerData);
  };

  return (
    <div className={cn(styles.autoComplete, classes.root)}>
      <AutocompleteGeneral
        cacheOptions
        components={{
          ...(!hideServiceConfigs && {
            DropdownIndicator: props => <ServiceConfigSelector {...props} />,
          }),
          Menu,
        }}
        displayMoreResults={displayMoreResults}
        formatOptionLabel={(option, { context }) => {
          if (context === 'value') return option.label;
          const isFavorite = user.profile.favoritePlayers.find(
            fp =>
              fp.accountId === option.value && fp.username === option.username
          );
          return (
            <div className={styles.userAutocompleteLabelContainer}>
              <div className={styles.userAutocompleteLabelContainerLabel}>
                {`${option.username} | ${option.value}`}
              </div>
              <Tooltip
                title={
                  isFavorite ? 'Remove Favorite Player' : 'Add Favorite Player'
                }
              >
                <Icon
                  color={isFavorite ? 'primary' : 'inherit'}
                  onClick={e =>
                    toggleFavoritePlayer(
                      e,
                      {
                        account_id: option.value,
                        username: option.username,
                      },
                      isFavorite
                    )
                  }
                >
                  {isFavorite ? 'star' : 'star_border'}
                </Icon>
              </Tooltip>
            </div>
          );
        }}
        defaultValue={defaultValue}
        handleBlur
        inputValue={inputValue}
        isOptionDisabled={option =>
          option.value === unoUserData.accountID ||
          disabledOptions.includes(option.value)
        }
        key={resetKey}
        {...(!hidelabel && { label: !shrink ? `Enter an ${label}` : label })}
        loadOptions={onLoadData}
        onBlur={() =>
          !unoUserData?.accountID && !inputValue && setShrink(false)
        }
        onChange={onChange}
        onFocus={() => setShrink(true)}
        onInputChange={onInputChange}
        placeholder={placeholder}
        regularInputMode
        size="big"
        styles={{
          menu: base => ({
            ...base,
            marginTop: '0px',
          }),
        }}
        menuPosition={menuPosition}
        textFieldProps={{
          variant,
          ...(!placeholder && {
            InputLabelProps: {
              classes: {
                root: cn(
                  styles.labelRoot,
                  variant === 'outlined'
                    ? styles.labelRootOutlined
                    : styles.labelRootDefault
                ),
                shrink: styles.labelShrink,
              },
              shrink,
            },
          }),
        }}
        valuesOnly={valuesOnly}
        {...((variant === 'outlined' || valueContainerClass) && {
          valueContainerClass: valueContainerClass || styles.valueContainer,
        })}
      />
    </div>
  );
};

UnoAccountSelector.propTypes = {
  accountsServiceConfigId: PropTypes.string,
  classes: PropTypes.object,
  disabledOptions: PropTypes.arrayOf(PropTypes.string),
  hidelabel: PropTypes.bool,
  hideServiceConfigs: PropTypes.bool,
  label: PropTypes.string,
  menuPosition: PropTypes.string,
  onSelectAccount: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  unoUserData: PropTypes.object,
  user: PropTypes.object,
  valueContainerClass: PropTypes.string,
  valuesOnly: PropTypes.bool,
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};
UnoAccountSelector.defaultProps = {
  accountsServiceConfigId: undefined,
  classes: {},
  disabledOptions: [],
  hidelabel: false,
  hideServiceConfigs: false,
  label: 'Activision (Uno) ID or First Party ID or Gamertag or Email',
  menuPosition: 'fixed',
  placeholder: '',
  unoUserData: {},
  user: {},
  valueContainerClass: undefined,
  valuesOnly: true,
  variant: 'standard',
};

export default compose(withUserProfileActions)(UnoAccountSelector);
