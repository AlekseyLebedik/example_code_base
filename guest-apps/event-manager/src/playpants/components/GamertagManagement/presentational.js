import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FieldArray } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import MasterDetail from 'dw/core/components/MasterDetail';
import { getDrawerStyles } from 'dw/core/components/MasterDetail/helpers';
import Empty from 'dw/core/components/Empty';
import MasterDetailGroupList from 'playpants/components/MasterDetailGroupList';
import AccountsFormFields from './components/AccountsFormFields';
import Detail from './components/Details';
import { PLAYPANTS_GAMERTAG_MGT_NAVBAR_HEIGHT } from './constants';
import styles from './index.module.css';

export const useStyles = makeStyles(theme => {
  const masterDetailStyles = getDrawerStyles(
    PLAYPANTS_GAMERTAG_MGT_NAVBAR_HEIGHT
  )(theme);
  return {
    eventManager: {},
    masterDetailExpander: {},
    masterDetailGamertagDrawerPaper: masterDetailStyles.drawerPaper,
    masterDetailGamertagExpander: masterDetailStyles.expander,
    typography: {},
  };
});

const StatelessGamertagManagement = ({
  groupList,
  groupLoading,
  handleCreateGroup,
  handleDeleteGroup,
  handleFetchGroups,
  handleSearch,
  nextGroupsPage,
  onSelectGroup,
  selectedGroup,
}) => {
  const classes = useStyles();
  return (
    <div className={styles.userBody}>
      <MasterDetail
        master={({ actions, selectedItemId }) => (
          <MasterDetailGroupList
            createGroup={handleCreateGroup}
            deleteGroup={handleDeleteGroup}
            fetchGroups={handleFetchGroups}
            groupList={groupList}
            groupLoading={groupLoading}
            nextGroupsPage={nextGroupsPage}
            onSearch={handleSearch}
            onSelectItem={selectedGroupId => {
              if (onSelectGroup) onSelectGroup(selectedGroupId);
              return actions.onSelectItem(selectedGroupId);
            }}
            renderExtraFields={form => (
              <FieldArray
                component={AccountsFormFields}
                name="accounts"
                props={{ form, cancelOnBackdropClick: true }}
              />
            )}
            searchPlaceholder="Search Group or Gamertag"
            selectedItemId={selectedGroup || selectedItemId}
          />
        )}
        detail={detailProps => <Detail {...detailProps} />}
        empty={() => <Empty>Select an item to get more details</Empty>}
        classes={{
          drawerPaper: classNames(
            styles.drawer,
            classes.masterDetailGamertagDrawerPaper
          ),
          expander: classes.masterDetailExpander,
        }}
      />
    </div>
  );
};

StatelessGamertagManagement.propTypes = {
  groupList: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupLoading: PropTypes.bool.isRequired,
  handleDeleteGroup: PropTypes.func.isRequired,
  nextGroupsPage: PropTypes.string,
  handleCreateGroup: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleFetchGroups: PropTypes.func.isRequired,
  onSelectGroup: PropTypes.func,
  selectedGroup: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
StatelessGamertagManagement.defaultProps = {
  nextGroupsPage: null,
  selectedGroup: null,
  onSelectGroup: null,
};

export default StatelessGamertagManagement;
