import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import SectionTitle from 'dw/core/components/SectionTitle';
import UserLink from 'dw/online-configuration/components/UserLink';
import SourceSelect from 'dw/core/components/SourceSelect';

import { COLUMNS } from './constants';
import { FilterTestUsersLogs as FilterTestUsersLogsComponent } from '../FilterTestUsersLogs';
import { renderRoutes } from '../../routes';
import { filterTestUsersLogs } from '../../helpers';

import './presentational.css';

const userLink = params => {
  const { data = {}, group } = params?.node;
  const { userID, username } = data;
  return group ? (
    <span>{params?.value}</span>
  ) : (
    <UserLink userId={userID} userName={username} />
  );
};
const ConnectionLogsStateless = ({
  baseUrl,
  userID,
  changeUserID,
  formatDateTime,
  renderOptionFunc,
  apiCallFunc,
  onLoadData,
}) => {
  const [includeTestUsersEntries, onToggleTestUsersLogs] = useState(false);
  const tableDefinitions = {
    components: {
      userLink,
    },
    columnDefs: [
      ...COLUMNS,
      {
        headerName: 'UpdateTime',
        field: 'updateTime',
        lockPosition: true,
        filter: true,
        sortable: true,
        menuTabs: ['filterMenuTab'],
        valueFormatter: params =>
          // If group row (params.value === undefined),
          // return undefined for value when in UpdateTime column
          // so date only shows for grouping and not also in
          // UpdateTime column
          params.value !== undefined
            ? formatDateTime(params.value).toString()
            : undefined,
        cellRendererParams: {
          suppressCount: true,
        },
      },
    ],
  };

  const renderTable = () => (
    <div className="scrollable-content">
      <AsyncAGGrid
        key={`updateTable_${includeTestUsersEntries}_${userID}`}
        columnDefs={tableDefinitions.columnDefs}
        onLoadData={(nextPageToken, params) =>
          onLoadData({
            successCallback: (data, nextPageTokenCallback) => {
              const newData = filterTestUsersLogs(
                data,
                includeTestUsersEntries
              );
              params.successCallback(newData, nextPageTokenCallback);
            },
            failCallback: params.failCallback,
            nextPageToken,
          })
        }
        gridOptions={{
          components: tableDefinitions.components,
          autoGroupColumnDef: {
            cellRendererParams: {
              suppressCount: true,
            },
          },
          alignRowCenter: true,
          rowGroupPanelShow: 'always',
          suppressScrollOnNewData: true,
        }}
      />
    </div>
  );

  return (
    <>
      <SectionTitle
        small
        extraContent={
          <div className="user-id-options">
            <SourceSelect
              size="large"
              placeholder="search for a UserID or Username"
              defaultValue={userID}
              onSelect={newValue => changeUserID(newValue)}
              renderOption={renderOptionFunc}
              apiCall={apiCallFunc}
            />
            <FilterTestUsersLogsComponent
              includeTestUsersEntries={includeTestUsersEntries}
              onToggleTestUsersLogs={() =>
                onToggleTestUsersLogs(prevVal => !prevVal)
              }
            />
          </div>
        }
      />
      {renderRoutes(baseUrl, 'by-user')}
      {renderTable()}
    </>
  );
};

ConnectionLogsStateless.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  userID: PropTypes.string,
  renderOptionFunc: PropTypes.func.isRequired,
  apiCallFunc: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  changeUserID: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

ConnectionLogsStateless.defaultProps = {
  userID: null,
};

export default ConnectionLogsStateless;
