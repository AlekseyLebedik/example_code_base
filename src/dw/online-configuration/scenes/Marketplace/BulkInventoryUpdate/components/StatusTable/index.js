import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { makeStyles } from '@material-ui/core/styles';
import { GLOBAL_POLL_INTERVAL } from '@demonware/devzone-core/config';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import MonacoEditor from 'dw/core/components/FormFields/Monaco';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import { getTasksList } from 'dw/online-configuration/services/tasks';
import { columnDefs } from './constants';

import styles from './index.module.css';

const useStyles = makeStyles(theme => ({
  default: {
    textTransform: 'lowercase',
  },
  error: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
  success: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.primary.contrastText,
  },
}));

const DetailCellRenderer = params => {
  let language = 'json';
  const rawValue = params.data.error || params.data.result;
  let value;
  try {
    value =
      typeof rawValue === 'string'
        ? rawValue
        : JSON.stringify(rawValue, null, 2);
  } catch (e) {
    language = 'text';
    value = rawValue;
  }
  return (
    <MonacoEditor
      language={language}
      className={styles.editor}
      input={{
        value,
      }}
      options={{
        readOnly: true,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
      }}
    />
  );
};

const StatusTable = props => {
  const classes = useStyles();
  const formatDateTime = useSelector(state => formatDateTimeSelector(state));
  const [gridOptions, onGridReady] = useState(null);
  const [pollTimeout, setPollTimeout] = useState(null);
  const pollStatus = useCallback(() => {
    const timeout = setTimeout(
      async () => {
        const ids = [];
        gridOptions.api.forEachNode(node => {
          if (node.data?.state === 'PENDING') {
            ids.push(node.data.task_id);
          }
        });
        if (ids.length === 0) return;
        const { data } = await getTasksList({ ids: ids.join(',') });
        const update = [];
        data.data.forEach(d => {
          const node = gridOptions.api.getRowNode(d.task_id);
          if (
            !(
              isEqual(node.data.state, d.state) &&
              isEqual(node.data.result, d.result) &&
              isEqual(node.data.error, d.error)
            )
          )
            update.push(d);
        });
        if (update.length > 0) gridOptions.api.applyTransaction({ update });
        pollStatus();
      },
      props.pollInterval === undefined
        ? GLOBAL_POLL_INTERVAL
        : props.pollInterval
    );
    setPollTimeout(timeout);
  }, [gridOptions, props.pollInterval]);

  useEffect(() => () => clearTimeout(pollTimeout), [pollTimeout]);

  const onLoadData = useCallback(
    async (nextPageToken, { successCallback, failCallback }) => {
      try {
        const { data } = await getTasksList({ tags: 'marketplace' });
        const result = successCallback(data.data);
        gridOptions.api.forEachNode(node => {
          if (node.group) node.setExpanded(true);
        });
        pollStatus(result.add);
      } catch (e) {
        if (failCallback) failCallback();
      }
    },
    [gridOptions]
  );
  return (
    <AsyncAGGrid
      onGridReady={onGridReady}
      columnDefs={columnDefs}
      onLoadData={onLoadData}
      className={styles.table}
      gridOptions={{
        isRowMaster(dataItem) {
          return !!(dataItem.error || dataItem.result);
        },
        masterDetail: true,
        detailCellRenderer: 'detailCellRenderer',
        detailRowHeight: 200,
        components: {
          detailCellRenderer: DetailCellRenderer,
        },
        context: { formatDateTime, classes },
        groupDisplayType: 'groupRows',
        getRowId({ data }) {
          return data.task_id;
        },
      }}
      saveColumnStateName="marketplace-bulk-inventory-update-status"
    />
  );
};

StatusTable.propTypes = {
  pollInterval: PropTypes.number,
};

StatusTable.defaultProps = {
  pollInterval: undefined,
};

export default StatusTable;
