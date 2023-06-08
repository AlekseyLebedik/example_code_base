import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { fetchAuditLogs } from '../../actions';

import AggridPresentational from './presentational';

const AgGridComponent = props => {
  const formatDateTime = useSelector(formatDateTimeSelector);
  const [queryParams, setQueryParams] = useState({});
  const location = useLocation();
  const { refreshKey } = props;
  useEffect(() => {
    const query = queryString.parse(location.search);
    setQueryParams(query);
  }, [refreshKey, location]);
  const dispatch = useDispatch();
  const onLoadData = useCallback(
    (nextPageToken, params = {}) => {
      dispatch(
        fetchAuditLogs({
          ...queryParams,
          nextPageToken,
          ...params,
        })
      );
    },
    [dispatch, queryParams]
  );
  return (
    <AggridPresentational
      {...props}
      formatDateTime={formatDateTime}
      onLoadData={onLoadData}
    />
  );
};
AgGridComponent.propTypes = {
  refreshKey: PropTypes.string,
};
AgGridComponent.defaultProps = {
  refreshKey: undefined,
};

export default AgGridComponent;
