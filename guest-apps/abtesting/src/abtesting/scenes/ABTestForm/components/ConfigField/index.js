import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tooltip from '@material-ui/core/Tooltip';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ModalHandlers from 'dw/core/components/ModalHandlers';

import { configsListFormSelector } from '../../selectors';
import { FORM_NAME as UPDATE_CONFIG_FORM_NAME } from '../ConfigForm/Form/constants';
import ConfigForm from '../ConfigForm';
import ViewConfig from '../ViewConfig';
import styles from './index.module.css';

const stateToProps = (state, props) => {
  const { name } = props.input;
  const formName = `${UPDATE_CONFIG_FORM_NAME}-${name}`;
  return {
    configsList: configsListFormSelector(state),
    isFormOpen: ModalHandlers.isVisibleSelector(state, formName),
    formName,
  };
};

const dispatchToProps = dispatch => ({
  openUpdateConfigModal: formName => dispatch(ModalHandlers.open(formName)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { formName, configsList, isFormOpen } = stateProps;
  return {
    ...ownProps,
    formName,
    configsList,
    isFormOpen,
    openUpdateConfigModal: () => dispatchProps.openUpdateConfigModal(formName),
  };
};

const SelectedConfig = ({
  value,
  onDelete,
  configsList,
  openUpdateConfigModal,
  formName,
  disabled,
  isFormOpen,
}) => {
  const config =
    configsList && configsList.find(c => c.configID === value.configID);
  const configName =
    (config && (config.name || `ID: ${config.configID}`)) || value.configName;
  if (!configName) return null;
  return (
    <div className={config ? styles.config : styles.invalidConfig}>
      {!config && (
        <Tooltip title="Invalid config in selected context">
          <Icon className={styles.warning}>warning</Icon>
        </Tooltip>
      )}
      {!disabled ? (
        <>
          <Tooltip title={config ? 'Edit Config' : configName}>
            <div onClick={config && openUpdateConfigModal}>{configName}</div>
          </Tooltip>
          <Tooltip title="Delete Config">
            <IconButton className={styles.deleteButton} onClick={onDelete}>
              <Icon className={styles.deleteIcon}>highlight_off</Icon>
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <ViewConfig config={config} configName={configName} />
      )}
      {isFormOpen && <ConfigForm formName={formName} config={config} />}
    </div>
  );
};

SelectedConfig.propTypes = {
  value: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  configsList: PropTypes.array,
  disabled: PropTypes.bool,
  openUpdateConfigModal: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  isFormOpen: PropTypes.bool.isRequired,
};

SelectedConfig.defaultProps = {
  configsList: undefined,
  disabled: false,
};

const ConfigFieldComponent = props => {
  const {
    configsList,
    openUpdateConfigModal,
    formName,
    onDelete,
    isFormOpen,
    disabled,
    input,
  } = props;
  return (
    <SelectedConfig
      value={input.value}
      onDelete={onDelete}
      configsList={configsList}
      disabled={disabled}
      openUpdateConfigModal={openUpdateConfigModal}
      formName={formName}
      isFormOpen={isFormOpen}
    />
  );
};

ConfigFieldComponent.propTypes = {
  configsList: PropTypes.array,
  openUpdateConfigModal: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isFormOpen: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired,
};

ConfigFieldComponent.defaultProps = {
  configsList: undefined,
  disabled: false,
};

export default connect(
  stateToProps,
  dispatchToProps,
  mergeProps
)(ConfigFieldComponent);
