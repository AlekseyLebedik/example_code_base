import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { NO_TITLE_SELECTED } from 'playpants/scenes/Event/components/Activities/constants';
import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import ActivityTitle from '../ActivityTitle';
import localStyles from './index.module.css';
import { defaultColDef } from './constants';
import UploadFile from './components/UploadFile';

const TableGrid = props => {
  const {
    agGridProps,
    columnDefs,
    getCollection,
    onGridReady,
    resizeGrid,
    selectedActivity,
    uploadDisabled,
  } = props;
  return (
    <div className={classNames('ag-theme-material', localStyles.agGridLayout)}>
      <AgGridReact
        columnDefs={columnDefs}
        overlayNoRowsTemplate={
          selectedActivity.title_envs.length > 0
            ? agGridProps.noRowsUnlocked
            : agGridProps.noRowsLocked
        }
        defaultColDef={defaultColDef}
        rowData={getCollection()}
        onGridReady={onGridReady}
        suppressClickEdit={uploadDisabled}
        onGridSizeChanged={resizeGrid}
        suppressCellFocus
        suppressRowClickSelection
        singleClickEdit
      />
    </div>
  );
};

TableGrid.propTypes = {
  agGridProps: PropTypes.object.isRequired,
  columnDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCollection: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  resizeGrid: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  uploadDisabled: PropTypes.bool.isRequired,
};

const FileStorageStateless = props => (
  <>
    <ActivityTitle customComponent={<UploadFile type="button" {...props} />} />
    {props.noTitleSelected ? (
      <MainDetailsEmpty msg={NO_TITLE_SELECTED} />
    ) : (
      <div className={props.classes.activityContainer}>
        <div className={localStyles.gridContainer}>
          <UploadFile
            {...props}
            type="dropzone"
            customComponent={<TableGrid {...props} />}
          />
        </div>
      </div>
    )}
  </>
);

FileStorageStateless.propTypes = {
  classes: PropTypes.object.isRequired,
  noTitleSelected: PropTypes.bool.isRequired,
};

export default FileStorageStateless;
