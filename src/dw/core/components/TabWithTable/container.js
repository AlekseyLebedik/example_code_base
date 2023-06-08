import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dw/core/helpers/component';

import { fetch } from './actions';
import TabWithTableStateless from './presentational';
import { collectionSelector } from './selectors';

const stateToProps = (state, props) => {
  const { tabState } = props;
  return {
    ...props,
    collection: collectionSelector(tabState)(state),
    nextPageToken: tabState.nextPageToken,
    loading: tabState.loading,
  };
};

const dispatchToProps = dispatch => ({
  onLoad: (actionTypePrefix, urlID) => dispatch(fetch(actionTypePrefix, urlID)),
  onShowMore: (actionTypePrefix, urlID, nextPageToken) =>
    dispatch(fetch(actionTypePrefix, urlID, { nextPageToken }, true)),
  onSearch: (actionTypePrefix, urlID, payload) => {
    const params = payload.default ? { q: payload.q } : payload.values;
    dispatch(fetch(actionTypePrefix, urlID, params));
  },
});

const mergeProps = (stateProps, dispatchProps) => {
  const urlID = stateProps.match.params.id;

  return {
    ...stateProps,
    onLoad: () => dispatchProps.onLoad(stateProps.actionTypePrefix, urlID),
    onShowMore: token =>
      dispatchProps.onShowMore(stateProps.actionTypePrefix, urlID, token),
    onSearch: payload =>
      dispatchProps.onSearch(stateProps.actionTypePrefix, urlID, payload),
  };
};

class TabWithTable extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return <TabWithTableStateless {...this.props} />;
  }
}

TabWithTable.propTypes = {
  ...TabWithTableStateless.propTypes,
  onLoad: PropTypes.func,
  onShowMore: PropTypes.func,
  onSearch: PropTypes.func,
};
TabWithTable.defaultProps = {
  onLoad: () => {},
  onShowMore: () => {},
  onSearch: () => {},
};

export default connect(stateToProps, dispatchToProps, TabWithTable, mergeProps);
