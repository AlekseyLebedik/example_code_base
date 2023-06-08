import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { allowDetachedEventsSelector } from 'playpants/components/App/selectors';
import ActivityTitle from '../ActivityTitle';
import DefaultDetails from '../DefaultDetails';
import { actionsRenderer } from './cellRenderers';

import styles from './index.module.css';

const ClientCommandDetails = ({ onUpdate, selectedActivity }) => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const allowDetachedEvents = useSelector(allowDetachedEventsSelector);

  const initRowData = () => {
    const commands =
      selectedActivity.activity.commands &&
      selectedActivity.activity.commands.map(command => ({ command }));
    setRowData(commands);
    if (gridApi) gridApi.redrawRows();
  };

  useEffect(() => {
    initRowData();
  }, [selectedActivity.activity]);

  const onGridReady = ({ api }) => setGridApi(api);

  const addRow = () => {
    rowData.push({ command: '' });
    setRowData(rowData);
    gridApi.setRowData(rowData);
    gridApi.forEachNode(node => {
      if (node.lastChild) {
        gridApi.startEditingCell({
          rowIndex: node.rowIndex,
          colKey: 'command',
        });
      }
    });
    gridApi.startEditingCell();
  };

  const removeRow = command => {
    const commands = selectedActivity.activity.commands.filter(
      c => c !== command
    );
    onUpdate({ ...selectedActivity, activity: { commands } });
  };

  const saveCellEdit = event => {
    const savedCommand = selectedActivity.activity.commands[event.rowIndex];
    // command removed
    if (!event.value && savedCommand) {
      removeRow(savedCommand);
    }
    // changes detected
    if (event.value && (!savedCommand || event.value !== savedCommand)) {
      const commands = Object.values(rowData)
        .filter(row => row.command)
        .map(row => row.command);
      onUpdate({ ...selectedActivity, activity: { commands } });
    }
  };

  return allowDetachedEvents ? (
    <div className={styles.clientCommandTable}>
      <ActivityTitle />
      <AgGridReact
        columnDefs={[
          {
            field: 'command',
            headerName: 'Commands',
            editable: true,
            sortable: true,
            flex: 1,
          },
          {
            headerName: 'Actions',
            field: 'Actions',
            minWidth: 90,
            width: 90,
            suppressMenu: true,
            cellRenderer: 'actionsRenderer',
            pinned: 'right',
          },
        ]}
        context={{ onDelete: removeRow }}
        rowData={rowData}
        onGridReady={onGridReady}
        singleClickEdit
        stopEditingWhenGridLosesFocus
        onCellEditingStopped={saveCellEdit}
        components={{ actionsRenderer }}
      />
      <Button
        className={styles.addRowBtn}
        endIcon={<Icon>add</Icon>}
        fullWidth
        onClick={addRow}
      >
        Add Row
      </Button>
    </div>
  ) : (
    <DefaultDetails
      key={selectedActivity.id}
      selectedActivity={selectedActivity}
    />
  );
};

ClientCommandDetails.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
};

export default ClientCommandDetails;
