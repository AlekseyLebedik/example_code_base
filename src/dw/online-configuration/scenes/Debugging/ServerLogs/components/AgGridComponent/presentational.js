import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import MonacoEditor from 'dw/core/components/FormFields/Monaco';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';

import Export from '../Export';
import ExportLoading from '../ExportLoading';
import styles from './index.module.css';

const otherMessageRenderer = params => {
  const { onExpand } = params;
  return (
    <IconButton
      className={!params.data ? styles.hideButton : ''}
      onClick={() => onExpand(params.data.id, params.data.tr)}
      data-cy="adjacentMessageButton"
    >
      <Icon>chrome_reader_mode</Icon>
    </IconButton>
  );
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
    editorRef={React.createRef()}
  />
);

const CustomHeader = params => {
  const [allRowsExpanded, setAllRowsExpanded] = useState(false);
  const userIdSort = get(params, 'userIdSort', null);
  const onChangeUserIdSort = get(params, 'onChangeUserIdSort', () => {});
  const showUserIdMenuIcon = get(params, 'showUserIdMenuIcon', false);
  const toggleUserIdMenuIcon = get(params, 'toggleUserIdMenuIcon', () => {});

  const headerRef = useRef(null);

  useEffect(() => {
    params.setSort(userIdSort);
  }, [userIdSort]);

  const menuRef = useRef(null);

  const onClickMenu = useCallback(() => {
    params.showColumnMenu(menuRef.current);
  }, [menuRef, params.showColumnMenu]);

  useEffect(() => {
    const header = headerRef.current;
    if (
      header &&
      header?.parentElement &&
      header?.parentElement?.parentElement
    ) {
      header?.parentElement?.parentElement?.addEventListener(
        'click',
        onChangeUserIdSort
      );
      header?.parentElement?.parentElement?.addEventListener(
        'mouseenter',
        toggleUserIdMenuIcon
      );
      header?.parentElement?.parentElement?.addEventListener(
        'mouseleave',
        toggleUserIdMenuIcon
      );
    }
    return () => {
      if (
        header &&
        header?.parentElement &&
        header?.parentElement?.parentElement
      )
        header?.parentElement?.parentElement?.removeEventListener(
          'click',
          onChangeUserIdSort
        );
      header?.parentElement?.parentElement?.removeEventListener(
        'mouseenter',
        toggleUserIdMenuIcon
      );
      header?.parentElement?.parentElement?.removeEventListener(
        'mouseleave',
        toggleUserIdMenuIcon
      );
    };
  }, []);

  const expandAllRows = useCallback(() => {
    setAllRowsExpanded(prevValue => !prevValue);
  }, []);

  useEffect(() => {
    params.api.forEachNode(node => {
      node.setExpanded(allRowsExpanded);
    });
  }, [allRowsExpanded]);

  return (
    <div className={styles.userIdColumnHeader} ref={headerRef}>
      <div className={styles.userIdColumnHeaderLeft}>
        <Icon className={styles.userIdExpandAllButton} onClick={expandAllRows}>
          {allRowsExpanded ? 'expand_more' : 'expand_less'}
        </Icon>
        <div>{params.displayName}</div>
        {userIdSort === 'asc' && (
          <Icon className={styles.userIdSortIcon}>arrow_upward</Icon>
        )}
        {userIdSort === 'desc' && (
          <Icon className={styles.userIdSortIcon}>arrow_downward</Icon>
        )}
      </div>
      {showUserIdMenuIcon && (
        <div
          className={styles.userIdColumnHeaderRight}
          onClick={e => e.stopPropagation()}
        >
          <Icon
            className={styles.userIdMenuIcon}
            onClick={onClickMenu}
            ref={menuRef}
          >
            menu
          </Icon>
        </div>
      )}
    </div>
  );
};

