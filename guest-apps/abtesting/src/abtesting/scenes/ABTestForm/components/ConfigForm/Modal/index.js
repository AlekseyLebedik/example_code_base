import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import { hasData } from 'dw/core/helpers/object';

import Form from '../Form';
import styles from './index.module.css';

const ConfigForm = props => {
  const { visible, onCancel, onRemoteSubmit, onSubmit, formName, config } =
    props;
  const hasConfig = hasData(config);

  const footerButtons = [
    <Button key="cancel" label="Cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="update" color="primary" onClick={onRemoteSubmit}>
      {hasConfig ? 'Update Config' : 'Add Config'}
    </Button>,
  ];

  return (
    <div className={styles.modalContainer}>
      <Dialog
        title={hasConfig ? 'Update Config' : 'Add Config'}
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '500px' }}
      >
        <Form
          externalSubmit={onSubmit}
          form={formName}
          initialValues={config}
        />
      </Dialog>
    </div>
  );
};

ConfigForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  config: PropTypes.object,
};

ConfigForm.defaultProps = {
  config: {},
};

export default ConfigForm;
