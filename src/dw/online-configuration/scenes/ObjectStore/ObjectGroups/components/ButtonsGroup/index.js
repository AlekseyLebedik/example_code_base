import React from 'react';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import { useSelector, useDispatch } from 'react-redux';
import { OBJECT_STORE_EDIT_GROUPS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { deleteGroup, replaceUsers } from '../../actions';

import styles from './buttonGroup.module.css';
import { ReplaceUsersGroup } from './ReplaceUserGroup/ReplaceUserGroup';

const ButtonGroups = props => {
  const dispatch = useDispatch();
  const { selectedItem } = props;
  const currentEnv = useSelector(currentEnvDetailsSelector);

  return (
    <div className={styles.ButtonGroups}>
      <ReplaceUsersGroup
        onSubmitReplaceUsers={() => dispatch(replaceUsers(selectedItem))}
      />
      <CheckPermission
        predicate={OBJECT_STORE_EDIT_GROUPS}
        object={`titleenv.${currentEnv.id}`}
      >
        <ConfirmActionComponent
          component="IconButton"
          tooltipProps={{ title: 'Delete group', placement: 'bottom' }}
          onClick={() => {
            dispatch(deleteGroup(selectedItem));
          }}
          confirm={{
            title: 'Confirm Delete',
            confirmMsg: `Are you sure you want to delete the group ?`,
            mainButtonLabel: 'Delete',
            destructive: true,
          }}
          color="inherit"
        >
          delete
        </ConfirmActionComponent>
      </CheckPermission>
    </div>
  );
};

ButtonGroups.propTypes = {
  selectedItem: PropTypes.object,
};
ButtonGroups.defaultProps = {
  selectedItem: null,
};

export default ButtonGroups;
