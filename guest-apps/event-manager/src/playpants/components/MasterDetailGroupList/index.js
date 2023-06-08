import React from 'react';
import { connect } from 'react-redux';
import { submit, isPristine } from 'redux-form';
import PropTypes from 'prop-types';

import ModalForm from 'dw/core/components/ModalForm';
import IconButton from 'dw/core/components/IconButton';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import SearchableList from 'dw/core/components/SearchableList';
import SectionTitle from 'dw/core/components/SectionTitle';
import CreateGroupForm from './components/CreateGroupForm';
import ListItem from './components/ListItem';
import { CREATE_GROUP_FORM_NAME } from './constants';

const getRenderItemFunc =
  (onSelectItem, deleteGroup, selectedItemId, groupList) => item =>
    (
      <ListItem
        {...item}
        header={item.header}
        index={groupList.indexOf(item) + 1}
        key={item.id}
        onClick={() => onSelectItem(item)}
        deleteGroup={deleteGroup}
        selectedItemId={selectedItemId}
      />
    );

export const GroupListBase = ({
  _createGroupModalLoading,
  _createGroupModalVisible,
  _createGroupOnRemoteSubmit,
  _groupModalCancel,
  _isCreateGroupModalPristine,
  _onSearch,
  _onShowMore,
  _onSubmit,
  _openCreateGroupModal,
  createGroup,
  deleteGroup,
  groupList,
  groupLoading,
  nextGroupsPage,
  onSelectItem,
  renderExtraFields,
  searchPlaceholder,
  selectedItemId,
}) => {
  const showMore = !!nextGroupsPage;
  const Trigger = () => (
    <IconButton
      icon="add"
      onClick={_openCreateGroupModal}
      tooltip="Create Group"
    />
  );

  return (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Available Groups"
        shown={groupList ? groupList.length : 0}
      >
        <ModalForm
          cancelOnBackdropClick
          extraFields={
            renderExtraFields && renderExtraFields(CREATE_GROUP_FORM_NAME)
          }
          FormComponent={CreateGroupForm}
          formName={CREATE_GROUP_FORM_NAME}
          fullWidth
          loading={_createGroupModalLoading}
          maxWidth="md"
          onCancel={_groupModalCancel}
          onFormSubmit={_onSubmit}
          onRemoteSubmit={_createGroupOnRemoteSubmit}
          pristine={_isCreateGroupModalPristine}
          visible={_createGroupModalVisible}
        />
        {createGroup && <Trigger />}
      </SectionTitle>

      <SearchableList
        initialLoading={groupLoading}
        items={groupList}
        loadingTimeout={0}
        onSearch={_onSearch}
        onShowMore={() => _onShowMore(nextGroupsPage)}
        placeholder={searchPlaceholder}
        searchEnabled
        showMore={showMore}
        toRenderFunc={getRenderItemFunc(
          item => {
            onSelectItem(item.id);
          },
          deleteGroup,
          selectedItemId,
          groupList
        )}
      />
    </div>
  );
};

GroupListBase.propTypes = {
  _createGroupModalLoading: PropTypes.bool.isRequired,
  _createGroupModalVisible: PropTypes.bool.isRequired,
  _createGroupOnRemoteSubmit: PropTypes.func.isRequired,
  _groupModalCancel: PropTypes.func.isRequired,
  _isCreateGroupModalPristine: PropTypes.bool.isRequired,
  _onSearch: PropTypes.func.isRequired,
  _onShowMore: PropTypes.func.isRequired,
  _onSubmit: PropTypes.func.isRequired,
  _openCreateGroupModal: PropTypes.func.isRequired,
  createGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
  groupList: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupLoading: PropTypes.bool,
  nextGroupsPage: PropTypes.string,
  onSelectItem: PropTypes.func.isRequired,
  renderExtraFields: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  selectedItemId: PropTypes.string,
};

GroupListBase.defaultProps = {
  createGroup: null,
  deleteGroup: null,
  groupLoading: false,
  nextGroupsPage: null,
  renderExtraFields: null,
  searchPlaceholder: 'Group Name',
  selectedItemId: null,
};

const stateToProps = state => ({
  _createGroupModalVisible: ModalHandlers.isVisibleSelector(
    state,
    CREATE_GROUP_FORM_NAME
  ),
  _createGroupModalLoading: ModalHandlers.submittingSelector(
    state,
    CREATE_GROUP_FORM_NAME
  ),
  _isCreateGroupModalPristine: isPristine(CREATE_GROUP_FORM_NAME)(state),
});

const dispatchToProps = dispatch => ({
  _createGroupOnRemoteSubmit: () => dispatch(submit(CREATE_GROUP_FORM_NAME)),
  _groupModalCancel: () =>
    dispatch(ModalHandlers.close(CREATE_GROUP_FORM_NAME)),
  _openCreateGroupModal: () =>
    dispatch(ModalHandlers.open(CREATE_GROUP_FORM_NAME)),
  _closeCreateGroupModal: () =>
    dispatch(ModalHandlers.close(CREATE_GROUP_FORM_NAME)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  _onShowMore: nextPage => ownProps.fetchGroups({ nextPage }),
  _onSearch: payload =>
    ownProps.onSearch
      ? ownProps.onSearch(payload)
      : ownProps.fetchGroups(
          payload.q !== '' ? { name__icontains: payload.q } : {}
        ),
  _onSubmit: values => {
    ownProps.createGroup({
      name: values.groupName,
      project: values.projectId,
      description: values.description,
      ...(values.members.length && {
        members: values.members.map(member => member.id),
      }),
      ...(values.accounts.length && {
        accounts: values.accounts,
      }),
    });
    dispatchProps._groupModalCancel();
  },
});

export default connect(
  stateToProps,
  dispatchToProps,
  mergeProps
)(GroupListBase);
