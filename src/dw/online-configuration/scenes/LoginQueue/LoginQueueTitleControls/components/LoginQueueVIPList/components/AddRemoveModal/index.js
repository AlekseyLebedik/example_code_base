import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import difference from 'lodash/difference';

import styles from './index.module.css';
import {
  GamerTagCellRenderer,
  DeleteCellRenderer,
} from './components/frameworkComponents';
import HeaderDialogText from './components/headerDialogText';

const AddRemoveModal = ({
  actionMode,
  openDialog,
  handleClose,
  handleSave,
  selectedGamertags,
  toolTipClass,
}) => {
  const [gameTagList, setGameTagList] = useState(selectedGamertags);
  const [isUploadBulk, setIsUploadBulk] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const apiRef = useRef(null);

  const onGridReady = params => {
    apiRef.current = params.api;
  };

  const beautifyGamerTags = (gameTags, splitBy, replacer = '') => {
    return gameTags
      .split(splitBy)
      .map(value => value.trim().replace(replacer, ''))
      .filter(value => value.length > 0)
      .map(value => ({ firstPartyGamertag: value }));
  };

  const fetchAndUpdateGamerTags = value => {
    const gamerTags = beautifyGamerTags(value, ',');
    setGameTagList(prevTags => [...prevTags, ...gamerTags]);
  };

  const COLUMNS = [
    {
      headerName: 'GamerTag',
      field: 'firstPartyGamertag',
      checkboxSelection: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      cellRendererSelector: params =>
        params.node.rowPinned === 'top' &&
        params.node.rowIndex === params.node.rowTop
          ? {
              component: 'gamerTagCellRenderer',
              params: {
                style: { fontSize: '10px' },
                addGamerTags: fetchAndUpdateGamerTags,
                toolTipClass,
              },
            }
          : undefined,
      minWidth: 830,
      colSpan: params =>
        params.node.rowPinned === 'top' &&
        params.node.rowIndex === params.node.rowTop
          ? 2
          : 1,
      suppressKeyboardEvent: params =>
        params.node.rowPinned === 'top' &&
        params.node.rowIndex === params.node.rowTop,
    },
    {
      cellRenderer: 'deleteColumnFormatter',
      cellRendererParams: {
        deleteGamerTag: () => {
          const selectedRowData = apiRef.current.getSelectedRows();
          setGameTagList(prevTags => difference(prevTags, selectedRowData));
        },
        toolTipClass,
      },
      headerName: '',
      suppressMenu: true,
      suppressSizeToFit: true,
      maxWidth: 80,
    },
  ];

  const deleteAllGamerTags = () =>
    isUploadBulk ? setInputValue('') : setGameTagList([]);

  const onSave = () => {
    const gamerTags = isUploadBulk
      ? beautifyGamerTags(inputValue, '\n', ',')
      : gameTagList;
    handleSave(gamerTags.map(value => value.firstPartyGamertag));
  };

  const onUploadBulk = () => {
    setIsUploadBulk(prevValue => !prevValue);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        id="alert-dialog-title"
        className={styles.loginQueueDialogTitle}
      >
        {actionMode === 'add' ? 'Add' : 'Remove'} GamerTags{' '}
        {actionMode === 'add' ? 'to' : 'from'} VIP List
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          component="div"
          className={styles.loginQueueDialogContent}
        >
          <HeaderDialogText
            actionMode={actionMode}
            onDeleteAll={deleteAllGamerTags}
            onToggle={onUploadBulk}
            isUploadBulk={isUploadBulk}
            toolTipClass={toolTipClass}
          />
          {isUploadBulk ? (
            <div className={styles.loginQueueTextAreaContainer}>
              <textarea
                value={inputValue}
                className={styles.loginQueueTextArea}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Add gamertags, one per line"
              />
            </div>
          ) : (
            <div className={`ag-theme-alpine ${styles.table}`}>
              <AgGridReact
                autoSizeColumns={false}
                autoSizeMaxWidth={2500}
                columnDefs={COLUMNS}
                onGridReady={onGridReady}
                pinnedTopRowData={[{ firstPartyGamertag: '' }]}
                headerHeight={45}
                rowHeight={45}
                rowData={gameTagList}
                rowSelection="multiple"
                components={{
                  gamerTagCellRenderer: GamerTagCellRenderer,
                  deleteColumnFormatter: DeleteCellRenderer,
                }}
              />
            </div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={styles.loginQueueDialogBtn}>
          CANCEL
        </Button>
        <Button
          onClick={onSave}
          color="primary"
          autoFocus
          disabled={isUploadBulk ? inputValue === '' : gameTagList.length <= 0}
        >
          {actionMode === 'add' ? 'ADD' : 'REMOVE'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddRemoveModal.propTypes = {
  actionMode: PropTypes.string,
  openDialog: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  selectedGamertags: PropTypes.array,
  toolTipClass: PropTypes.string,
};

AddRemoveModal.defaultProps = {
  actionMode: 'add',
  selectedGamertags: [],
  toolTipClass: '',
};

export default AddRemoveModal;
