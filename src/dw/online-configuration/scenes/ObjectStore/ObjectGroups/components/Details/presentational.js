import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

import Loading from 'dw/core/components/Loading';
import UsersList from 'dw/core/components/FormFields/UsersList';
import UserAutoComplete from 'dw/online-configuration/components/UserAutoComplete';

import OverridesList from './components/OverridesList';
import styles from './presentational.module.css';

const Details = ({
  selectedItem,
  selectedItemId,
  isLoading,
  isLoadingObjects,
  groupMembers,
  addGroupMember,
  removeGroupMembers,
  onSubmitReplaceUsers,
  deleteGroup,
  ...props
}) => {
  if (!selectedItem) return null;

  return (
    <div className={styles.container}>
      {isLoadingObjects && (
        <div className={styles.objectGroupsLinearProgress}>
          <LinearProgress className="progress" mode="indeterminate" />
        </div>
      )}
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
          />
          <OverridesList selectedItem={selectedItem} {...props} />
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
  isLoadingObjects: PropTypes.bool,
  onSubmitReplaceUsers: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
};

Details.defaultProps = {
  groupMembers: [],
  selectedItem: null,
  selectedItemId: null,
  isLoading: false,
  isLoadingObjects: false,
};

export default Details;
