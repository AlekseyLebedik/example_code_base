import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton, Icon } from '@material-ui/core';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import Link from 'dw/core/components/Link';
import getColumnDefinitions from './columnDefinitions';

const downloadRenderer = params => {
  if (params.data) {
    const { onDownload, allObjectsCheck, promotePubGroups } = params.colDef;
    const { contentURL, name, groupID, acl } = params.data;
    return (
      <div>
        <Tooltip title="Download" placement="top">
          <IconButton
            onClick={() => onDownload(name, groupID, contentURL, acl)}
          >
            <Icon>file_download</Icon>
          </IconButton>
        </Tooltip>
        {groupID !== '0' && promotePubGroups ? (
          <ConfirmActionComponent
            tooltip="Release"
            confirm={{
              title: 'Confirm Release',
              confirmMsg: (
                <div key="dialogDiv">
                  Are you sure you want to release? <br />
                  This will replace the current Global object {name}.<br />
                </div>
              ),
              mainButtonLabel: 'Confirm',
              destructive: false,
            }}
            component="IconButton"
            tooltipProps={{ title: 'Release', placement: 'top' }}
            onClick={() => promotePubGroups(groupID, name, allObjectsCheck)}
          >
            call_merge
          </ConfirmActionComponent>
        ) : null}
      </div>
    );
  }
  return '';
};

const groupsRenderer = params => {
  if (params.node.group) {
    return '';
  }
  const result =
    params.data && params.data.groupName !== undefined
      ? params.data.groupName
      : params.data.groupID;
  if (params.data?.groupID !== '0') {
    const { publisherObjectUrl } = params.colDef;
    const { baseLink } = params.colDef.metadata;
    return (
      <Link to={`${publisherObjectUrl}${baseLink}/${params.data.groupID}`}>
        {result}
      </Link>
    );
  }
  return result;
};

const categoryRenderer = params => {
  if (params.data) {
    return params.data.category === null ? 'N/A' : params.data.category;
  }
  return '';
};

const extraRenderer = params => {
  if (params.data) {
    return params.data.extraData === null ? 'N/A' : params.data.extraData;
  }
  return '';
};

const ObjectsTable = ({
  allObjectsCheck,
  formatDateTime,
  isGroupSpecific,
  onSelectionChanged,
  onDownload,
  publisherObjectUrl,
  promotePubGroups,
  hasDeletePermission,
  onGridReady,
  onRowDataUpdated,
  onFilterChanged,
  gridProps,
  onLoadData,
  dataFormatter,
  useQuickFilter,
  dataCy,
}) => {
  const columnDefs = getColumnDefinitions(formatDateTime, isGroupSpecific);
  const components = {
    downloadRenderer,
    categoryRenderer,
    extraRenderer,
    groupsRenderer,
  };
  return (
    <AsyncAGGrid
      onGridReady={onGridReady}
      columnDefs={columnDefs}
      onLoadData={onLoadData}
      dataFormatter={dataFormatter}
      gridOptions={{
        onRowDataUpdated,
        groupRemoveSingleChildren: true,
        getRowStyle: params => {
          if (params.node.group) {
            return { background: '#e6e6e6' };
          }
          return null;
        },
        defaultColDef: {
          autoHeight: false,
          onDownload,
          allObjectsCheck,
          publisherObjectUrl,
          promotePubGroups,
          deleteProps: hasDeletePermission
            ? {
                getKey: k => k.name,
                actions: [
                  {
                    iconName: 'delete',
                    label: 'Delete Selected',
                  },
                ],
                hideActions: true,
              }
            : {},
        },
        groupDefaultExpanded: 1,
        components,
        groupDisplayType: 'custom',
        suppressContextMenu: true,
        onSelectionChanged: params => onSelectionChanged(params),
        suppressMenuHide: false,
        ...gridProps,
        onFilterChanged,
      }}
      useQuickFilter={useQuickFilter}
      dataCy={dataCy}
    />
  );
};

ObjectsTable.propTypes = {
  onDownload: PropTypes.func.isRequired,
  hasDeletePermission: PropTypes.bool.isRequired,
  onSelectionChanged: PropTypes.func,
  onGridReady: PropTypes.func,
  onRowDataUpdated: PropTypes.func,
  onFilterChanged: PropTypes.func,
  formatDateTime: PropTypes.func.isRequired,
  promotePubGroups: PropTypes.func,
  isGroupSpecific: PropTypes.bool,
  publisherObjectUrl: PropTypes.string,
  gridProps: PropTypes.object,
  allObjectsCheck: PropTypes.bool,
  onLoadData: PropTypes.func.isRequired,
  dataFormatter: PropTypes.func,
  useQuickFilter: PropTypes.bool,
  dataCy: PropTypes.string,
};

ObjectsTable.defaultProps = {
  onSelectionChanged: null,
  onGridReady: null,
  onRowDataUpdated() {},
  onFilterChanged: null,
  isGroupSpecific: false,
  promotePubGroups: null,
  publisherObjectUrl: '',
  gridProps: {},
  allObjectsCheck: false,
  dataFormatter: d => d,
  useQuickFilter: false,
  dataCy: undefined,
};

export default ObjectsTable;
