import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { AsyncAGGrid } from 'dw/core/components/AGGrid';

const useStyles = makeStyles(() => ({
  dialogContainer: {
    height: '100%',
    maxWidth: 'none',
    width: '100%',
  },
  dialogContentRoot: {
    overflow: 'hidden',
    paddingTop: '10px !important',
  },
  partialSearchContainer: {
    display: 'flex',
    paddingLeft: '10px',
    marginBottom: '5px',
  },
  partialSearch: {
    margin: '0px',
    width: '90%',
    height: '42px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
  },
  downloadContainer: {
    paddingLeft: '10px',
  },
  gridContainer: {
    overflow: 'hidden',
    height: '90%',
  },
  closeIcon: {
    position: 'absolute',
    right: '5px',
    top: '3px',
    cursor: 'pointer',
  },
}));

const UsernameTableModal = ({ handleClose, providers, loadOptions }) => {
  const classes = useStyles();
  const [gridApi, setGridApi] = useState();

  const columnDefs = useMemo(() => {
    const result = [
      {
        field: 'id',
        headerName: 'ID',
        minWidth: 200,
      },
    ];
    providers.forEach(({ value, label }) =>
      result.push({ field: value, headerName: label, minWidth: 200 })
    );
    return result;
  }, [providers]);

  const formatAccounts = useCallback(
    data =>
      data.map(({ umbrellaID, accounts }) => {
        const result = {
          id: umbrellaID,
        };
        providers.forEach(({ value }) => {
          const providerAccount = accounts.find(
            account => account.provider === value
          );
          result[value] = providerAccount ? providerAccount.username : 'N/A';
        });
        return result;
      }),
    [providers]
  );
  const onGridReady = useCallback(({ api }) => {
    setGridApi(api);
  }, []);

  const onFilterChange = useCallback(
    value => {
      gridApi.setQuickFilter(value);
    },
    [gridApi]
  );

  const onDownloadCsv = useCallback(() => {
    gridApi.exportDataAsCsv({ fileName: 'username_table.csv' });
  }, [gridApi]);

  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      classes={{ paper: classes.dialogContainer }}
    >
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <div className={classes.closeIcon}>
          <Icon onClick={handleClose}>close</Icon>
        </div>
        <div className={classes.partialSearchContainer}>
          <TextField
            onChange={e => onFilterChange(e.target.value)}
            label="Search ..."
            className={classes.partialSearch}
            InputProps={{ disableUnderline: true }}
          />
          <div className={classes.downloadContainer}>
            <Tooltip title="Download Usernames">
              <IconButton onClick={onDownloadCsv}>
                <Icon>file_download</Icon>
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={classes.gridContainer}>
          <AsyncAGGrid
            columnDefs={columnDefs}
            autoSizeColumns={false}
            onGridReady={onGridReady}
            gridOptions={{
              enableCellTextSelection: true,
              suppressContextMenu: true,
              suppressRowClickSelection: true,
              suppressCellFocus: true,
            }}
            useQuickFilter={false}
            onLoadData={(nextPageToken, params) =>
              loadOptions.onSearch({
                params: {
                  ...params,
                  successCallback(data, next) {
                    const formatedData = formatAccounts(data);
                    params.successCallback(formatedData, next);
                  },
                },
                nextPageToken,
                q: loadOptions.q,
              })
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
UsernameTableModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  loadOptions: PropTypes.object.isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const UsernameTableButton = ({ providers, loadOptions }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Tooltip title="View username table">
        <IconButton onClick={() => setOpen(true)}>
          <Icon>grid_on</Icon>
        </IconButton>
      </Tooltip>
      {open ? (
        <UsernameTableModal
          handleClose={() => setOpen(false)}
          providers={providers}
          loadOptions={loadOptions}
        />
      ) : null}
    </>
  );
};
UsernameTableButton.propTypes = {
  loadOptions: PropTypes.object.isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UsernameTableButton;
