import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from 'dw/core/components/Dialog';
import Upload from 'dw/core/components/FormFields/Upload';
import IconButton from 'dw/core/components/IconButton';

import { getUpdatedActivitySettings } from '../../helpers';

import styles from './index.module.css';

const UploadVariables = ({
  activitySettings,
  hasVariables,
  updateProjectSetting,
}) => {
  const [open, setOpen] = useState(false);

  const onHide = () => setOpen(false);

  const handleFileUpload = data => {
    const reader = new FileReader();
    reader.onload = () => {
      const txt = reader.result;
      const rows = txt.split(/[\r\n]+/);
      const variables = {};
      rows.forEach(row => {
        const [key, value] = row.split(',').map(str => str.trim());
        variables[key] = value;
      });
      const updatedSettings = getUpdatedActivitySettings(
        activitySettings,
        variables
      );
      updateProjectSetting('activity_settings', updatedSettings);
    };
    reader.readAsText(data.file);
    onHide();
  };

  const uploadProps = {
    input: { value: '', onChange: handleFileUpload, accept: '.csv' },
    meta: { touched: true },
    buttonProps: { color: 'primary' },
  };

  const actionButtons = [
    <Button key="cancel" onClick={onHide}>
      Cancel
    </Button>,
    <Upload {...uploadProps} key="confirm" />,
  ];

  return (
    <>
      <div className={hasVariables ? styles.buttonContainer : styles.buttonRow}>
        {!hasVariables && (
          <span className={styles.helperText}>
            No variables have been defined, please upload a file:
          </span>
        )}
        <IconButton
          color="primary"
          icon="file_upload"
          onClick={() => setOpen(true)}
          tooltip="Upload variables"
        />
      </div>
      <Dialog
        actions={actionButtons}
        cancelOnBackdropClick
        onRequestClose={onHide}
        open={open}
        title="Confirm Update"
        classes={{ paper: styles.contentCenter }}
      >
        Upload any .csv file with the following format #obfuscated,
        #human_readable
        <Divider variant="middle" light className={styles.divider} />
        <strong>
          Uploading a .csv file will override and delete any current variables.
          Are you sure you want to proceed?
        </strong>
      </Dialog>
    </>
  );
};

UploadVariables.propTypes = {
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasVariables: PropTypes.bool.isRequired,
  updateProjectSetting: PropTypes.func.isRequired,
};

export default UploadVariables;
