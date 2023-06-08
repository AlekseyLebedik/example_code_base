import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import {
  SECURITY_ADD_WHITELIST,
  SECURITY_DELETE_WHITELIST,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';

import { useCurrentEnvPermission } from 'dw/core/hooks';
import SectionTitle from 'dw/core/components/SectionTitle';
import Search from 'dw/core/components/Search';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import AGGrid from 'dw/core/components/AGGrid';

import AddIPControlModal from './components/AddIPControlModal';
import CreateSelectGroup from './components/CreateSelectGroup';
import PropagateAction from './components/PropagateAction';
import RenameIPGroup from './components/RenameIPGroup';
import styles from './presentational.module.css';
import { COLUMNS } from './constants';

const getRowId = ({ data }) => {
  return data?.ipAddr || data?.userId || data?.gamerTag || data?.consoleId;
};

const GroupCustomHeader = props => {
  const [allRowsExpanded, setAllRowsExpanded] = useState(false);
  const [sortState, setSortState] = useState('asc');
  const menuRef = useRef(null);

  const onMenuClicked = useCallback(() => {
    props.showColumnMenu(menuRef.current);
  }, [menuRef, props.showColumnMenu]);

  const onSortChanged = () => {
    let currState = null;
    if (props.column.isSortAscending()) {
      currState = 'asc';
    } else if (props.column.isSortDescending()) {
      currState = 'desc';
    }
    setSortState(currState);
  };

  const onSortRequested = (order, event) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
  }, [sortState]);

  const expandAllRows = useCallback(() => {
    setAllRowsExpanded(prevValue => !prevValue);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    allRowsExpanded ? props.api.collapseAll() : props.api.expandAll();
  }, [allRowsExpanded]);

  return (
    <div className={styles.groupColumnHeader}>
      <div className={styles.groupColumnHeaderLeft}>
        <div className={styles.expandIcon}>
          <Icon onClick={expandAllRows}>
            {allRowsExpanded ? 'expand_less' : 'expand_more'}
          </Icon>
        </div>
        <div>{props.displayName}</div>
        {props.enableSorting ? (
          <div className={styles.sortIcon}>
            {sortState === null && (
              <div onClick={event => onSortRequested('asc', event)}>
                <Icon>sort</Icon>
              </div>
            )}
            {sortState === 'asc' && (
              <div onClick={event => onSortRequested('desc', event)}>
                <Icon>arrow_downward</Icon>
              </div>
            )}
            {sortState === 'desc' && (
              <div onClick={event => onSortRequested(null, event)}>
                <Icon>arrow_upward</Icon>
              </div>
            )}
          </div>
        ) : null}
      </div>
      {props.enableMenu ? (
        <div
          className={styles.groupColumnHeaderRight}
          onClick={e => e.stopPropagation()}
        >
          <Icon
            ref={menuRef}
            className={styles.userIdMenuIcon}
            onClick={() => onMenuClicked()}
          >
            menu
          </Icon>
        </div>
      ) : null}
    </div>
  );
};
GroupCustomHeader.propTypes = {
  showColumnMenu: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  enableSorting: PropTypes.bool.isRequired,
  enableMenu: PropTypes.bool.isRequired,
  displayName: PropTypes.string.isRequired,
  column: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
};

