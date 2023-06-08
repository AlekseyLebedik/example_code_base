import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';

import SelectField from 'dw/core/components/Select';
import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import Empty from 'dw/core/components/Empty';
import { PROVIDERS } from 'dw/online-configuration/scenes/constants';

import Details from './components/Details';
import UsernameTableButton from './components/UsernameTable';
import { LOOKUP_HELP } from './constants';
import styles from './presentational.module.css';

const KEY_PROVIDERS = ['Xbox', 'Playstation', 'Blizzard', 'Uno'];

const ProviderComponent = ({ providers, selectedProvider, changeProvider }) => (
  <SelectField
    id="provider"
    placeholder="Provider"
    onChange={changeProvider}
    value={selectedProvider}
    data-cy="providerSelector"
  >
    {providers
      .sort((p, p2) =>
        KEY_PROVIDERS.includes(p.label) || KEY_PROVIDERS.includes(p2.label)
          ? -(KEY_PROVIDERS.indexOf(p.label) - KEY_PROVIDERS.indexOf(p2.label))
          : PROVIDERS.indexOf(p.label) - PROVIDERS.indexOf(p2.label)
      )
      .map(provider => (
        <MenuItem
          value={provider.value}
          key={provider.value}
          data-cy="providerOption"
        >
          {provider.label}
        </MenuItem>
      ))}
  </SelectField>
);

ProviderComponent.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedProvider: PropTypes.string.isRequired,
  changeProvider: PropTypes.func.isRequired,
};

const ListItem = ({ umbrellaID, accounts, selectedItem, onClick }) => {
  const isSelected = selectedItem && selectedItem.umbrellaID === umbrellaID;
  return (
    <SearchableListItem selected={isSelected} onClick={onClick}>
      <div className="flex flex-col">
        <div>{umbrellaID}</div>
        <div>{accounts.length} Linked account(s)</div>
      </div>
    </SearchableListItem>
  );
};

ListItem.propTypes = {
  accounts: PropTypes.array,
  umbrellaID: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  accounts: [],
  selectedItem: null,
};
const getRenderItemFunc = (onSelectItem, selectedItem) => item =>
  (
    <ListItem
      key={item.umbrellaID}
      {...item}
      selectedItem={selectedItem}
      onClick={() => onSelectItem(item)}
    />
  );

const LinkedAccountsStateless = ({
  linkedAccounts,
  selectedItem,
  nextPage,
  onShowMore,
  onSearch,
  loading,
  provider,
  changeProvider,
  ...props
}) => {
  const showMore = !!nextPage;

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle shown={linkedAccounts.length} color="default" />
      <div className={styles.providerContainer}>
        <div className={styles.provider}>
          <ProviderComponent
            providers={PROVIDERS}
            selectedProvider={provider}
            changeProvider={changeProvider}
          />
          <Tooltip title={LOOKUP_HELP}>
            <Icon fontSize="small" className={styles.helpIcon}>
              help_outline
            </Icon>
          </Tooltip>
        </div>
        <UsernameTableButton
          providers={PROVIDERS}
          loadOptions={{ q: props.q, onSearch }}
        />
      </div>
      <SearchableList
        onSearch={onSearch}
        initialValue={props.q}
        placeholder="PlayerID | Gamertag"
        items={linkedAccounts}
        toRenderFunc={getRenderItemFunc(item => {
          actions.onSelectItem(item.umbrellaID);
        }, selectedItem)}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPage)}
        initialLoading={loading}
        loadingTimeout={0}
      />
    </div>
  );
  renderMaster.propTypes = {
    actions: PropTypes.object.isRequired,
  };

  const renderEmpty = () => <Empty>Select an item to get more details</Empty>;

  return (
    <MasterDetail
      master={renderMaster}
      empty={renderEmpty}
      detail={detailProps => (
        <Details {...detailProps} selectedItem={selectedItem} />
      )}
    />
  );
};

LinkedAccountsStateless.propTypes = {
  linkedAccounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItem: PropTypes.object,
  nextPage: PropTypes.string,
  onShowMore: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired,
  changeProvider: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  q: PropTypes.string,
};

LinkedAccountsStateless.defaultProps = {
  nextPage: null,
  selectedItem: null,
  loading: false,
  q: undefined,
};

export default LinkedAccountsStateless;
