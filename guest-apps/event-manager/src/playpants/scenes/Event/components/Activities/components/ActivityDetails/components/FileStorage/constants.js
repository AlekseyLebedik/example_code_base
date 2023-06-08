import React from 'react';
import IconButton from 'dw/core/components/IconButton';
import DownloadButton from './components/DownloadButton';
import ProgressBar from './components/ProgressBar';
import styles from './index.module.css';

export const columnDefs = (
  onRemoveFile,
  onDownloadFile,
  disabled,
  inProgress
) => [
  {
    field: 'download',
    headerName: '',
    width: 45,
    cellRenderer: DownloadButton,
    onCellClicked: onDownloadFile,
    cellClass: styles.deleteDownloadCells,
    resizable: false,
  },
  {
    field: 'delete',
    headerName: '',
    cellRendererParams: {
      iconProps: {
        style: {
          fontSize: 20,
        },
      },
      icon: 'delete',
      tooltip: 'Delete File',
      color: 'primary',
      disabled: disabled || inProgress,
    },
    width: 45,
    onCellClicked: disabled || inProgress ? null : onRemoveFile,
    cellRenderer: React.forwardRef((params, ref) => (
      <div ref={ref}>
        <IconButton {...params} />
      </div>
    )),
    cellClass: styles.deleteDownloadCells,
    resizable: false,
  },
  {
    field: 'progress',
    headerName: '',
    width: 45,
    cellRenderer: ProgressBar,
    cellClass: styles.deleteDownloadCells,
    resizable: false,
    hide: !inProgress,
  },
  {
    field: 'index',
    hide: true,
    resizable: false,
  },
];

export const defaultColDef = {
  resizable: true,
  editable: false,
  suppressMenu: true,
};
