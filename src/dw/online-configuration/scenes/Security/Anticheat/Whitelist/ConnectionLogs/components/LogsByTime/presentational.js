import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';

import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import ContrastInput from 'dw/core/components/FormFields/ContrastInput';
import SelectField from 'dw/core/components/Select';
import UserLink from 'dw/online-configuration/components/UserLink';
import { YesNoFromBool } from 'dw/core/helpers/api-data-parser';
import DateTimePicker from 'dw/core/components/DateTimePicker';
import SectionTitle from 'dw/core/components/SectionTitle';
import { comparatorFilter } from 'dw/core/helpers/aggrid';

import { COLUMNS } from './constants';
import { FilterTestUsersLogs as FilterTestUsersLogsComponent } from '../FilterTestUsersLogs';
import { renderRoutes } from '../../routes';
import { filterTestUsersLogs } from '../../helpers';

import styles from './presentational.module.css';

const yesNoComp = ({ value }) =>
  value !== undefined ? (
    <div>{YesNoFromBool(parseInt(value, 10))}</div>
  ) : (
    <div />
  );

const userLinkCell = params => {
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
  ascending,
  updateTime,
  dateTo,
  handleChange,
  onLoadData,
  formatDateTime,
}) => {
  const [includeTestUsersEntries, onToggleTestUsersLogs] = useState(false);
  const [isReplay, setIsReplay] = useState(false);

  const datetimeRender = ({ value }) =>
    value !== undefined ? <div>{formatDateTime(value)}</div> : <div />;

  const gridOptions = {
    autoGroupColumnDef: {
      cellRendererParams: {
        suppressCount: true,
      },
    },
    components: {
      userLink: userLinkCell,
      yesNoRender: yesNoComp,
      datetimeRender,
    },
    defaultColDef: {
      lockPosition: true,
      menuTabs: ['filterMenuTab'],
      filter: true,
    },
    rowGroupPanelShow: 'always',
    suppressScrollOnNewData: true,
  };

  const tableDefinition = {
    onLoadData: (nextPageToken, params) =>
      onLoadData({
        successCallback: (data, nextPageTokenCallback) => {
          const newData = filterTestUsersLogs(data, includeTestUsersEntries);
          params.successCallback(newData, nextPageTokenCallback);
        },
        failCallback: params.failCallback,
        nextPageToken,
      }),
    columnDefs: [
      ...COLUMNS,
      {
        headerName: 'Success',
        field: 'success',
        cellRenderer: 'yesNoRender',
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['contains'],
          textMatcher: (filter, value, filterText) =>
            comparatorFilter(
              filter,
              YesNoFromBool(parseInt(value, 10)),
              filterText.toLowerCase()
            ),
        },
      },
      {
        headerName: 'UpdateTime',
        field: 'updateTime',
        cellRenderer: 'datetimeRender',
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['contains'],
          textMatcher: (filter, value, filterText) =>
            comparatorFilter(
              filter,
              formatDateTime(value).toString(),
              filterText
            ),
        },
        valueFormatter: params =>
          // If group row (params.value === undefined),
          // return undefined for value when in UpdateTime column
          // so date only shows for grouping and not also in
          // UpdateTime column
          params.value !== undefined
            ? formatDateTime(params.value).toString()
            : undefined,
      },
    ],
    processCellForClipboard: params => {
      if (params.column.colDef.cellRenderer === 'datetimeRender') {
        return formatDateTime(params.value);
      }
      if (params.column.colDef.cellRenderer === 'yesNoRender') {
        return params.value ? 'Yes' : 'No';
      }
      return params.value;
    },
  };

  return (
    <>
      <SectionTitle
        small
        extraContent={
          <span className={styles.options}>
            <ContrastInput
              wraps={SelectField}
              className={styles.ascending}
              label="Update Time"
              value={ascending.toString()}
              onChange={e => handleChange('ascending', e.target.value)}
              InputLabelProps={{ style: { color: '#fff' } }}
            >
              <MenuItem value="false">Up To</MenuItem>
              <MenuItem value="true">Greater</MenuItem>
            </ContrastInput>
            <ContrastInput
              classes={{ root: styles.time }}
              wraps={DateTimePicker}
              autoOk
              dateOnly
              fullWidth={false}
              label="Date from"
              value={updateTime}
              onChange={value => handleChange('updateTime', value)}
              returnTimestamp
            />
            <ContrastInput
              wraps={DateTimePicker}
              autoOk
              dateOnly
              fullWidth={false}
              label="Date to"
              value={dateTo}
              onChange={value => handleChange('dateTo', value)}
              returnTimestamp
              minDate={updateTime || 'now'}
              clearable
            />
            <Tooltip title="Reload" placement="bottom">
              <IconButton
                color="inherit"
                onClick={() => setIsReplay(preValue => !preValue)}
              >
                <Icon>replay</Icon>
              </IconButton>
            </Tooltip>
            <FilterTestUsersLogsComponent
              includeTestUsersEntries={includeTestUsersEntries}
              onToggleTestUsersLogs={() =>
                onToggleTestUsersLogs(prevVal => !prevVal)
              }
            />
          </span>
        }
      />
      {renderRoutes(baseUrl, 'by-time')}
      <AsyncAGGrid
        gridOptions={gridOptions}
        {...tableDefinition}
        key={`updateTable_${includeTestUsersEntries}_${isReplay}`}
      />
    </>
  );
};

ConnectionLogsStateless.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  onLoadData: PropTypes.func.isRequired,
  ascending: PropTypes.bool.isRequired,
  updateTime: PropTypes.number.isRequired,
  dateTo: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
};
ConnectionLogsStateless.defaultProps = {
  dateTo: null,
};

export default ConnectionLogsStateless;
