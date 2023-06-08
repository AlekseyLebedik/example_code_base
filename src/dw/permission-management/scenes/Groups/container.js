import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isStaffSelector } from '@demonware/devzone-core/modules/user/selectors';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { CREATE_GROUP_FORM_NAME } from 'dw/permission-management/scenes/Groups/constants';

import { fetchCompanies } from '../actionCreators';
import {
  createGroup,
  deletePermissionGroup,
  fetchContentTypes,
  fetchGroups,
} from './actions';
import {
  groupsListSelector,
  nextPageSelector,
  baseUrlSelector,
} from './selectors';
import PermissionGroupsStateless from './presentational';

const stateToProps = (state, props) => ({
  baseUrl: baseUrlSelector(state, props),
  nextPage: nextPageSelector(state),
  items: groupsListSelector(state),
  createGroupFormName: CREATE_GROUP_FORM_NAME,
  isStaff: isStaffSelector(state),
});

const dispatchToProps = dispatch => ({
  onShowMore: nextPage => dispatch(fetchGroups({ nextPage })),
  onSearch: payload => dispatch(fetchGroups({ q: payload.q })),
  fetchGroups: params => dispatch(fetchGroups(params)),
  deleteGroup: group => dispatch(deletePermissionGroup(group)),
  fetchContentTypes: () => dispatch(fetchContentTypes()),
  onSubmit: values => {
    dispatch(
      createGroup({
        groupName: values.groupName,
        companyId: values.companyId,
        members:
          values.members && values.members.length
            ? values.members.map(member => member.id)
            : [],
      })
    );
    dispatch(ModalHandlers.close(CREATE_GROUP_FORM_NAME));
  },
  getCompanies: bindActionCreators(fetchCompanies, dispatch),
});

const mapStateToProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export class PermissionGroups extends Component {
  componentDidMount() {
    this.props.fetchGroups();
    this.props.fetchContentTypes();
    const { getCompanies } = this.props;
    getCompanies();
  }

  render() {
    return <PermissionGroupsStateless {...this.props} />;
  }
}
PermissionGroups.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  fetchContentTypes: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  isStaff: PropTypes.bool.isRequired,
};

const PermissionGroupsConnected = connect(
  stateToProps,
  dispatchToProps,
  mapStateToProps
)(PermissionGroups);

export default PermissionGroupsConnected;
