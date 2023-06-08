import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 5,
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: 0,
  },
  switchLabel: {
    fontSize: 13,
  },
}));

const OptionsToolPanel = ({ api, columnApi }) => {
  const {
    gridOptionsWrapper: {
      gridOptions: {
        suppressKeyboardEvent,
        context: { handleManualGridUpdate },
      },
    },
  } = api;
  const [shortcutsEnabled, setShortcutsEnabled] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setShortcutsEnabled(!suppressKeyboardEvent);
  }, [suppressKeyboardEvent, setShortcutsEnabled]);

  const saveState = () => {
    window.colState = columnApi.getColumnState();
  };

  const restoreState = () => {
    if (!window.colState) return;
    columnApi.setColumnState(window.colState);
  };

  const resetState = () => {
    columnApi.resetColumnState();
  };

  const handleKeyboardShortcuts = ({ target: { checked } }) => {
    setShortcutsEnabled(checked);
    if (checked) {
      const options = {
        //  text selection:
        enableCellTextSelection: false,
        ensureDomOrder: false,
        //  row selection:
        rowMultiSelectWithClick: false,
        suppressRowClickSelection: true,
        //  keyboard events:
        suppressHeaderKeyboardEvent: false,
        suppressKeyboardEvent: false,
      };
      handleManualGridUpdate(options, api);
    } else {
      const options = {
        //  text selection:
        enableCellTextSelection: true,
        ensureDomOrder: true,
        //  row selection:
        rowMultiSelectWithClick: true,
        suppressRowClickSelection: false,
        //  keyboard events:
        suppressHeaderKeyboardEvent: true,
        suppressKeyboardEvent: true,
      };
      handleManualGridUpdate(options, api);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Export Table</Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button
            variant="contained"
            size="small"
            onClick={() => api.exportDataAsExcel({})}
          >
            Excel
          </Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button
            variant="contained"
            size="small"
            onClick={() => api.exportDataAsCsv({})}
          >
            CSV
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Column State</Paper>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup variant="contained" size="small">
            <Tooltip title="Save the current coulmn state">
              <Button onClick={saveState}>Save</Button>
            </Tooltip>
            <Tooltip title="Set columns state back to where it was when you last clicked 'Save'">
              <Button onClick={restoreState}>Restore</Button>
            </Tooltip>
            <Tooltip title="Set state back to what was defined in the Column Definitions">
              <Button onClick={resetState}>Reset</Button>
            </Tooltip>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Cell Meta</Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Switch
                checked={shortcutsEnabled}
                onChange={handleKeyboardShortcuts}
                color="primary"
              />
            }
            classes={{ root: classes.formControl, label: classes.switchLabel }}
            label="Enable Keyboard Shortcuts"
          />
        </Grid>
      </Grid>
    </div>
  );
};
OptionsToolPanel.propTypes = {
  api: PropTypes.object.isRequired,
  columnApi: PropTypes.object.isRequired,
};

export default OptionsToolPanel;
