import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useCancellablePromise } from 'dw/core/hooks';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import Empty from 'dw/core/components/Empty';
import * as API from 'dw/audit/services/accountauditllogs';
import AggridComponent from '../AggridComponent/index';
import styles from './index.module.css';
import { TableLoadingSkeleton } from '../Skeleton';

const Details = ({
  accountID,
  provider,
  handleOnGridReady,
  context,
  rowData,
  setRowData,
  queryComplete,
  setQueryComplete,
}) => {
  const cancellablePromise = useCancellablePromise();
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchQueryStatus = useCallback(async queryId => {
    const response = await cancellablePromise(API.getQuery, queryId);
    return response;
  });

  const startQuery = useCallback(
    async params => {
      const response = await cancellablePromise(API.startQuery, params);
      return response;
    },
    [provider, accountID]
  );

  const fetchData = useQuery(
    ['fetchData', { accountID, provider }],
    () =>
      startQuery({
        account_id: accountID,
        provider,
      }),
    {
      onError: error => {
        setErrorMessage(error);
        if (error.isCanceled) return error;
        return error;
      },
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  const queryStatus = useQuery(
    ['queryStatus', fetchData.data?.data?.query_id],
    () => fetchQueryStatus(fetchData.data?.data?.query_id),
    {
      onSuccess: response => {
        if (response?.data?.status === 'failed') {
          setQueryComplete(true);
          setErrorMessage(
            'Query status was returned as failed from Databricks'
          );
        }
        if (response?.data?.status === 'complete') {
          setQueryComplete(true);
          setRowData(JSON.parse(response?.data?.row_data));
        }
      },
      onError: error => {
        setQueryComplete(true);
        setErrorMessage(error);
        if (error.isCanceled) return error;
        return error;
      },
      enabled: !!fetchData.data?.data?.query_id,
      refetchInterval: queryComplete ? false : 5000,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  if (
    queryStatus?.isError ||
    fetchData?.isError ||
    queryStatus?.data?.status === 'failed' ||
    errorMessage
  )
    return (
      <div className={styles.infoContainer}>
        <Empty
          emptyText="Databricks Query has failed"
          className={styles.textContainer}
        />
        <Tooltip title={errorMessage}>
          <Icon fontSize="medium" color="error">
            error
          </Icon>
        </Tooltip>
      </div>
    );

  if (!queryComplete) return <TableLoadingSkeleton />;

  if (queryComplete && rowData.length > 0)
    return (
      <AggridComponent
        rowData={rowData}
        context={context}
        handleOnGridReady={handleOnGridReady}
      />
    );

  return (
    <Empty emptyText="There is no account auditlog data associated with this Activision ID or Gamertag for the last 90 days" />
  );
};

Details.propTypes = {
  provider: PropTypes.string.isRequired,
  accountID: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  handleOnGridReady: PropTypes.func.isRequired,
  rowData: PropTypes.array.isRequired,
  setRowData: PropTypes.func.isRequired,
  queryComplete: PropTypes.bool.isRequired,
  setQueryComplete: PropTypes.func.isRequired,
};
export default Details;
