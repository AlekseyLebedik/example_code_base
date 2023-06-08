import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import MonacoEditor from 'dw/core/components/FormFields/Monaco';
import { PlatformIcon } from 'dw/core/components/Icons';
import { hasData } from 'dw/core/helpers/object';

import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import UserLink, {
  LinkedAccountsLink,
} from 'dw/online-configuration/components/UserLink';
import { PROVIDERS_MAP } from 'dw/online-configuration/scenes/constants';

import { fetchAuditLogs } from './actions';
import { columnDefs, defaultColDef } from './constants';

import styles from './index.module.css';

const PlatformRenderer = ({ node, value }) => {
  const platform = value !== undefined ? value : node?.key;
  return <PlatformIcon platform={platform} />;
};

PlatformRenderer.propTypes = {
  value: PropTypes.string.isRequired,
  node: PropTypes.object,
};
PlatformRenderer.defaultProps = {
  node: {},
};

const AccountsLinkRenderer = ({ value }) => <UserLink userId={value} />;
AccountsLinkRenderer.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
const uuidRenderer = params => (
  <a
    href={`${params.context.url}?q=${params.value}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {`${params?.value?.slice(0, 8)}...`}
  </a>
);

const LinkedAccountsLinkRenderer = ({
  value: userId,
  data: { first_party_account_type: accountType },
}) => {
  const provider = PROVIDERS_MAP[accountType] || accountType || 'uno';
  return <LinkedAccountsLink userId={userId} provider={provider} />;
};
LinkedAccountsLinkRenderer.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  data: PropTypes.shape({ first_party_account_type: PropTypes.string }),
};
LinkedAccountsLinkRenderer.defaultProps = {
  data: {},
};

const DetailCellRenderer = params => (
  <MonacoEditor
    language="json"
    className={styles.editor}
    input={{
      value: JSON.stringify(params.data, null, 2),
    }}
    options={{ readOnly: true, scrollBeyondLastLine: false }}
    containerResizeOnReady
  />
);

const Audit = ({ userId: playerId, location }) => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const onLoadData = (_, params) =>
    dispatch(fetchAuditLogs({ ...params, playerId }));
  const formatDateTime = useSelector(state => formatDateTimeSelector(state));
  const onGridReady = params => {
    const searchFilter = queryString.parse(location?.search);
    if (hasData(searchFilter)) {
      setUrl(`${location.pathname}`);
      params.api.setQuickFilter(searchFilter.q);
    }
  };
  return (
    <div className={styles.table}>
      <AsyncAGGrid
        key={playerId}
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        onLoadData={onLoadData}
        gridOptions={{
          masterDetail: true,
          detailCellRenderer: 'rawCellRenderer',
          detailRowHeight: 400,
          defaultColDef,
          components: {
            accountsLinkRenderer: AccountsLinkRenderer,
            linkedAccountsLinkRenderer: LinkedAccountsLinkRenderer,
            rawCellRenderer: DetailCellRenderer,
            platformRenderer: PlatformRenderer,
            uuidRenderer,
          },
          context: {
            formatDateTime,
            url,
          },
          rowGroupPanelShow: 'always',
          groupDisplayType: 'groupRows',
        }}
        saveColumnStateName="marketplace-player-assets-audit"
      />
    </div>
  );
};
Audit.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  location: PropTypes.object.isRequired,
};

export default contextAwareService(
  Services.Marketplace,
  ServiceEndpoints.Marketplace.getPlayerAuditLogs,
  [],
  { serviceDependsOnUser: true, platformOnly: true }
)(Audit);
