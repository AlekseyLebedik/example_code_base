import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from 'dw/core/components/SectionTitle';
import Table from 'dw/core/components/TableHydrated';
import Search from 'dw/core/components/Search';
import NextPageButton from 'dw/core/components/NextPageButton';

import {
  COLUMNS,
  SEARCH_DEFAULT_FIELD,
  SEARCH_ADVANCED_FIELDS,
} from './constants';
import './presentational.css';

const ServerLogsStateless = props => {
  const {
    serverLogs,
    nextPageToken,
    onSearch,
    onShowMore,
    q,
    formatDateTime,
    timezone,
  } = props;

  const expandedRowRender = record =>
    record.lsgMessage ? (
      <p className="expanded-row">{record.lsgMessage}</p>
    ) : (
      <>
        <div className={`expanded-row ${record.lvl.toLowerCase()}`}>
          <div className="expanded-row-header">
            <span>{record.lvl}</span>
            <span>{record.program}</span>
            <span>{record.type}</span>
            <span>{record.syslogSeverity}</span>
          </div>
          <div className="expanded-row-body">
            {record.message &&
              record.message.split(/(\r\n|\n|\r)/).map((line, idx) => (
                // eslint-disable-next-line
                <span key={idx}>{line}</span>
              ))}
            {record.lines &&
              record.lines.length > 0 &&
              !record.message &&
              record.lines.map((line, idx) => (
                // eslint-disable-next-line
                <span key={idx}>{line}</span>
              ))}
          </div>
        </div>
      </>
    );
  const table = () => (
    <Table
      data={serverLogs}
      rowKey={record => record.id}
      getKey={record => record.id}
      expandedRowKeys={serverLogs.map(record => record.id)}
      expandedRowRender={expandedRowRender}
      columns={COLUMNS}
      formatDateTime={formatDateTime}
    />
  );

  const empty = () => <div className="empty">No data to display</div>;

  return (
    <section className="main-container server-logs flex-rows-container">
      <SectionTitle
        title="Server Logs"
        shown={serverLogs.length}
        extraContent={
          <Search
            placeholder="Search by Transaction ID"
            initialValue={q}
            onSearch={onSearch}
            defaultSearchField={SEARCH_DEFAULT_FIELD}
            advancedSearchFields={SEARCH_ADVANCED_FIELDS}
            timezone={timezone}
          />
        }
      />
      <div className="scrollable-content">
        {serverLogs.length !== 0 ? table() : empty()}
      </div>
      {nextPageToken && (
        <NextPageButton nextPageToken={nextPageToken} onClick={onShowMore} />
      )}
    </section>
  );
};

ServerLogsStateless.propTypes = {
  serverLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextPageToken: PropTypes.string,
  q: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
};

ServerLogsStateless.defaultProps = {
  nextPageToken: null,
  q: null,
};

export default ServerLogsStateless;
