import React from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';

import { connect } from 'dw/core/helpers/component';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { selectedRowKeysSelector } from 'dw/core/components/TableHydrated';

import {
  fetchMonitoredUsers,
  addMonitoredUser,
  deleteMonitoredUsers,
} from './actions';
import MonitoredUsersStatelessComponent from './presentational';

import { FORM_NAME as AddMonitoredUserFormName } from './components/AddMonitoredUserForm/constants';

const makeStateToProps = state => ({
  users: state.Scenes.Security.Anticheat.MonitoredUsers.users,
  isModalVisible: ModalHandlers.isVisibleSelector(state),
  selectedRowKeys: selectedRowKeysSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchMonitoredUsers()),
  addOnRemoteSubmit: () => dispatch(submit(AddMonitoredUserFormName)),
  onAddMonitoredUserHandler: values => dispatch(addMonitoredUser(values)),
  deleteMonitoredUsers: userIds => dispatch(deleteMonitoredUsers(userIds)),
  openAddModal: () => dispatch(ModalHandlers.open()),
  closeAddModal: () => dispatch(ModalHandlers.close()),
});

class MonitoredUsers extends React.Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    return (
      <MonitoredUsersStatelessComponent
        addModalProps={{
          isModalVisible: this.props.isModalVisible,
          addOnRemoteSubmit: this.props.addOnRemoteSubmit,
          onAddMonitoredUserHandler: this.props.onAddMonitoredUserHandler,
          openAddModal: this.props.openAddModal,
          closeAddModal: this.props.closeAddModal,
        }}
        users={this.props.users}
        deleteMonitoredUsers={this.props.deleteMonitoredUsers}
        selectedRowKeys={this.props.selectedRowKeys}
      />
    );
  }
}

MonitoredUsers.propTypes = {
  onLoad: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddMonitoredUserHandler: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.string, PropTypes.string])
  ).isRequired,
  deleteMonitoredUsers: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
};

MonitoredUsers.defaultProps = {
  selectedRowKeys: [],
};

export default connect(makeStateToProps, dispatchToProps, MonitoredUsers);
