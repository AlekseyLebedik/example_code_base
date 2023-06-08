import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const explainerType = ['Subject', 'Predicate', 'Object'];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            <Icon>{open ? 'expand_less' : 'expand_more'}</Icon>
          </IconButton>
        </TableCell>
        <TableCell>
          <b>{row[0]?.name}</b> has relation <b>{row[1]}</b> as a member of{' '}
          <b>{row[2]?.name}</b>
        </TableCell>
        <TableCell component="th" scope="row">
          <Icon style={{ color: green[500] }}>check</Icon>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                In Detailed Relation
              </Typography>
              {explainerType.map((value, key) => (
                <TableRow>
                  <TableCell variant="head">{value}</TableCell>
                  <TableCell>{JSON.stringify(row[key])}</TableCell>
                </TableRow>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function CollapsibleTable({ explainerData }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {explainerData.map(row => (
            <Row row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  explainerData: PropTypes.array.isRequired,
};
