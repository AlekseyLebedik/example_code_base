import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
  },
  table: {
    '& th, & td': {
      fontSize: 12,
      padding: 4,
    },
  },
  tableBodyHead: {
    '& th': {
      fontWeight: 'bold',
    },
  },
  tableBodyRow: {
    '& th, & td': {
      overflowWrap: 'anywhere',
    },
  },
  toolbar: {
    backgroundColor: 'gainsboro',
    paddingLeft: 3,
    overflow: 'hidden',
    height: 30,
    minHeight: 30,
  },
  selectRoot: {
    marginLeft: 0,
    marginRight: 15,
  },
  select: {
    fontSize: 12,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  actions: {
    marginLeft: 3,
    '& button': {
      padding: 6,
    },
    '& svg': {
      fontSize: 16,
    },
  },
}));

export default function PaginatedTable({
  defaultRows,
  displayPaginator,
  hideHeaders,
  rows,
  titles,
  keys,
}) {
  const classes = useStyles();
  const formatDateTime = useSelector(formatDateTimeSelector);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRows);
  const [page, setPage] = React.useState(0);

  const descDateComparator = useCallback(
    (a, b) => b[[keys[2]]] - a[[keys[2]]],
    [keys]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatData = useCallback(
    data =>
      data
        .slice()
        .sort(descDateComparator)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, descDateComparator]
  );

  return (
    <>
      <Table className={classes.table}>
        {!hideHeaders && (
          <TableHead>
            <TableRow className={classes.tableBodyHead}>
              <TableCell>{titles[0]}</TableCell>
              <TableCell align="center" width="70">
                {titles[1]}
              </TableCell>
              <TableCell align="right" width="170">
                {titles[2]}
              </TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {formatData(rows).map(row => (
            <TableRow key={row.id} className={classes.tableBodyRow}>
              <TableCell component="th" scope="row">
                {row[keys[0]]}
              </TableCell>
              <TableCell align="center" width="70">
                {typeof keys[1] === 'string' ? row[keys[1]] : keys[1](row)}
              </TableCell>
              <TableCell align="right" width="170">
                {formatDateTime(row[[keys[2]]])}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rows.length > defaultRows && displayPaginator && (
        <TablePagination
          classes={{
            toolbar: classes.toolbar,
            selectRoot: classes.selectRoot,
            select: classes.select,
            caption: classes.caption,
            actions: classes.actions,
          }}
          component="div"
          count={rows.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10]}
        />
      )}
    </>
  );
}

PaginatedTable.propTypes = {
  defaultRows: PropTypes.number,
  displayPaginator: PropTypes.bool,
  hideHeaders: PropTypes.bool,
  keys: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  titles: PropTypes.arrayOf(PropTypes.string),
};
PaginatedTable.defaultProps = {
  defaultRows: 5,
  displayPaginator: true,
  hideHeaders: false,
  titles: [],
};
