import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import SearchAuditLogsStateless from './presentational';
import { omitQueryByTypes } from './helpers';

const SearchAuditLogs = props => {
  const { location, history, onRefresh } = props;
  const initialValues = queryString.parse(location.search);
  const onSearch = useCallback(
    query => {
      const string = queryString.stringify(
        omitQueryByTypes(query, [
          'userID',
          'titleID',
          'env',
          'userType',
          'entityID',
          'entityName',
          'category',
          'context',
          'sourceName',
          'extra',
        ])
      );
      history.replace(`?${string}`);
      onRefresh();
    },
    [onRefresh, history]
  );
  return (
    <SearchAuditLogsStateless
      initialValues={initialValues}
      onSearch={onSearch}
      {...props}
    />
  );
};

SearchAuditLogs.propTypes = {
  onRefresh: PropTypes.func,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

SearchAuditLogs.defaultProps = {
  onRefresh: () => {},
};

export default withRouter(SearchAuditLogs);
