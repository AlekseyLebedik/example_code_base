import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { joinQueryParams } from 'dw/core/helpers/path';
import {
  groupsListSelector,
  contextSelector,
  makeSelectedItemSelector,
  loadingSelector,
  baseUrlSelector,
} from './selectors';
import ABTestingGroupsStateless from './presentational';

import { fetchGroups } from './actions';

const makeMapStateToProps = () => {
  const selectedItemSelector = makeSelectedItemSelector();
  const mapStateToProps = (state, props) => ({
    baseUrl: baseUrlSelector(state, props),
    context: contextSelector(state),
    selectedItem: selectedItemSelector(state, props),
    loading: loadingSelector(state),
    items: groupsListSelector(state),
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  fetchGroups: context => dispatch(fetchGroups({ context })),
});

export class ABTestingGroups extends Component {
  state = {
    filter: '',
    filteredItems: this.props.items,
    context:
      queryString.parse(this.props.history.location.search).context ||
      this.props.context,
  };

  componentDidMount() {
    this.fetchGroups();
    this.buildURL();
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

  changeContext = event =>
    this.setState({ context: event.target.value }, () => {
      this.fetchGroups();
      this.buildURL(true);
    });

  buildURL = (removeID = false) => {
    const { context } = this.state;
    const { history, match } = this.props;
    if (context) {
      let { url } = match;
      if (removeID && match.params.id) {
        url = url.replace(match.params.id, '');
      }
      history.replace(joinQueryParams(url, { context }));
    }
  };

  fetchGroups = () => {
    const { context } = this.state;
    if (context) {
      this.props.fetchGroups(context);
    }
  };

  render() {
    const { context } = this.state;
    return (
      <ABTestingGroupsStateless
        {...this.props}
        items={this.state.filteredItems}
        onSearch={this.onSearch}
        changeContext={this.changeContext}
        context={context}
      />
    );
  }
}
ABTestingGroups.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  context: PropTypes.string,
};

ABTestingGroups.defaultProps = {
  context: undefined,
};

const ABTestingGroupsConnected = connect(
  makeMapStateToProps,
  dispatchToProps
)(ABTestingGroups);

export default ABTestingGroupsConnected;