const IPControlAGGrid = ({
  whitelistItems,
  handleUpdateWhitelistedUserId,
  hasNoteGroupAddPermission,
  hasDeletePermission,
  addIPNote,
  updateIPNote,
  deleteIPNote,
  onDrag,
  onGridReady,
  ipGroups,
  addModalProps,
  onSelectItemOrGroup,
  onUpdateNote,
  nextPageToken,
}) => {
  const [gridApi, setGridApi] = useState();
  const { addIPGroup } = addModalProps;

  useEffect(() => {
    if (!(gridApi && whitelistItems)) return;
    const transaction = { add: [], update: [] };
    whitelistItems.forEach(item => {
      const id = getRowId({ data: item });
      const node = gridApi.getRowNode(id);
      if (!node) transaction.add.push(item);
      else if (!isEqual(item, node.data)) {
        transaction.update.push(item);
      }
    });
    if (transaction.add.length === 0) delete transaction.add;
    if (transaction.update.length === 0) delete transaction.update;
    if (transaction.update)
      setTimeout(() => gridApi.applyTransaction(transaction), 50);
    else {
      gridApi.applyTransaction(transaction);
      const hideOverlay = whitelistItems && !nextPageToken;
      if (!hideOverlay) gridApi.showNoRowsOverlay();
    }
  }, [whitelistItems, gridApi, nextPageToken]);

  return (
    <AGGrid
      rowData={null}
      columnDefs={COLUMNS}
      context={{
        addIPNote,
        updateIPNote,
        deleteIPNote,
        addIPGroup,
        handleUpdateWhitelistedUserId,
        hasNoteGroupAddPermission,
        ipGroups,
        onUpdateNote,
      }}
      onGridReady={params => {
        onGridReady(params);
        setGridApi(params.api);
      }}
      // Select the group ID if it's a group row
      onRowSelected={onSelectItemOrGroup}
      getRowId={getRowId}
      gridOptions={{
        components: {
          customHeader: GroupCustomHeader,
          createSelectGroupEditor: CreateSelectGroup,
          renameIpGroupEditor: RenameIPGroup,
        },
        groupEntireRow: true,
        groupDefaultExpanded: 1,
        enableGroupEdit: true,
        suppressContextMenu: true,
        suppressRowClickSelection: true,
        isRowSelectable: () => hasDeletePermission,
        rowSelection: 'multiple',
        enableCellTextSelection: true,
        getRowStyle: params => {
          if (params.node.group) {
            return { background: '#e6e6e6' };
          }
          return null;
        },
        onRowDragEnd: onDrag,
        defaultColDef: {
          flex: 1,
          minWidth: 250,
          maxWidth: 1000, // to fill space if needed
          sortable: true,
          filter: true,
        },
        alignRowCenter: true,
        autoGroupColumnDef: {
          rowDrag: params => hasNoteGroupAddPermission && !params.node.group,
          flex: 1,
          sortable: true,
          sortingOrder: ['asc', 'desc', null],
          headerName: 'Whitelist Value',
          headerComponent: 'customHeader',
          valueGetter(params) {
            if (params.data?.ipAddr) {
              return params.data.ipAddr;
            }
            if (params.data?.userId) {
              return params.data.userId;
            }
            if (params.data?.gamerTag) {
              return params.data.gamerTag;
            }
            if (params.data?.consoleId) {
              return params.data.consoleId;
            }
            return null;
          },
          minWidth: 350,
          maxWidth: 1000, // to fill space if needed
          cellRenderer: 'agGroupCellRenderer',
          cellRendererParams: { checkbox: true },
        },
      }}
      overlayNoRowsTemplate={
        whitelistItems && whitelistItems.length === 0
          ? undefined
          : `<span class="${styles.overlay}">Please wait while your rows are loading</span>`
      }
    />
  );
};

IPControlAGGrid.propTypes = {
  whitelistItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  addIPNote: PropTypes.func.isRequired,
  updateIPNote: PropTypes.func.isRequired,
  deleteIPNote: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  onSelectItemOrGroup: PropTypes.func.isRequired,
  addModalProps: PropTypes.shape({
    addModalVisible: PropTypes.bool.isRequired,
    openAddModal: PropTypes.func.isRequired,
    closeAddModal: PropTypes.func.isRequired,
    addIPGroup: PropTypes.func.isRequired,
    showGroupSelectInModal: PropTypes.bool.isRequired,
    hasNoteGroupAddPermission: PropTypes.func.isRequired,
  }).isRequired,
  ipGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleUpdateWhitelistedUserId: PropTypes.func.isRequired,
  hasNoteGroupAddPermission: PropTypes.bool.isRequired,
  hasDeletePermission: PropTypes.bool.isRequired,
  onUpdateNote: PropTypes.func.isRequired,
  nextPageToken: PropTypes.string,
};

IPControlAGGrid.defaultProps = {
  nextPageToken: undefined,
};

