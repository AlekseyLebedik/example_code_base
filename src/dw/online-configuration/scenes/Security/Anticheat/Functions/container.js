import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import ModalHandlers from 'dw/core/components/ModalHandlers';
import { selectedRowKeysSelector } from 'dw/core/components/TableHydrated';

import { fetchFunctions, addFunction, deleteFunction } from './actions';
import FunctionsStatelessComponent from './presentational';
import { FORM_NAME as AddFunctionFormName } from './components/AddFunctionForm/constants';

const makeStateToProps = state => ({
  functions: state.Scenes.Security.Anticheat.Functions.functions,
  isModalVisible: ModalHandlers.isVisibleSelector(state),
  selectedRowKeys: selectedRowKeysSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchFunctions()),
  addOnRemoteSubmit: () => dispatch(submit(AddFunctionFormName)),
  onAddFunctionHandler: values => dispatch(addFunction(values)),
  deleteFunction: functionId => dispatch(deleteFunction(functionId)),
  openAddModal: () => dispatch(ModalHandlers.open()),
  closeAddModal: () => dispatch(ModalHandlers.close()),
});

class Functions extends React.Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    return (
      <FunctionsStatelessComponent
        addModalProps={{
          isModalVisible: this.props.isModalVisible,
          addOnRemoteSubmit: this.props.addOnRemoteSubmit,
          onAddFunctionHandler: this.props.onAddFunctionHandler,
          openAddModal: this.props.openAddModal,
          closeAddModal: this.props.closeAddModal,
        }}
        functions={this.props.functions}
        selectedRowKeys={this.props.selectedRowKeys}
        deleteFunction={this.props.deleteFunction}
      />
    );
  }
}

Functions.propTypes = {
  onLoad: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddFunctionHandler: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  functions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
  deleteFunction: PropTypes.func.isRequired,
};

Functions.defaultProps = {
  selectedRowKeys: [],
};

export default connect(makeStateToProps, dispatchToProps)(Functions);
