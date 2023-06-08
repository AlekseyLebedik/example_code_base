import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import { hasData } from 'dw/core/helpers/object';
import ModalHandlers from 'dw/core/components/ModalHandlers';

import * as actions from '../../actions';
import { selectedContextFormSelector } from '../../selectors';
import ConfigModal from './Modal';

const stateToProps = (state, props) => {
  const { formName } = props;
  return {
    selectedContext: selectedContextFormSelector(state),
    isAddConfigModalVisible: ModalHandlers.isVisibleSelector(state, formName),
    formName,
  };
};

const dispatchToProps = (dispatch, props) => {
  const { formName } = props;
  return {
    closeAddConfigModal: () => dispatch(ModalHandlers.close(formName)),

    handlerAddConfig: () => dispatch(submit(formName)),
    saveConfig: (values, context, onAdd) =>
      new Promise((_, reject) =>
        dispatch(
          actions.saveConfig(
            values,
            context,
            () => ModalHandlers.close(formName),
            reject,
            onAdd
          )
        )
      ),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  saveConfig: values =>
    dispatchProps.saveConfig(
      values,
      stateProps.selectedContext,
      ownProps.onAdd
    ),
});

const ConfigForm = props => {
  const {
    closeAddConfigModal,
    handlerAddConfig,
    isAddConfigModalVisible,
    formName,
    saveConfig,
    config,
    cohortName,
  } = props;

  return (
    <ConfigModal
      visible={isAddConfigModalVisible}
      onCancel={closeAddConfigModal}
      onRemoteSubmit={handlerAddConfig}
      onSubmit={saveConfig}
      formName={formName}
      config={!hasData(config) && cohortName ? { name: cohortName } : config}
    />
  );
};

ConfigForm.propTypes = {
  closeAddConfigModal: PropTypes.func.isRequired,
  handlerAddConfig: PropTypes.func.isRequired,
  isAddConfigModalVisible: PropTypes.bool.isRequired,
  formName: PropTypes.string.isRequired,
  saveConfig: PropTypes.func.isRequired,
  config: PropTypes.object,
  cohortName: PropTypes.string,
};

ConfigForm.defaultProps = {
  config: {},
  cohortName: undefined,
};

export default connect(stateToProps, dispatchToProps, mergeProps)(ConfigForm);
