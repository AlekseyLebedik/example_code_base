import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getReactBaseURL } from 'dw/online-configuration/selectors';
import { connect } from 'dw/core/helpers/component';
import { fetchServersAllocation } from './actions';
import ServerInventoryStateless from './presentational';
import {
  getDisableServerList,
  getServerAllocationLoading,
  getContexts,
  getBuildNames,
  getDataCenters,
  getSelectedContext,
  getSelectedBuildName,
  getSelectedDataCenter,
  getCurrentTitle,
  getPreviousTitle,
  getCurrentEnv,
} from './selectors';

const stateToProps = (state, props) => ({
  disableServerList: getDisableServerList(state, props),
  previousTitle: getPreviousTitle(state),
  currentTitle: getCurrentTitle(state),
  currentEnv: getCurrentEnv(state),
  contexts: getContexts(state),
  buildNames: getBuildNames(state, props),
  dataCenters: getDataCenters(state, props),
  serversAllocationLoading: getServerAllocationLoading(state),
  selectedContext: getSelectedContext(state, props),
  selectedBuildName: getSelectedBuildName(state, props),
  selectedDataCenter: getSelectedDataCenter(state, props),
  baseUrl: `${getReactBaseURL(state)}matchmaking/server-inventory/`,
});

const dispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchServersAllocation());
  },
});

class ServerInventory extends Component {
  componentDidMount() {
    this.props.onLoad();

    if (
      (this.props.previousTitle.currentTitle &&
        this.props.previousTitle.currentTitle.name !==
          this.props.currentTitle.name) ||
      (this.props.previousTitle.currentEnv &&
        this.props.previousTitle.currentEnv.type !== this.props.currentEnv.type)
    ) {
      this.props.history.push(this.props.baseUrl);
    }
  }

  render() {
    return <ServerInventoryStateless {...this.props} />;
  }
}

ServerInventory.propTypes = {
  ...ServerInventoryStateless.propTypes,
  onLoad: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, ServerInventory);
