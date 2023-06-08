import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Table from 'dw/core/components/TableHydrated';
import {
  STORAGE_ADD_PUBLISHER_VARIABLES,
  STORAGE_DELETE_PUBLISHER_VARIABLES,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import GroupMemberDetailsEmpty from '../GroupMemberDetailsEmpty';
import AddGroupMembersFormModal from '../AddGroupMembersFormModal';

import { COLUMNS } from './constants';

import './presentational.css';

const GroupMemberDetails = ({
  isAddModalOpen,
  selectedListItem,
  selectedListItemDetails,
  openAddModal,
  closeAddModal,
  addOnRemoteSubmit,
  onAddGroupMembersFormHandler,
  deleteGroupMembers,
  selectedRowKeys,
}) => {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const hasDeletePermission = useCurrentEnvPermission(
    STORAGE_DELETE_PUBLISHER_VARIABLES
  );
  const deleteProps = hasDeletePermission
    ? {
        actions: [
          {
            iconName: 'delete',
            label: 'Delete',
          },
        ],
        hideActions: true,
        getKey: k => k.userID,
      }
    : {};
  const Maincomponent = () => (
    <div className="details__container group-members flex-rows-container">
      <SectionTitle title={`Group ID: ${selectedListItem}`}>
        <CheckPermission
          predicate={STORAGE_ADD_PUBLISHER_VARIABLES}
          object={`titleenv.${currentEnv.id}`}
        >
          <Tooltip title="Add Members" placement="bottom">
            <IconButton onClick={openAddModal} color="inherit">
              <Icon>playlist_add</Icon>
            </IconButton>
          </Tooltip>
          {selectedListItem && (
            <AddGroupMembersFormModal
              visible={isAddModalOpen}
              onCancel={closeAddModal}
              onRemoteSubmit={addOnRemoteSubmit}
              onSubmit={onAddGroupMembersFormHandler}
              initialValues={{ groupId: selectedListItem }}
              formNameSuffix="_ADD_MEMBERS"
            />
          )}
        </CheckPermission>
        {hasDeletePermission && selectedListItemDetails && (
          <ConfirmActionComponent
            component="IconButton"
            container="details"
            onClick={() =>
              deleteGroupMembers(selectedListItem, selectedRowKeys)
            }
            tooltipProps={
              selectedRowKeys.length > 0
                ? { title: 'Delete Selected', placement: 'bottom' }
                : null
            }
            disabled={selectedRowKeys.length === 0}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg:
                'Are you sure you want to delete selected members from a group?',
              mainButtonLabel: 'Delete',
              destructive: true,
            }}
            color="inherit"
          >
            delete
          </ConfirmActionComponent>
        )}
      </SectionTitle>
      {selectedListItemDetails && (
        <div className="scrollable-content">
          <Table
            data={selectedListItemDetails}
            columns={COLUMNS}
            pagination={false}
            {...deleteProps}
          />
        </div>
      )}
    </div>
  );

  return !selectedListItem ? <GroupMemberDetailsEmpty /> : Maincomponent();
};

GroupMemberDetails.propTypes = {
  isAddModalOpen: PropTypes.bool.isRequired,
  selectedListItem: PropTypes.number,
  selectedListItemDetails: PropTypes.arrayOf(
    PropTypes.shape({
      userID: PropTypes.string,
      username: PropTypes.string,
    })
  ),
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddGroupMembersFormHandler: PropTypes.func.isRequired,
  deleteGroupMembers: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
};

GroupMemberDetails.defaultProps = {
  selectedListItem: null,
  selectedListItemDetails: [],
  selectedRowKeys: [],
};

export default GroupMemberDetails;