const IPControlStateless = props => {
  const {
    whitelistItems,
    onSearch,
    onGridSearch,
    addModalProps: addModalPropsRaw,
    onDelete,
    selectedItems,
    selectedGroups,
    q,
    onShowAll,
    nextPageToken,
    agGridEnabled,
    ipGroups,
    onAddWhitelist,
  } = props;

  const hasDeletePermission = useCurrentEnvPermission(
    SECURITY_DELETE_WHITELIST
  );
  const hasAddPermission = useCurrentEnvPermission(SECURITY_ADD_WHITELIST);

  const addModalProps = {
    ...addModalPropsRaw,
    hasNoteGroupAddPermission: hasAddPermission,
    showGroupSelectInModal:
      agGridEnabled && addModalPropsRaw.hasNoteGroupAddPermission,
  };

  return (
    <section className={classNames(styles.container, 'flex-rows-container')}>
      <SectionTitle
        extraContent={
          <Search
            placeholder="Search by whitelist value, group, note..."
            initialValue={q}
            onSearch={payload => {
              if (agGridEnabled === true) {
                onGridSearch(payload.q);
              } else {
                onSearch(payload);
              }
              if (nextPageToken) onShowAll(nextPageToken, true);
            }}
            searchOnChange
          />
        }
      >
        {addModalProps.addModalVisible && (
          <AddIPControlModal
            visible={addModalProps.addModalVisible}
            onCancel={addModalProps.closeAddModal}
            onSubmit={onAddWhitelist}
            addIPGroup={addModalProps.addIPGroup}
            ipGroups={ipGroups}
            hasNoteGroupAddPermission={addModalProps.hasNoteGroupAddPermission}
            showGroupSelectInModal={addModalProps.showGroupSelectInModal}
          />
        )}
        {hasAddPermission && (
          <>
            <PropagateAction
              disabled={whitelistItems && whitelistItems.length === 0}
            />
            <Tooltip title="Add Whitelist" placement="bottom">
              <IconButton color="inherit" onClick={addModalProps.openAddModal}>
                <Icon>playlist_add</Icon>
              </IconButton>
            </Tooltip>
          </>
        )}
        {hasDeletePermission && whitelistItems && whitelistItems.length > 0 && (
          <ConfirmActionComponent
            component="IconButton"
            tooltip="Delete Whitelist"
            tooltipPosition="bottom"
            actionTrigger="onClick"
            onClick={onDelete}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg: `Delete the selected whitelist items ${
                selectedGroups.length > 0 ? 'and groups' : ''
              } from the Anticheat Whitelist?${
                selectedGroups.length > 0
                  ? ' Whitelisted items with no group will be shown in the Unassigned Group.'
                  : ''
              }`,
              mainButtonLabel: 'Delete',
              destructive: true,
            }}
            disabled={selectedItems.length === 0}
            color="inherit"
          >
            delete
          </ConfirmActionComponent>
        )}
      </SectionTitle>
      <IPControlAGGrid
        {...props}
        addModalProps={addModalProps}
        hasNoteGroupAddPermission={addModalProps.hasNoteGroupAddPermission}
        hasDeletePermission={hasDeletePermission}
      />
    </section>
  );
};

IPControlStateless.propTypes = {
  whitelistItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearch: PropTypes.func.isRequired,
  onGridSearch: PropTypes.func.isRequired,
  agGridEnabled: PropTypes.bool.isRequired,
  ipGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  addModalProps: PropTypes.shape({
    addModalVisible: PropTypes.bool.isRequired,
    openAddModal: PropTypes.func.isRequired,
    closeAddModal: PropTypes.func.isRequired,
    addIPGroup: PropTypes.func.isRequired,
    showGroupSelectInModal: PropTypes.bool,
    hasNoteGroupAddPermission: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  selectedGroups: PropTypes.arrayOf(PropTypes.number),
  q: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  nextPageToken: PropTypes.string,
  onShowAll: PropTypes.func.isRequired,
  onSelectItemOrGroup: PropTypes.func.isRequired,
  onUpdateNote: PropTypes.func.isRequired,
  onAddWhitelist: PropTypes.func.isRequired,
};

IPControlStateless.defaultProps = {
  selectedItems: [],
  selectedGroups: [],
  q: null,
  nextPageToken: null,
};

export default IPControlStateless;
