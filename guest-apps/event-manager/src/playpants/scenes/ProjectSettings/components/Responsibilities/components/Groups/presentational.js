import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import debounce from 'lodash/debounce';
import Empty from 'dw/core/components/Empty';
import MasterDetail from 'dw/core/components/MasterDetail';
import MasterDetailGroupList from 'playpants/components/MasterDetailGroupList';
import Detail from './components/Details';
import UsersSelect from './components/UsersSelect';

import styles from './index.module.css';

const StatelessGroups = ({
  availableUsers,
  classes,
  groupList,
  groupLoading,
  handleDeleteGroup,
  nextGroupsPage,
  handleCreateGroup,
  onFetchGroups,
  onSearchUsers,
}) => {
  const [inputValue, setInputValue] = useState('');
  const onSearchUsersDebounced = useCallback(
    params => debounce(() => onSearchUsers(params), 1000),
    [onSearchUsers]
  );

  return (
    <div className={styles.userBody}>
      <MasterDetail
        master={({ actions, selectedItemId }) => (
          <MasterDetailGroupList
            createGroup={handleCreateGroup}
            deleteGroup={handleDeleteGroup}
            fetchGroups={onFetchGroups}
            groupList={groupList}
            groupLoading={groupLoading}
            nextGroupsPage={nextGroupsPage}
            onSelectItem={actions.onSelectItem}
            renderExtraFields={() => (
              <UsersSelect
                availableUsers={availableUsers}
                onInputChange={q => {
                  setInputValue(q);
                  onSearchUsersDebounced({ q });
                }}
                inputValue={inputValue}
              />
            )}
            selectedItemId={selectedItemId}
          />
        )}
        detail={detailProps => <Detail {...detailProps} />}
        empty={() => <Empty>Select an item to get more details</Empty>}
        classes={{
          drawerPaper: classNames(
            styles.drawer,
            classes.masterDetailDrawerPaper
          ),
          expander: classes.masterDetailExpander,
        }}
      />
    </div>
  );
};

StatelessGroups.propTypes = {
  availableUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object,
  groupList: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupLoading: PropTypes.bool.isRequired,
  handleDeleteGroup: PropTypes.func.isRequired,
  nextGroupsPage: PropTypes.string,
  handleCreateGroup: PropTypes.func.isRequired,
  onFetchGroups: PropTypes.func.isRequired,
  onSearchUsers: PropTypes.func,
};
StatelessGroups.defaultProps = {
  classes: {},
  nextGroupsPage: null,
  onSearchUsers: () => {},
};

export default StatelessGroups;
