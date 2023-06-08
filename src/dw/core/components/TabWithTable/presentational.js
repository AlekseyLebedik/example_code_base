import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import NextPageButton from 'dw/core/components/NextPageButton';

import Table from 'dw/core/components/TableHydrated';
import Search from 'dw/core/components/Search';
import './presentational.css';

const TabWithTableStateless = props => {
  const {
    actionTypePrefix,
    collection,
    columns,
    fontSize,
    onShowMore,
    onSearch,
    nextPageToken,
    withSearch,
    pagination,
    searchPlaceHolder,
    loading,
    formatDateTime,
  } = props;

  const table = () => (
    <Table
      data={collection}
      columns={columns}
      pagination={pagination}
      fontSize={fontSize}
      formatDateTime={formatDateTime}
    />
  );
  const empty = () => <div className="empty">No data to display</div>;
  const content = () => (collection.length !== 0 ? table() : empty());
  const actionClass =
    typeof actionTypePrefix === 'string'
      ? actionTypePrefix
      : actionTypePrefix.actionPrefix;

  return (
    <div
      className={`tab-with-table flex-rows-container ${actionClass.toLowerCase()}`}
    >
      {withSearch && (
        <Search
          placeholder={searchPlaceHolder}
          onSearch={payload => onSearch(payload)}
        />
      )}
      <div className="scrollable-content with-inner-padding">
        {loading ? (
          <CircularProgress className="tab-loading" size={80} thickness={5} />
        ) : (
          content()
        )}
      </div>
      {nextPageToken && (
        <NextPageButton nextPageToken={nextPageToken} onClick={onShowMore} />
      )}
    </div>
  );
};

TabWithTableStateless.propTypes = {
  collection: PropTypes.array.isRequired,
  actionTypePrefix: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  columns: PropTypes.array.isRequired,
  onShowMore: PropTypes.func,
  onSearch: PropTypes.func,
  nextPageToken: PropTypes.string,
  withSearch: PropTypes.bool,
  pagination: PropTypes.bool,
  searchPlaceHolder: PropTypes.string,
  loading: PropTypes.bool,
  formatDateTime: PropTypes.func,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
TabWithTableStateless.defaultProps = {
  onShowMore: () => {},
  onSearch: () => {},
  nextPageToken: undefined,
  withSearch: false,
  pagination: false,
  searchPlaceHolder: undefined,
  loading: false,
  formatDateTime: () => {},
  fontSize: undefined,
};

TabWithTableStateless.defaultProps = {
  pagination: false,
};

export default TabWithTableStateless;
