import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import { STORAGE_ADD_PUBLISHER_VARIABLES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import GroupMemberDetails from './components/GroupMemberDetails';
import GroupMemberDetailsEmpty from './components/GroupMemberDetailsEmpty';
import GroupMemberListItem from './components/GroupMemberListItem';
import AddGroupMembersFormModal from './components/AddGroupMembersFormModal';
import { defaultSearchField } from './constants';

import './presentational.css';

function getRenderItemFunc(onSelectItem) {
  return item => (
    <GroupMemberListItem
      key={item}
      groupID={item}
      onClick={() => onSelectItem(item)}
    />
  );
}

function GroupMembersStateless(props) {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const { listItems, nextPageToken, q, onClickListItem, onShowMore } =
    props.reduxProps;
  const { onSearch } = props.reactProps;
  const {
    addGroupMembersFormModalVisible,
    openAddGroupMembersFormModalHandler,
    closeAddGroupMembersFormModalHandler,
    addOnRemoteSubmit,
    onAddGroupMembersFormHandler,
  } = props.addGroupMembersFormModalProps;

  const showMore = nextPageToken !== null;

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        title="Group Members"
        shown={listItems.length}
        color="default"
      >
        <CheckPermission
          predicate={STORAGE_ADD_PUBLISHER_VARIABLES}
          object={`titleenv.${currentEnv.id}`}
        >
          <AddGroupMembersFormModal
            visible={addGroupMembersFormModalVisible}
            onCancel={closeAddGroupMembersFormModalHandler}
            onRemoteSubmit={addOnRemoteSubmit}
            onSubmit={onAddGroupMembersFormHandler}
          />
          <Tooltip title="Add Members Group" placement="bottom">
            <IconButton onClick={() => openAddGroupMembersFormModalHandler()}>
              <Icon>playlist_add</Icon>
            </IconButton>
          </Tooltip>
        </CheckPermission>
      </SectionTitle>

      <SearchableList
        initialValue={q}
        onSearch={onSearch}
        placeholder="Group ID"
        items={listItems}
        toRenderFunc={getRenderItemFunc(item => {
          onClickListItem(item);
          actions.onSelectItem(item);
        })}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPageToken, q)}
        defaultSearchField={defaultSearchField}
      />
    </div>
  );

  renderMaster.propTypes = {
    actions: PropTypes.shape({
      onSelectItem: PropTypes.func.isRequired,
    }).isRequired,
  };

  const renderDetail = () => <GroupMemberDetails />;
  const renderEmpty = () => <GroupMemberDetailsEmpty />;

  return (
    <section className="group-members">
      <div className="group-members-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}

GroupMembersStateless.propTypes = {
  reduxProps: PropTypes.shape({
    listItems: PropTypes.array.isRequired,
    nextPageToken: PropTypes.string,
    q: PropTypes.string,
    onClickListItem: PropTypes.func.isRequired,
    onShowMore: PropTypes.func.isRequired,
  }).isRequired,
  reactProps: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
  }).isRequired,
  addGroupMembersFormModalProps: PropTypes.shape({
    addGroupMembersFormModalVisible: PropTypes.bool,
    openAddGroupMembersFormModalHandler: PropTypes.func.isRequired,
    closeAddGroupMembersFormModalHandler: PropTypes.func.isRequired,
    addOnRemoteSubmit: PropTypes.func.isRequired,
    onAddGroupMembersFormHandler: PropTypes.func.isRequired,
  }).isRequired,
};

export default GroupMembersStateless;
