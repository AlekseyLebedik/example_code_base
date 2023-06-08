import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dw/core/helpers/component';

import { collectionSelector } from './selectors';
import { fetch } from './actions';
import TabWithAsyncTableStateless from './presentational';

const stateToProps = (state, ownProps) => {
  const { tabState } = ownProps;
  return {
    collection: collectionSelector(tabState)(state),
    nextPageToken: tabState.nextPageToken,
    loading: tabState.loading,
  };
};

const dispatchToProps = dispatch => ({
  onLoad: (actionTypePrefix, urlID, params) =>
    dispatch(fetch(actionTypePrefix, urlID, params)),
});

const TabWithAsyncTable = props => {
  const handleFormatData = successCallback => (data, nextPageToken) => {
    const { mergeData, mergeKey } = props;
    const mergedItems = data.map(item => ({
      ...item,
      ...mergeData[item[mergeKey]],
    }));
    successCallback(mergedItems, nextPageToken);
  };

  const onLoadData = (nextPageToken, { successCallback, ...params }) => {
    const { onLoad, actionTypePrefix, match, mergeData } = props;
    const callback = mergeData
      ? handleFormatData(successCallback)
      : successCallback;
    onLoad(actionTypePrefix, match.params.id, {
      ...params,
      successCallback: callback,
      nextPageToken,
    });
  };

  return <TabWithAsyncTableStateless {...props} onLoadData={onLoadData} />;
};

TabWithAsyncTable.propTypes = {
  ...TabWithAsyncTableStateless.propTypes,
  onLoad: PropTypes.func.isRequired,
  mergeData: PropTypes.object,
  mergeKey: PropTypes.string,
};
TabWithAsyncTable.defaultProps = {
  mergeData: null,
  mergeKey: null,
};

export default connect(stateToProps, dispatchToProps, TabWithAsyncTable);
