import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import SectionTitle from 'dw/core/components/SectionTitle';
import Loading from 'dw/core/components/Loading';
import UsersList from 'dw/core/components/FormFields/UsersList';
import UserAutoComplete from 'dw/core/components/UserAutoComplete';
import FeatureSwitchesCheck from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';
import ModalForm from 'dw/core/components/ModalForm';
import { REPLACE_USERS_FORM_NAME } from 'abtesting/scenes/ABTestGroups/constants';
import * as P from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { useABTestingProjectID } from 'dw/core/hooks';
import { hasData } from 'dw/core/helpers/object';

import { useTestsListHook } from 'abtesting/scenes/hooks';

import ReplaceUsersForm from '../ReplaceUsersForm';
import ABTestsList from '../ABTestsList';

import styles from './presentational.module.css';

const OpenModalButton = ({ onClick }) => (
  <Tooltip title="Upload CSV" className={styles.uploadCsv} placement="bottom">
    <IconButton onClick={onClick}>
      <Icon>insert_drive_file</Icon>
    </IconButton>
  </Tooltip>
);
OpenModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const ReplaceUsersGroup = ({ onSubmitReplaceUsers }) => (
  <FeatureSwitchesCheck
    featureSwitches={[fs.GROUPS_UPLOAD_PLAYERS]}
    isStaffAllowed={false}
  >
    <ModalForm
      formName={REPLACE_USERS_FORM_NAME}
      FormComponent={ReplaceUsersForm}
      onFormSubmit={onSubmitReplaceUsers}
      OpenModalComponent={OpenModalButton}
      title="Replace Users"
      submittingText="Replacing..."
      submitText="Replace Users"
      fullWidth
      maxWidth="md"
    />
  </FeatureSwitchesCheck>
);
ReplaceUsersGroup.propTypes = {
  onSubmitReplaceUsers: PropTypes.func.isRequired,
};

const DeleteGroupButton = ({ selectedItem, deleteGroup, context }) => {
  const splitContext = context.split(':');
  const projectID = useABTestingProjectID(
    hasData(splitContext) ? splitContext[0] : undefined
  );
  return (
    <CheckPermission
      predicate={P.ABTESTING_EDIT_GROUPS}
      object={`project.${projectID}`}
    >
      <ConfirmActionComponent
        component="IconButton"
        tooltipProps={{ title: 'Delete group', placement: 'bottom' }}
        onClick={() => {
          deleteGroup(selectedItem);
        }}
        confirm={{
          title: 'Confirm Delete',
          confirmMsg: `Are you sure you want to delete the group ${selectedItem.groupName}?`,
          mainButtonLabel: 'Delete',
          destructive: true,
        }}
        color="inherit"
      >
        delete
      </ConfirmActionComponent>
    </CheckPermission>
  );
};
DeleteGroupButton.propTypes = {
  deleteGroup: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  context: PropTypes.string.isRequired,
};

const Details = ({
  selectedItem,
  selectedItemId,
  isLoading,
  groupMembers,
  addGroupMember,
  removeGroupMembers,
  onSubmitReplaceUsers,
  deleteGroup,
  context,
  ...props
}) => {
  const [loadingList, testsList] = useTestsListHook();
  if (!selectedItem || loadingList) return null;

  return (
    <div className={styles.container}>
      <SectionTitle title={`${selectedItem.groupName} | ${selectedItemId}`}>
        <ReplaceUsersGroup onSubmitReplaceUsers={onSubmitReplaceUsers} />
        <DeleteGroupButton
          selectedItem={selectedItem}
          deleteGroup={deleteGroup}
          context={context}
        />
      </SectionTitle>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="scrollable-content">
          <UsersList
            items={groupMembers}
            onAdd={addGroupMember}
            onRemove={removeGroupMembers}
            userInputComponent={UserAutoComplete}
            excludeColumns={['email']}
            deleteDestructive
            batch
            context={context}
          />
          <ABTestsList
            items={testsList}
            selectedItem={selectedItem}
            {...props}
          />
        </div>
      )}
    </div>
  );
};

Details.propTypes = {
  groupMembers: PropTypes.arrayOf(PropTypes.object),
  addGroupMember: PropTypes.func.isRequired,
  removeGroupMembers: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  selectedItemId: PropTypes.string,
  isLoading: PropTypes.bool,
  onSubmitReplaceUsers: PropTypes.func.isRequired,
  context: PropTypes.string,
  deleteGroup: PropTypes.func.isRequired,
};

Details.defaultProps = {
  groupMembers: [],
  selectedItem: null,
  selectedItemId: null,
  isLoading: false,
  context: undefined,
};

export default Details;
