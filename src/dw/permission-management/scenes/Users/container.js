import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { isStaffSelector } from '@demonware/devzone-core/modules/user/selectors';

import * as actions from './actions';
import { fetchCompanies } from '../actionCreators';
import {
  usersListSelector,
  selectedItemSelector,
  nextPageSelector,
  querySelector,
  userListLoadingSelector,
} from './selectors';
import UsersStateless from './presentational';
import { GROUP_TAB } from './constants';

export class Users extends Component {
  state = {
    selectedTab: GROUP_TAB,
    items: [],
  };

  componentDidMount() {
    const { onLoad, match, isStaff, fetchAvailableGroups } = this.props;
    const userID = match.params.id;
    onLoad(userID);
    if (!isStaff) {
      fetchAvailableGroups();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { items, match, history } = nextProps;

    if (items && items !== prevState.items && items.length === 1) {
      const path = generatePath(match.path, {
        ...match.params,
        id: items[0].id,
      });
      history.push(path);
      return { items };
    }
    return null;
  }

  onSearch = payload => {
    const { match, history, location, onSearch } = this.props;
    if (match.params.id) {
      history.push(location.pathname.replace(match.params.id, ''));
    }
    onSearch(payload);
  };

  onTabChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    const { selectedTab } = this.state;
    const newProps = {
      ...this.props,
      selectedTab,
      onTabChange: this.onTabChange,
      onSearch: this.onSearch,
    };
    return <UsersStateless {...newProps} />;
  }
}

Users.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onLoad: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  fetchAvailableGroups: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isStaff: PropTypes.bool.isRequired,
  itemsLoading: PropTypes.bool,
};
Users.defaultProps = {
  items: [],
  itemsLoading: false,
};

const stateToProps = (state, props) => ({
  items: usersListSelector(state),
  selectedItem: selectedItemSelector(state, props),
  nextPage: nextPageSelector(state),
  q: querySelector(state),
  isStaff: isStaffSelector(state),
  itemsLoading: userListLoadingSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: q => {
    dispatch(actions.fetchUsers(!q ? {} : { q }));
    dispatch(actions.fetchContentTypes());
    dispatch(fetchCompanies());
  },
  onShowMore: nextPage => dispatch(actions.fetchUsers({ nextPage })),
  onSearch: payload => dispatch(actions.fetchUsers({ q: payload.q })),
  fetchAvailableGroups: () => dispatch(actions.fetchAvailableGroups()),
});

const UsersConnected = connect(stateToProps, dispatchToProps)(Users);

export default UsersConnected;
