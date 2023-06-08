import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { TwitterPicker } from 'react-color';
import DateTimePicker from 'dw/core/components/DateTimePickerV2/LocalizedFormFieldDateTimePicker';
import IconButton from 'dw/core/components/IconButton';
import SelectField from 'dw/core/components/Select';
import ModalWrapper from 'playpants/components/ModalWrapper';
import EventDetailHeader from 'playpants/components/EventSummaryDialog/components/EventDetailHeader';
import EventDetailItem from 'playpants/components/EventSummaryDialog/components/EventDetailItem';
import EventItemChips from 'playpants/components/EventSummaryDialog/components/EventItemChips';
import Duration from 'playpants/components/FormFields/Duration';
import { TYPE_OPTIONS } from 'playpants/components/GamertagManagement/components/TimewarpSettingsFormFields/constants';
import {
  formatDateTime,
  printDurationFromSeconds,
} from 'playpants/helpers/dateTime';

import eventSummaryStyles from 'playpants/components/EventSummaryDialog/styles';

import styles from './index.module.css';

const StatelessGamertagSummaryDialog = ({
  baseModalId,
  baseUrl,
  classes,
  displayColorPicker,
  editMode,
  handleCancel,
  handleClose,
  handleSave,
  handleSetDuration,
  handleSetGroupColor,
  handleSetStartTime,
  handleSetType,
  isOffset,
  selectedGamertagGroup: {
    description,
    id: groupId,
    name,
    player_accounts: accounts,
  },
  setDisplayColorPicker,
  setEditMode,
  timewarpState: { color, duration, startTime, timeDelta, type },
  userTimezone,
}) => {
  const timewarpSettingWrapper = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (timewarpSettingWrapper.current) {
        if (!timewarpSettingWrapper.current.contains(event.target)) {
          setDisplayColorPicker(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [timewarpSettingWrapper]);

  // eslint-disable-next-line react/prop-types
  const EditIconWrapper = ({ children, hidden }) => (
    <span className={styles.editIconWrapper}>
      {children}
      {!hidden && (
        <IconButton
          tooltip="Edit"
          className={styles.editIcon}
          size="small"
          icon="edit"
          onClick={() => setEditMode(true)}
        />
      )}
    </span>
  );

  const handleGroupColorClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const renderTitle = () => (
    <EventDetailHeader
      avatarClassName={classNames(classes.eventSummaryTitleIcon)}
      className={classes.eventSummaryTitleContainer}
      gamerTagProps={{
        color,
        onClick: handleGroupColorClick,
        displayColorPicker,
      }}
      primary={name}
      secondary={description}
    />
  );

  const renderTimewarpColorSetting = () => (
    <div ref={timewarpSettingWrapper} className={styles.colorPickerContainer}>
      <TwitterPicker
        label="Group Color"
        color={color}
        onChangeComplete={value => handleSetGroupColor(value.hex)}
        className={styles.colorPicker}
      />
    </div>
  );

  const renderAccountsCount = () => {
    const activeAccounts = accounts.filter(a => a.active);
    return (
      <>
        <EventDetailItem
          icon="how_to_reg"
          primary="Active Accounts"
          secondary={!activeAccounts.length ? 'N/A' : ''}
        />
        <EventDetailItem
          isHidden={isEmpty(accounts)}
          primary={
            <EventItemChips
              classes={classes}
              uniqItems={activeAccounts.map(a => a.username)}
            />
          }
        />
      </>
    );
  };

  const renderTimewarpType = () => (
    <EventDetailItem
      icon="hourglass_empty"
      primary="Timewarp Type"
      secondary={
        !editMode ? (
          <EditIconWrapper>{type}</EditIconWrapper>
        ) : (
          <SelectField
            fullWidth
            label="Type"
            options={TYPE_OPTIONS}
            onChange={handleSetType}
            value={type}
          />
        )
      }
    />
  );

  const renderTimeDelta = () => (
    <EventDetailItem
      icon="update"
      primary="Time Delta"
      secondary={
        !editMode ? (
          <EditIconWrapper>
            {printDurationFromSeconds(timeDelta)}
          </EditIconWrapper>
        ) : (
          <Duration
            duration={duration}
            handleChange={handleSetDuration}
            useRedux={false}
          />
        )
      }
    />
  );

  const renderStartTime = () => (
    <EventDetailItem
      icon="schedule"
      primary="Time Warped To"
      secondary={
        !editMode ? (
          <EditIconWrapper>
            {startTime && formatDateTime(startTime, undefined, userTimezone)}
          </EditIconWrapper>
        ) : (
          <DateTimePicker
            className={styles.dateTimePicker}
            input={{
              clearable: isOffset,
              fullWidth: true,
              label: 'Date',
              onChange: handleSetStartTime,
              returnTimestamp: true,
              value: startTime,
            }}
          />
        )
      }
    />
  );

  const renderDialogContent = () => (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {renderTitle()}
        {displayColorPicker && renderTimewarpColorSetting()}
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.eventSummaryDivider} variant="middle" />
      </Grid>
      <Grid item xs={12}>
        {renderAccountsCount()}
      </Grid>
      <Grid item xs={12}>
        {renderTimewarpType()}
      </Grid>
      {isOffset && (
        <Grid item xs={12}>
          {renderTimeDelta()}
        </Grid>
      )}
      <Grid item xs={12}>
        {renderStartTime()}
      </Grid>
    </Grid>
  );

  return (
    <ModalWrapper
      baseModalId={baseModalId}
      cancelOnBackdropClick
      Component={renderDialogContent}
      dialogClassName={classes.eventSummaryDialog}
      dialogContentStyle={{ padding: '24px 16px 16px' }}
      maxWidth="sm"
      onPrimaryAction={editMode ? handleSave : handleClose}
      primaryActionText={editMode ? 'Save' : 'View'}
      primaryActionProps={{
        color: 'primary',
        ...(!editMode && {
          component: Link,
          target: '_blank',
          to: `${baseUrl}project-settings/gamertag-management/groups/${groupId}`,
        }),
      }}
      onSecondaryAction={editMode ? handleCancel : handleClose}
      secondaryActionText={editMode ? 'Cancel Changes' : 'Close'}
      secondaryActionProps={{ color: 'secondary' }}
    />
  );
};

StatelessGamertagSummaryDialog.propTypes = {
  baseModalId: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  displayColorPicker: PropTypes.bool.isRequired,
  duration: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleSetDuration: PropTypes.func.isRequired,
  handleSetGroupColor: PropTypes.func.isRequired,
  handleSetStartTime: PropTypes.func.isRequired,
  handleSetType: PropTypes.func.isRequired,
  isOffset: PropTypes.bool.isRequired,
  selectedGamertagGroup: PropTypes.object.isRequired,
  setDisplayColorPicker: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  timewarpState: PropTypes.object.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

StatelessGamertagSummaryDialog.defaultProps = {
  duration: undefined,
};
export default withStyles(eventSummaryStyles)(StatelessGamertagSummaryDialog);
