import React from 'react';
import PropTypes from 'prop-types';

import ActivityTitle from '../ActivityTitle';
import BuildTable from './components/Tables/BuildTable';
import CustomTitleComponent from './components/CustomTitleComponent';
import DeploymentModalForm from './components/ModalForms/DeploymentModalForm';
import ConfirmActionModalForm from './components/ModalForms/ConfirmActionModalForm';
import PasswordCheckModalForm from './components/ModalForms/PasswordCheckModalForm';

import styles from './presentational.module.css';
import './styles.css';

export const ThunderpantsDetailsStateless = ({
  buildOptionHandlers,
  handleDeploy,
  modalFormHandlers,
  ...restProps
}) => (
  <>
    <ActivityTitle customComponent={<CustomTitleComponent {...restProps} />} />
    <div className={styles.container}>
      <DeploymentModalForm
        handleSubmit={modalFormHandlers.handleSubmit}
        {...restProps}
      />
      <PasswordCheckModalForm
        handleSubmit={modalFormHandlers.handlePasswordSubmit}
        {...restProps}
      />
      <ConfirmActionModalForm
        handleSubmit={modalFormHandlers.handleConfirmActionSubmit}
        {...restProps}
      />
      <BuildTable
        buildOptionHandlers={buildOptionHandlers}
        handleDeploy={handleDeploy}
        {...restProps}
      />
    </div>
  </>
);

ThunderpantsDetailsStateless.propTypes = {
  buildOptionHandlers: PropTypes.object.isRequired,
  handleDeploy: PropTypes.func.isRequired,
  modalFormHandlers: PropTypes.object.isRequired,
};

export default ThunderpantsDetailsStateless;
