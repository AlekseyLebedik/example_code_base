import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { joinPath } from 'dw/core/helpers/path';

import { itemsSelector, selectedItemSelector } from './selectors';
import MatchmakingStateless from './presentational';

import * as Actions from './actions';

const stateToProps = (state, props) => ({
  items: itemsSelector(state),
  selectedItem: selectedItemSelector(state, props),
  nextPageToken: state.Scenes.Matchmaking.nextPageToken,
  q: state.Scenes.Matchmaking.q,
  baseUrl: props.match.params.id
    ? props.match.path.split(':id')[0]
    : props.match.path,
});

const mapStateToProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onShowMore: () =>
    dispatchProps.fetchItems({ nextPageToken: stateProps.nextPageToken }, true),
  onSearch: query => {
    const { match, history } = ownProps;
    const { params, path } = match;
    const { id } = params;
    if (id && query.q !== id) {
      history.replace(path.split(':id')[0]);
    }
    dispatchProps.fetchItems({ q: query.q });
  },
});

class Matchmaking extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.onSearch({ default: true, q: this.props.match.params.id });
    } else {
      this.props.fetchItems();
    }
  }

  render() {
    return <MatchmakingStateless {...this.props} />;
  }
}
Matchmaking.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const MatchmakingConnected = connect(
  stateToProps,
  Actions,
  mapStateToProps
)(Matchmaking);

const MatchmakingComponent = ({ match: { url } }) => (
  <Switch>
    <Route exact path={url} component={MatchmakingConnected} />
    <Route path={joinPath(url, ':id')} component={MatchmakingConnected} />
  </Switch>
);

MatchmakingComponent.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MatchmakingComponent;