const AggridPresentational = ({
  formatDateTime,
  onClickExpand,
  onLoadData,
  refreshKey,
  onExport,
  exportIsLoading,
  userIdSort,
  onChangeUserIdSort,
  showUserIdMenuIcon,
  toggleUserIdMenuIcon,
}) => {
  const columnDefs = [
    {
      headerName: 'User ID',
      field: 'uid',
      minWidth: 250,
      cellRenderer: 'agGroupCellRenderer',
      headerComponent: 'customHeader',
      headerComponentParams: {
        userIdSort,
        onChangeUserIdSort,
        showUserIdMenuIcon,
        toggleUserIdMenuIcon,
      },
    },
    {
      headerName: 'User Name',
      minWidth: 150,
      field: 'usr',
    },
    {
      headerName: 'Level',
      field: 'level',
      cellStyle: params => {
        if (params.value === 'ERROR') {
          return { backgroundColor: '#F8D7DA' };
        }
        if (params.value === 'WARNING') {
          return { backgroundColor: '#FFF3CD' };
        }
        return {};
      },
      filter: true,
      minWidth: 130,
    },
    {
      headerName: 'Task ID',
      field: 'taskID',
      filter: false,
      minWidth: 50,
      valueGetter: params => {
        const msgTaskID = new RegExp('taskID=[0-9]+');
        const matchedTask = params.data?.message?.match(msgTaskID);
        const matchedTaskID = matchedTask && matchedTask[0].split('=')[1];
        return matchedTaskID || '';
      },
    },
    {
      headerName: 'Messages',
      field: 'message',
      filter: false,
      minWidth: 450,
      cellStyle: {
        overflowY: 'auto',
        padding: '5px 0',
        margin: 0,
      },
      cellClass: styles.cellWrapper,
    },
    {
      headerName: 'Connection ID',
      field: 'con',
      minWidth: 200,
    },
    {
      headerName: 'Transasction ID',
      field: 'tr',
      minWidth: 200,
    },
    {
      headerName: 'Date',
      field: 'timestamp',
      minWidth: 270,
      valueGetter: params =>
        params.data
          ? formatDateTime(
              params.data.timestamp,
              'MMM DD, YYYY HH:mm:ss.SSS a z'
            )
          : '',
    },
    {
      headerName: 'Sources',
      field: 'program',
      filter: true,
      minWidth: 180,
    },
    {
      headerName: 'Env',
      field: 'inv_subcluster',
      filter: true,
      minWidth: 180,
    },
    {
      headerName: 'Method',
      field: 'method',
      filter: true,
      minWidth: 120,
    },
    {
      headerName: 'Status Code',
      field: 'statusCode',
      filter: true,
      minWidth: 140,
    },
    {
      headerName: 'Path',
      field: 'path',
      filter: true,
      minWidth: 300,
      cellStyle: {
        overflowY: 'auto',
      },
    },
    {
      headerName: 'Query',
      field: 'query_string',
      filter: true,
      minWidth: 400,
      cellStyle: {
        overflowY: 'auto',
      },
    },
    {
      headerName: 'Client',
      field: 'client',
      minWidth: 250,
      cellStyle: {
        overflowY: 'auto',
      },
    },
    {
      headerName: 'Uno ID',
      field: 'uno_id',
      filter: true,
      minWidth: 200,
    },
    {
      headerName: 'Stack Trace',
      field: 'stacktrace',
      valueFormatter: params => params.value || 'N/A',
      minWidth: 200,
      cellStyle: {
        overflowY: 'auto',
      },
    },
    {
      headerName: 'Traceback First Line',
      field: 'traceback_first_line',
      minWidth: 200,
      valueFormatter: params => params.value || 'N/A',
    },
    {
      headerName: 'Traceback Last Line',
      field: 'traceback_last_line',
      minWidth: 200,
      valueFormatter: params => params.value || 'N/A',
    },
    {
      headerName: 'Adjacent Messages',
      field: 'othermessages',
      suppressMovable: true,
      filter: false,
      minWidth: 180,
      cellRenderer: 'otherMessageRenderer',
      cellRendererParams: { onExpand: onClickExpand },
    },
  ];

  return (
    <>
      <ExportLoading exportIsLoading={exportIsLoading} />
      <AsyncAGGrid
        key={refreshKey}
        columnDefs={columnDefs}
        onLoadData={onLoadData}
        domLayout="autoHeight"
        gridOptions={{
          defaultColDef: { autoHeight: false },
          masterDetail: true,
          detailCellRenderer: 'rawCellRenderer',
          detailRowHeight: 200,
          suppressContextMenu: true,
          components: {
            customHeader: CustomHeader,
            otherMessageRenderer,
            rawCellRenderer: DetailCellRenderer,
          },
          overlayNoRowsTemplate:
            '<span class="ag-overlay-loading-center">No logs are available</span>',
          rowDataChangeDetectionStrategy: 'IdentityCheck',
          rowGroupPanelShow: 'always',
        }}
        saveColumnStateName="server-logs"
        ActionButtonComponent={Export}
        actionButtonComponentProps={{ onExport }}
      />
    </>
  );
};

AggridPresentational.propTypes = {
  exportIsLoading: PropTypes.bool.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  onClickExpand: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  refreshKey: PropTypes.string,
  userIdSort: PropTypes.string,
  onChangeUserIdSort: PropTypes.func.isRequired,
  showUserIdMenuIcon: PropTypes.bool.isRequired,
  toggleUserIdMenuIcon: PropTypes.func.isRequired,
};

AggridPresentational.defaultProps = {
  refreshKey: undefined,
  userIdSort: null,
};

export default AggridPresentational;
