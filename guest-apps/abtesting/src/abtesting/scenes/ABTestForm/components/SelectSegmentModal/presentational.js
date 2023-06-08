import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';
import Dialog from 'dw/core/components/Dialog';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { useABTestingProjectPermission } from 'dw/core/hooks';
import Loading from 'dw/core/components/Loading';
import { hasData } from 'dw/core/helpers/object';
import { ABTESTING_DELETE_ENTITIES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import FeatureSwitchesCheck from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';
import styles from './index.module.css';
import { COLUMNS, DeleteColumnFormatter } from './constants';

const dialogStyles = {
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vw',
    maxWidth: '80vw',
  },
};
export const DeleteSelected = ({ data, onRemove, hasDeletePermission }) =>
  hasDeletePermission && (
    <FeatureSwitchesCheck
      featureSwitches={[fs.ABTESTING_DELETE_SEGMENT]}
      isStaffAllowed={false}
    >
      <div className={styles.deleteContainer}>
        <ConfirmActionComponent
          component="IconButton"
          tooltip="Remove Selected"
          onClick={() => onRemove(data)}
          confirm={{
            title: 'Confirm Remove',
            confirmMsg:
              'Are you sure you want to remove the selected segments"?',
            mainButtonLabel: 'Remove',
            destructive: true,
          }}
          disabled={data.length === 0}
          className={styles.deleteButton}
        >
          delete
        </ConfirmActionComponent>
      </div>
    </FeatureSwitchesCheck>
  );

DeleteSelected.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func.isRequired,
  hasDeletePermission: PropTypes.bool,
};
DeleteSelected.defaultProps = {
  data: [],
  hasDeletePermission: false,
};

const SelectSegmentModalPresentational = props => {
  const {
    visible,
    onCancel,
    onAddRowSelection,
    onFilterTextboxChange,
    segmentsList,
    onSelectionChanged,
    onGridReady,
    classes,
    onRemove,
    selectedRows,
    selectedContext,
  } = props;

  const splitContext = selectedContext.split(':');
  const titleID = hasData(splitContext) ? splitContext[0] : undefined;
  const [loadingPermission, , result] = useABTestingProjectPermission(
    ABTESTING_DELETE_ENTITIES,
    titleID,
    false
  );
  const hasDeletePermission = result?.data?.permission;

  const footerButtons = [
    <Button key="cancel" label="Cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button
      key="update"
      color="primary"
      onClick={onAddRowSelection}
      disabled={selectedRows.length > 1}
    >
      Add
    </Button>,
  ];

  return loadingPermission ? (
    <Loading />
  ) : (
    <Dialog
      title="Select Segment"
      actions={footerButtons}
      classes={{ paper: classes.dialogPaper }}
      contentStyle={{ overflowY: 'hidden' }}
      modal
      open={visible}
      onRequestClose={onCancel}
    >
      <div className={styles.searchContainer}>
        <DeleteSelected
          data={selectedRows}
          hasDeletePermission={hasDeletePermission}
          onRemove={onRemove}
        />
        <TextField
          placeholder="Search Segments"
          className={styles.searchInput}
          onChange={e => onFilterTextboxChange(e.target.value)}
        />
      </div>
      <div className={styles.table}>
        <AgGridReact
          columnDefs={COLUMNS}
          context={{ onRemove, hasDeletePermission }}
          components={{
            deleteColumnFormatter: DeleteColumnFormatter,
          }}
          rowGroupPanelShow="always"
          suppressContextMenu
          groupDisplayType="groupRows"
          defaultColDef={{
            enableRowGroup: true,
          }}
          rowSelection="multiple"
          animateRows
          onGridReady={params => onGridReady(params)}
          statusBar={{
            statusPanels: [
              {
                statusPanel: 'agTotalRowCountComponent',
                align: 'left',
              },
            ],
          }}
          onSelectionChanged={onSelectionChanged}
          rowData={segmentsList}
          suppressDragLeaveHidesColumns
        />
      </div>
    </Dialog>
  );
};

SelectSegmentModalPresentational.propTypes = {
  visible: PropTypes.bool.isRequired,
  segmentsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancel: PropTypes.func.isRequired,
  onAddRowSelection: PropTypes.func.isRequired,
  onFilterTextboxChange: PropTypes.func.isRequired,
  onSelectionChanged: PropTypes.func,
  onGridReady: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  selectedRows: PropTypes.array,
  classes: PropTypes.object.isRequired,
  selectedContext: PropTypes.string.isRequired,
};

SelectSegmentModalPresentational.defaultProps = {
  onSelectionChanged: () => {},
  selectedRows: [],
};

export default withStyles(dialogStyles)(SelectSegmentModalPresentational);
