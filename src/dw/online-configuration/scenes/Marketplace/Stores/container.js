import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { submit, isSubmitting } from 'redux-form';

import { joinQueryParam } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import { getReactBaseURL } from 'dw/online-configuration/selectors';

import { FORM_NAME as UploadStoreFormName } from './components/UploadStoreForm/constants';
import { FORM_NAME as PropagateStoreFormName } from './components/StoreDetails/components/PropagateStoreForm/constants';
import marketplaceStoresSelector, {
  marketplaceStoresLoadingSelector,
  selectedStore,
  selectedStoreLoadingSelector,
  isPropagateStoreLoadingSelector,
} from './selectors';
import * as A from './actions';
import StoresStatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  history: props.history,
  match: props.match,
  stores: marketplaceStoresSelector(state),
  storesLoading: marketplaceStoresLoadingSelector(state),
  nextPageToken: state.Scenes.Marketplace.Stores.nextPageToken,
  q: state.Scenes.Marketplace.Stores.q,
  selectedStore: selectedStore(state),
  selectedStoreLoading: selectedStoreLoadingSelector(state),
  onSearch: payload =>
    props.history.push(
      `${getReactBaseURL(state)}marketplace/stores/?q=${payload.q}`
    ),
  uploadStoreModalProps: {
    uploadStoreModalVisible:
      state.Scenes.Marketplace.Stores.uploadStoreModalVisible,
    uploadStoreModalLoading:
      state.Scenes.Marketplace.Stores.uploadStoreModalLoading,
  },
  storeDetailProps: {
    propagateStoreModalProps: {
      propagateStoreModalVisible:
        state.Scenes.Marketplace.Stores.StoreDetail.propagateStoreModalVisible,
      submitting: isSubmitting(PropagateStoreFormName)(state),
    },
    propagateData: {
      isPropagateStoreLoading: isPropagateStoreLoadingSelector(state),
    },
  },
});

const dispatchToProps = dispatch => ({
  onLoad: query => dispatch(A.fetchStores(!query ? {} : { q: query })),
  onShowMore: (nextPageToken, q) =>
    dispatch(A.fetchStores({ nextPageToken, q }, true)),
  onClickListItem: store => dispatch(A.storesListItemClick(store)),
  onSearch: q => dispatch(A.fetchStores({ q })),
  uploadStoreEvents: {
    openUploadStoreModalHandler: () => dispatch(A.openUploadStoreModal()),
    closeUploadStoreModalHandler: () => dispatch(A.closeUploadStoreModal()),
    uploadOnRemoteSubmit: () => dispatch(submit(UploadStoreFormName)),
    onUploadStoreHandler: (values, params = {}) =>
      new Promise((_, reject) =>
        dispatch(A.uploadStore(values, { ...params, reject }))
      ),
  },
  storeDetailEvents: {
    propagateStoreEvents: {
      openPropagateStoreModalHandler: () =>
        dispatch(A.openPropagateStoreModal()),
      closePropagateStoreModalHandler: () =>
        dispatch(A.closePropagateStoreModal()),
      propagateOnRemoteSubmit: () => dispatch(submit(PropagateStoreFormName)),
      onPropagateStoreHandler: values => dispatch(A.propagateStore(values)),
    },
    onSetActiveStore: label => dispatch(A.setActiveStore(label)),
    onClearStoreCache: label => dispatch(A.clearStoreCache(label)),
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSearch: payload => {
    const { history, match } = stateProps;
    const path = !payload.q
      ? match.url
      : joinQueryParam(match.url, 'q', payload.q);
    history.replace(path);
    dispatchProps.onSearch(payload.q);
  },
});

class Stores extends React.Component {
  state = { propagateValues: {} };

  componentDidMount() {
    const { onLoad, history, match } = this.props;
    const { q } = queryString.parse(history.location.search);
    const label = match.params.id;

    if (!q && label) {
      onLoad(label);
    } else {
      onLoad(q);
    }
  }

  onPropagateStore = values => {
    this.setState({ propagateValues: values });
    this.props.storeDetailEvents.propagateStoreEvents.onPropagateStoreHandler(
      values
    );
  };

  render() {
    const { propagateValues } = this.state;
    const newProps = {
      ...this.props,
      storeDetailEvents: {
        ...this.props.storeDetailEvents,
        propagateStoreEvents: {
          ...this.props.storeDetailEvents.propagateStoreEvents,
          onPropagateStoreHandler: this.onPropagateStore,
        },
      },
      storeDetailProps: {
        ...this.props.storeDetailProps,
        propagateData: {
          ...this.props.storeDetailProps.propagateData,
          propagateValues,
        },
      },
    };
    return <StoresStatelessComponent {...newProps} />;
  }
}

Stores.propTypes = {
  ...StoresStatelessComponent.propTypes,
  onLoad: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, Stores, mergeProps);
