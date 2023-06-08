import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import IconMenu from 'dw/core/components/IconMenu';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';

import AccountDetails from './components/AccountDetails';
import AccountDetailsEmpty from './components/AccountDetailsEmpty';
import AccountListItem from './components/AccountListItem';

import './presentational.css';

class ExportAccounts extends Component {
  handleExport = format => {
    this.props.onExport(format);
  };

  render() {
    return (
      <IconMenu
        icon="file_download"
        ButtonProps={{ className: 'export-component' }}
        tooltip="Export Accounts"
      >
        {onClose => [
          <MenuItem
            key="csv"
            onClick={() => {
              onClose();
              this.handleExport('csv');
            }}
          >
            CSV
          </MenuItem>,
          <MenuItem
            key="json"
            onClick={() => {
              onClose();
              this.handleExport('json');
            }}
          >
            JSON
          </MenuItem>,
        ]}
      </IconMenu>
    );
  }
}

ExportAccounts.propTypes = {
  onExport: PropTypes.func.isRequired,
};

function getRenderItemFunc(onSelectItem) {
  return item => (
    <AccountListItem
      key={item.userID}
      {...item}
      onClick={() => onSelectItem(item)}
    />
  );
}

function AccountsStateless(props) {
  const {
    accounts,
    nextPageToken,
    q,
    onSearch,
    onShowMore,
    onExport,
    onClickListItem,
    exportAccountsOption,
  } = props;
  const { titleId, env } = props.match.params;

  const showMore = nextPageToken !== null;

  const envNotLive = env !== 'live';

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle shown={accounts.length} color="default">
        {(envNotLive || exportAccountsOption) && (
          <ExportAccounts onExport={onExport} />
        )}
      </SectionTitle>

      <SearchableList
        initialValue={q}
        onSearch={onSearch}
        placeholder="Player ID | Gamertag"
        items={accounts}
        toRenderFunc={getRenderItemFunc(item => {
          onClickListItem(item);
          actions.onSelectItem(item.userID);
        })}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPageToken, q)}
      />
    </div>
  );

  const renderDetail = () => <AccountDetails titleId={titleId} envType={env} />;

  const renderEmpty = () => <AccountDetailsEmpty />;

  return (
    <section className="accounts">
      <div className="accounts-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}

AccountsStateless.propTypes = {
  accounts: PropTypes.array.isRequired,
  nextPageToken: PropTypes.string,
  q: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSearch: PropTypes.func.isRequired,
  onShowMore: PropTypes.func,
  onExport: PropTypes.func,
  onClickListItem: PropTypes.func,
  exportAccountsOption: PropTypes.bool,
  match: PropTypes.object.isRequired,
};

AccountsStateless.defaultProps = {
  nextPageToken: undefined,
  q: undefined,
  onShowMore: undefined,
  onExport: undefined,
  onClickListItem: undefined,
  exportAccountsOption: false,
};

export default AccountsStateless;
