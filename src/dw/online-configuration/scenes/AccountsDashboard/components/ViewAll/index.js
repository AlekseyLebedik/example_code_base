import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import sortBy from 'lodash/sortBy';

import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import Empty from 'dw/core/components/Empty';
import Search from 'dw/core/components/Search';

import viewAllStyles from './index.module.css';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    color: theme.palette.grey[500],
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Icon>close</Icon>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const ViewAll = ({
  classes,
  customViewAllClass,
  data,
  hasAddlData,
  keySize,
  onClose,
  selectedRowValue,
  sortDataByDate,
  subheader,
  rowClickAction,
  title,
  ViewAllBoxAddlDetailsComponent,
}) => {
  const [firstRow] = data;
  const valueSize = (12 - keySize) / (firstRow.length - 1);
  const sizes = firstRow.map((i, idx) => (idx === 0 ? keySize : valueSize));
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [sortedData, setData] = useState(
    sortDataByDate ? data : sortBy(data, item => item[0])
  );

  const filterData = ({ q }, items) => {
    const filteredItems = items.filter(item =>
      String(item).toLowerCase().includes(q.toLowerCase())
    );
    return setData(
      sortDataByDate ? filteredItems : sortBy(filteredItems, item => item[0])
    );
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      classes={{
        paper: customViewAllClass || viewAllStyles.viewAllDialogContainer,
      }}
      fullScreen={fullScreen}
      onClose={onClose}
      open
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <Search
          className={classes.viewAllSearchBar}
          onSearch={payload => filterData(payload, data)}
          placeholder="Search"
          searchOnChange
        />
        {sortedData.length > 0 ? (
          <Grid container>
            {subheader.length > 0
              ? subheader.map((item, idx) => (
                  // eslint-disable-next-line
                  <Grid
                    classes={{ root: classes.subheader }}
                    item
                    // eslint-disable-next-line
                    key={`${subheader[0]}-${idx}`}
                    xs={sizes[idx]}
                  >
                    {item && item.toLocaleString()}
                  </Grid>
                ))
              : null}
            {sortedData.map(row => (
              <>
                {row.map((item, idx) => (
                  // eslint-disable-next-line
                  <Grid
                    className={classNames(
                      hasAddlData && row[0] === selectedRowValue
                        ? classes.selectedRow
                        : null,
                      hasAddlData ? classes.viewAllRow : null,
                      idx > 0 ? classes.rightAlignedColumn : null
                    )}
                    item
                    // eslint-disable-next-line
                    key={`viewAll/${row[0]}-${idx}`}
                    onClick={() => rowClickAction(row[0])}
                    xs={sizes[idx]}
                  >
                    {item && item.toLocaleString()}
                  </Grid>
                ))}
                {ViewAllBoxAddlDetailsComponent &&
                row.includes(selectedRowValue) ? (
                  <ViewAllBoxAddlDetailsComponent />
                ) : null}
              </>
            ))}
          </Grid>
        ) : (
          <Empty>No data match your search</Empty>
        )}
      </DialogContent>
    </Dialog>
  );
};

ViewAll.propTypes = {
  classes: PropTypes.object,
  customViewAllClass: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ).isRequired,
  hasAddlData: PropTypes.bool,
  keySize: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  selectedRowValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sortDataByDate: PropTypes.bool,
  subheader: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  rowClickAction: PropTypes.func,
  ViewAllBoxAddlDetailsComponent: PropTypes.func,
};

ViewAll.defaultProps = {
  classes: {},
  customViewAllClass: null,
  hasAddlData: null,
  keySize: 8,
  selectedRowValue: null,
  sortDataByDate: false,
  subheader: [],
  rowClickAction: null,
  ViewAllBoxAddlDetailsComponent: null,
};

export default ViewAll;
