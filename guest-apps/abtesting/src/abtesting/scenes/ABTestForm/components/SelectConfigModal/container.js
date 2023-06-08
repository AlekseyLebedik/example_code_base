import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import ModalHandlers from 'dw/core/components/ModalHandlers';

import * as actions from '../../actions';
import { selectedContextFormSelector } from '../../selectors';
import SelectConfigModalPresentational from './presentational';

const stateToProps = (state, props) => {
  const { formName } = props;
  return {
    selectedContext: selectedContextFormSelector(state),
    formatDateTime: formatDateTimeSelector(state),
    isSelectConfigModalVisible: ModalHandlers.isVisibleSelector(
      state,
      formName
    ),
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

class SelectConfigModal extends React.Component {
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.refreshCells(params);
  };

  onFilterTextboxChange = value => {
    this.gridApi.setQuickFilter(value);
  };

  onAddRowSelection = () => {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      selectedRows.map(selected =>
        this.props.onAdd({
          configID: selected.configID,
          configName: selected.configName,
        })
      );

      this.props.closeAddConfigModal();
    }
  };

  render() {
    const {
      closeAddConfigModal,
      handlerAddConfig,
      isSelectConfigModalVisible,
      formName,
      configsList,
      formatDateTime,
      selectedConfigIDs,
      saveConfig,
      onAdd,
      config,
    } = this.props;
    const selectedConfigs = configsList.filter(
      c => !selectedConfigIDs.includes(c.configID)
    );
    return (
      <SelectConfigModalPresentational
        onAdd={onAdd}
        formatDateTime={formatDateTime}
        onGridReady={this.onGridReady}
        onAddRowSelection={this.onAddRowSelection}
        onSelectionChanged={this.onSelectionChanged}
        onFilterTextboxChange={this.onFilterTextboxChange}
        selectedConfigs={selectedConfigs}
        visible={isSelectConfigModalVisible}
        onCancel={closeAddConfigModal}
        onRemoteSubmit={handlerAddConfig}
        onSubmit={saveConfig}
        formName={formName}
        config={config}
      />
    );
  }
}
SelectConfigModal.propTypes = {
  closeAddConfigModal: PropTypes.func.isRequired,
  handlerAddConfig: PropTypes.func.isRequired,
  isSelectConfigModalVisible: PropTypes.bool.isRequired,
  formName: PropTypes.string.isRequired,
  saveConfig: PropTypes.func.isRequired,
  config: PropTypes.object,
  configsList: PropTypes.arrayOf(PropTypes.object),
  formatDateTime: PropTypes.func.isRequired,
  selectedConfigIDs: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func.isRequired,
};

SelectConfigModal.defaultProps = {
  config: {},
  configsList: [],
  selectedConfigIDs: [],
};

export default connect(
  stateToProps,
  dispatchToProps,
  mergeProps
)(SelectConfigModal);
