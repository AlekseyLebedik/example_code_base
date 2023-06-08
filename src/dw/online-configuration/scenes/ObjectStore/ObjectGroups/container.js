import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { compose, bindActionCreators } from 'redux';

import {
  fetchGroups,
  fetchCategories,
  replaceUsers,
  deleteGroup,
} from './actions';
import {
  groupsListSelector,
  selectedItemSelector,
  baseUrlSelector,
} from './selectors';
import ObjectGroupsStateless from './presentational';

const stateToProps = (state, props) => ({
  baseUrl: baseUrlSelector(state, props),
  selectedItem: selectedItemSelector(state, props),
  items: groupsListSelector(state),
});

const dispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups()),
  fetchCategories: () => dispatch(fetchCategories()),
  replaceUsers: bindActionCreators(replaceUsers, dispatch),
  deleteGroup: bindActionCreators(deleteGroup, dispatch),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selectedItemId } = ownProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSubmitReplaceUsers: values =>
      dispatchProps.replaceUsers(selectedItemId, values),
  };
};

export class ObjectGroups extends Component {
  state = {
    filter: '',
    filteredItems: this.props.items,
  };

  componentDidMount() {
    this.props.fetchGroups();
    this.props.fetchCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.onSearch(this.state.filter);
    }
  }

  onSearch = search => {
    this.setState({
      filter: search,
      filteredItems: this.props.items.filter(
        i => i.groupName.search(new RegExp(search, 'i')) >= 0
      ),
    });
  };

  render() {
    return (
      <ObjectGroupsStateless
        {...this.props}
        items={this.state.filteredItems}
        onSearch={this.onSearch}
      />
    );
  }
}
ObjectGroups.propTypes = {
  items: PropTypes.array.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

const ObjectGroupsConnected = compose(
  connect(stateToProps, dispatchToProps, mergeProps)
)(ObjectGroups);

export default ObjectGroupsConnected;
