import React from 'react';
import PropTypes from 'prop-types';
import Table from 'dw/core/components/TableHydrated';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
  SECURITY_ADD_ANTICHEAT_MONITORED_USERS,
  SECURITY_DELETE_ANTICHEAT_MONITORED_USERS,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';

import SectionTitle from 'dw/core/components/SectionTitle';
import Loading from 'dw/core/components/Loading';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import AddMonitoredUserModal from './components/AddMonitoredUserModal';

import { COLUMNS } from './constants';

const MonitoredUsersStatelessComponent = ({
  users,
  deleteMonitoredUsers,
  selectedRowKeys,
  addModalProps,
}) => {
  const {
    isModalVisible,
    addOnRemoteSubmit,
    onAddMonitoredUserHandler,
    openAddModal,
    closeAddModal,
  } = addModalProps;

  const [loadingPermission, , result] = useCurrentEnvPermission(
    [
      SECURITY_ADD_ANTICHEAT_MONITORED_USERS,
      SECURITY_DELETE_ANTICHEAT_MONITORED_USERS,
    ],
    false
  );
  const hasDeletePermission =
    result?.data?.[SECURITY_DELETE_ANTICHEAT_MONITORED_USERS];
  const hasAddPermission =
    result?.data?.[SECURITY_ADD_ANTICHEAT_MONITORED_USERS];

  const empty = <div className="empty">No data to display</div>;

  const deleteProps = hasDeletePermission
    ? {
        getKey: k => k.userId,
        className: 'with-permissions',
        actions: [
          {
            iconName: 'delete',
            label: 'Stop Monitoring',
          },
        ],
        hideActions: true,
      }
    : {};

  const renderTable = () => (
    <Table data={users} columns={COLUMNS} {...deleteProps} />
  );

  return loadingPermission ? (
    <Loading />
  ) : (
    <section className="main-container monitored-users flex-rows-container">
      <SectionTitle>
        {hasAddPermission && (
          <span className="add-modal-controls">
            <AddMonitoredUserModal
              visible={isModalVisible}
              onCancel={closeAddModal}
              onRemoteSubmit={addOnRemoteSubmit}
              onSubmit={onAddMonitoredUserHandler}
            />
            <Tooltip title="Monitor A User" placement="bottom">
              <IconButton color="inherit" onClick={openAddModal}>
                <Icon>playlist_add</Icon>
              </IconButton>
            </Tooltip>
          </span>
        )}
        {hasDeletePermission && users.length > 0 && (
          <ConfirmActionComponent
            component="IconButton"
            className="action-button"
            tooltipProps={
              selectedRowKeys.length > 0
                ? { title: 'Stop users monitoring', placement: 'bottom' }
                : null
            }
            onClick={() => deleteMonitoredUsers(selectedRowKeys)}
            confirm={{
              title: 'Stop monitoring',
              confirmMsg:
                'Are you sure you want to stop monitoring selected users?',
              mainButtonLabel: 'Stop monitoring',
              destructive: true,
            }}
            disabled={selectedRowKeys.length === 0}
            color="inherit"
          >
            visibility_off
          </ConfirmActionComponent>
        )}
      </SectionTitle>
      <div className="scrollable-content with-inner-padding">
        {users.length === 0 ? empty : renderTable()}
      </div>
    </section>
  );
};

MonitoredUsersStatelessComponent.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.string, PropTypes.string])
  ).isRequired,
  deleteMonitoredUsers: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
  addModalProps: PropTypes.shape({
    isModalVisible: PropTypes.bool,
    addOnRemoteSubmit: PropTypes.func,
    onAddMonitoredUserHandler: PropTypes.func,
    openAddModal: PropTypes.func,
    closeAddModal: PropTypes.func,
  }).isRequired,
};

MonitoredUsersStatelessComponent.defaultProps = {
  selectedRowKeys: [],
};

export default MonitoredUsersStatelessComponent;
