import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'dw/core/components/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from 'dw/core/components/IconButton';
import Button from '@material-ui/core/Button';
import CustomDrawerDropzone from 'playpants/components/CustomDrawerDropzone';
import AutocompleteScheduleField from './components/AutocompleteScheduleField';
import AutocompleteSchedule from './components/AutocompleteSchedule';
import ScheduleTable from './components/ScheduleTable';

const AdvancedScheduleField = props => {
  const {
    handleOnLoadComplete,
    isDisabled,
    onSetSelectedSchedule,
    schedulesData,
    value,
    isClearable,
    defaultValue,
    options,
    customHandleScheduleChange,
  } = props;
  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [isDrawerDropzoneOpen, setDrawerDropzoneOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(value);
  const handleScheduleChange = () => {
    if (selectedSchedule !== value) {
      if (customHandleScheduleChange) {
        customHandleScheduleChange(selectedSchedule, value, 'schedule');
      } else {
        onSetSelectedSchedule(selectedSchedule);
      }
    }
    setSelectedSchedule(value);
    setAdvancedSearchOpen(false);
  };

  const handleCancel = () => {
    setSelectedSchedule(value);
    setAdvancedSearchOpen(false);
  };

  const actions = [
    <Button onClick={handleCancel} key="cancel">
      Cancel
    </Button>,
    <Button onClick={handleScheduleChange} color="primary" key="select">
      Select
    </Button>,
  ];
  return (
    <>
      <CustomDrawerDropzone
        isOpen={isDrawerDropzoneOpen}
        setOpen={setDrawerDropzoneOpen}
        handleOnLoadComplete={(...params) =>
          handleOnLoadComplete(...params, setSelectedSchedule)
        }
      />
      <Dialog
        disableEnforceFocus
        title="Advanced Schedule Search"
        open={isAdvancedSearchOpen}
        onRequestClose={() => setAdvancedSearchOpen(false)}
        actions={actions}
        maxWidth="lg"
        fullWidth
      >
        <Grid container direction="column">
          <Grid container item direction="row" wrap="nowrap">
            <Grid item xs={12}>
              <AutocompleteSchedule
                defaultValue={defaultValue}
                options={options}
                value={selectedSchedule}
                isClearable={isClearable}
                isDisabled={isDisabled}
                onChange={schedule => setSelectedSchedule(schedule)}
              />
            </Grid>
            <Grid item xs>
              <IconButton
                onClick={() => setDrawerDropzoneOpen(true)}
                tooltip="Upload Schedule"
                icon="cloud_upload"
              />
            </Grid>
          </Grid>
          <Grid item xs>
            <ScheduleTable
              schedulesData={schedulesData}
              scheduleValue={selectedSchedule}
              onSelect={schedule => setSelectedSchedule(schedule)}
            />
          </Grid>
        </Grid>
      </Dialog>
      <AutocompleteScheduleField
        {...props}
        isDisabled={isDisabled}
        onSearch={() => setAdvancedSearchOpen(true)}
      />
    </>
  );
};

AdvancedScheduleField.propTypes = {
  customHandleScheduleChange: PropTypes.func,
  defaultValue: PropTypes.number,
  handleOnLoadComplete: PropTypes.func.isRequired,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSetSelectedSchedule: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  schedulesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.number,
};

AdvancedScheduleField.defaultProps = {
  customHandleScheduleChange: undefined,
  defaultValue: undefined,
  isClearable: true,
  isDisabled: false,
  onChange: undefined,
  value: undefined,
};

export default AdvancedScheduleField;
