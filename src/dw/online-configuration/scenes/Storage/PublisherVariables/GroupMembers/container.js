import { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { submit } from 'redux-form';

import { connect } from 'dw/core/helpers/component';

import {
  fetchMemberGroups,
  addGroupMembers,
  groupMembersListItemClick,
  openAddModal as openAddModalAction,
  closeAddModal as closeAddModalAction,
} from './actions';
import StatelessComponent from './presentational';
import { FORM_NAME as AddGroupMembersFormName } from './constants';

class GroupMembers extends Component {
  componentDidMount() {
    const { q } = queryString.parse(this.props.location.search);
    this.props.onLoad(q);
  }

  search(payload) {
    this.props.onSearch(payload);
  }

  render() {
    const { isAddModalOpen, openAddModal, closeAddModal, ...props } =
      this.props;
    const newProps = {
      reduxProps: props,
      reactProps: {
        onSearch: payload => this.search(payload),
      },
      addGroupMembersFormModalProps: {
        addGroupMembersFormModalVisible: isAddModalOpen,
        openAddGroupMembersFormModalHandler: openAddModal,
        closeAddGroupMembersFormModalHandler: closeAddModal,
        addOnRemoteSubmit: this.props.addOnRemoteSubmit,
        onAddGroupMembersFormHandler: this.props.onAddGroupMembersFormHandler,
      },
    };
    return <StatelessComponent {...newProps} />;
  }
}

const stateToProps = state => ({
  isAddModalOpen:
    state.Scenes.Storage.PublisherVariables.GroupMembers.isAddModalOpen,
  listItems: state.Scenes.Storage.PublisherVariables.GroupMembers.entries,
  nextPageToken:
    state.Scenes.Storage.PublisherVariables.GroupMembers.nextPageToken,
  selectedListItem:
    state.Scenes.Storage.PublisherVariables.GroupMembers.selectedListItem,
  q: state.Scenes.Storage.PublisherVariables.GroupMembers.q,
});

const dispatchToProps = dispatch => ({
  onLoad: query => {
    dispatch(fetchMemberGroups(!query ? {} : { q: query }));
  },
  onSearch: payload => dispatch(fetchMemberGroups({ q: payload.q })),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchMemberGroups({ nextPageToken, q }, true)),
  onClickListItem: groupMember =>
    dispatch(groupMembersListItemClick(groupMember)),
  addOnRemoteSubmit: () => dispatch(submit(AddGroupMembersFormName)),
  onAddGroupMembersFormHandler: values => dispatch(addGroupMembers(values)),
  openAddModal: () => dispatch(openAddModalAction()),
  closeAddModal: () => dispatch(closeAddModalAction()),
});

GroupMembers.propTypes = {
  isAddModalOpen: PropTypes.bool.isRequired,
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddGroupMembersFormHandler: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, GroupMembers);
