import { connect } from 'dw/core/helpers/component';
import { submit } from 'redux-form';
import { selectedRowKeysSelector } from 'dw/core/components/TableHydrated';
import StatelessComponent from './presentational';

import {
  addGroupMembers,
  openAddMembersModal,
  closeAddMembersModal,
  deleteGroupMembers,
} from '../../actions';
import { FORM_NAME as AddGroupMembersFormName } from '../../constants';

const mapStateToProps = (state, props) => ({
  isAddModalOpen:
    state.Scenes.Storage.PublisherVariables.GroupMembers.isAddMembersModalOpen,
  selectedListItem:
    state.Scenes.Storage.PublisherVariables.GroupMembers.selectedListItem,
  selectedListItemDetails:
    state.Scenes.Storage.PublisherVariables.GroupMembers
      .selectedListItemDetails,
  reactProps: props,
  selectedRowKeys: selectedRowKeysSelector(state),
});

const dispatchToProps = dispatch => ({
  addOnRemoteSubmit: () =>
    dispatch(submit(`${AddGroupMembersFormName}_ADD_MEMBERS`)),
  onAddGroupMembersFormHandler: values => dispatch(addGroupMembers(values)),
  openAddModal: () => dispatch(openAddMembersModal()),
  closeAddModal: () => dispatch(closeAddMembersModal()),
  deleteGroupMembers: (groupId, userIds) =>
    dispatch(deleteGroupMembers(groupId, userIds)),
});

export default connect(mapStateToProps, dispatchToProps, StatelessComponent);
