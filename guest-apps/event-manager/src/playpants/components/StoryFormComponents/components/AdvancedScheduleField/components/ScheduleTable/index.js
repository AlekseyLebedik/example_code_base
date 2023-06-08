import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Radio from '@material-ui/core/Radio';

import { formatDateTime } from 'dw/core/helpers/date-time';
import IconButton from 'dw/core/components/IconButton';
import lodashOrderBy from 'lodash/orderBy';
import { SCHEDULES_TABLE_HEADERS } from '../../constants';

const ScheduleTable = props => {
  const { schedulesData, scheduleValue, onSelect } = props;
  const rowsPerPage = 100;
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);

  const createSortHandler = property => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = schedule => scheduleValue === schedule.id;

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead padding="checkbox">
            <TableRow>
              <TableCell padding="none" />
              {SCHEDULES_TABLE_HEADERS.map(header => (
                <TableCell
                  padding="none"
                  key={header.key}
                  align={header.align}
                  sortDirection={orderBy === header.key ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === header.key}
                    direction={orderBy === header.key ? order : 'asc'}
                    onClick={createSortHandler(header.key)}
                  >
                    {header.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {lodashOrderBy(schedulesData, [orderBy], [order])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(schedule => {
                const isItemSelected = isSelected(schedule);
                const scheduleRowKey = `scheduleRow__${schedule.id}`;
                return (
                  <TableRow
                    hover
                    onClick={() => onSelect(schedule.id)}
                    selected={isItemSelected}
                    key={scheduleRowKey}
                  >
                    <TableCell padding="none">
                      <Radio checked={isItemSelected} />
                    </TableCell>
                    <TableCell component="th" padding="none">
                      {schedule.name}
                    </TableCell>
                    <TableCell padding="none">{schedule.version}</TableCell>
                    <TableCell padding="none">{schedule.filename}</TableCell>
                    <TableCell padding="none">
                      {formatDateTime(schedule.created_at)}
                    </TableCell>
                    <TableCell padding="none">
                      {schedule.created_by ? schedule.created_by.name : '---'}
                    </TableCell>
                    <TableCell padding="none">
                      {schedule.schedule_type}
                    </TableCell>
                    <TableCell padding="none">
                      <IconButton
                        onClick={() => window.open(schedule.schedule_file)}
                        icon="cloud_download"
                        tooltip="Download Schedule"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={schedulesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(event, newPage) => setPage(newPage)}
      />
    </Paper>
  );
};

ScheduleTable.propTypes = {
  schedulesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  scheduleValue: PropTypes.number,
};

ScheduleTable.defaultProps = {
  scheduleValue: undefined,
};

export default ScheduleTable;
