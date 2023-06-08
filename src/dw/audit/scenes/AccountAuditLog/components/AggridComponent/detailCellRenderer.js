import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  table: {
    margin: '30px 0 0 3%',
    width: '94%',
    border: '1px solid rgba(224, 224, 224, 1)',
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
  },
  tableHead: {
    backgroundColor: '#EFEFEF',
    borderBottom: '2px solid rgb(224, 224, 224)',
  },
  rowHead: {
    '& .MuiTableCell-root': {
      paddingTop: theme.spacing(2),
    },
  },
  rowTail: {
    '& .MuiTableCell-root': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const DetailCellRenderer = params => {
  const classes = useStyles();
  return (
    <Table className={classes.table}>
      <TableHead className={classes.tableHead}>
        <TableRow key="header_row">
          <TableCell colSpan={2}>Contact</TableCell>
          <TableCell colSpan={2}>Validation</TableCell>
          <TableCell colSpan={2}>Player Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className={classes.rowHead} key="personal_detail_row">
          <TableCell>Email Unhashed</TableCell>
          <TableCell>{params.data.email_unhashed}</TableCell>
          <TableCell>Email Verified</TableCell>
          <TableCell>{params?.data?.email_verified?.toString()}</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>{params.data.age_in_years}</TableCell>
        </TableRow>
        <TableRow key="family_detail_row">
          <TableCell>Parent Email Unhashed</TableCell>
          <TableCell>{params.data.parent_email_unhashed}</TableCell>
          <TableCell>Parent Email Verified</TableCell>
          <TableCell>
            {params?.data?.parent_email_verified?.toString()}
          </TableCell>
          <TableCell>Is Child</TableCell>
          <TableCell>{params.data.is_child}</TableCell>
        </TableRow>
        <TableRow key="address_detail_row">
          <TableCell>Phone Unhashed</TableCell>
          <TableCell>{params.data.phone_unhashed}</TableCell>
          <TableCell>TFA</TableCell>
          <TableCell>{params?.data?.tfa_status?.toString()}</TableCell>
          <TableCell>State</TableCell>
          <TableCell>{params.data.state}</TableCell>
        </TableRow>
        <TableRow className={classes.rowTail} key="contact_detail_row">
          <TableCell>Mobile Phone Unhashed</TableCell>
          <TableCell>{params.data.mobile_unhashed}</TableCell>
          <TableCell />
          <TableCell />
          <TableCell>Country</TableCell>
          <TableCell>{params.data.country}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DetailCellRenderer;
