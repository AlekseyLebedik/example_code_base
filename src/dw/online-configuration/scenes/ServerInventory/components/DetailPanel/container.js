import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DetailPanelPresentational from './presentational';
import * as actions from './actions';
import * as selectors from './selectors';

class DetailPanel extends React.Component {
  state = { selectedServerState: this.props.serverState, displayChart: false };

  componentDidMount() {
    this.loadServers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datacenter !== this.props.datacenter) {
      this.loadServers();
    }
  }

  handleServerStateChange = (_, selectedServerState) => {
    this.setState({ selectedServerState }, this.loadServers);
  };

  // eslint-disable-next-line react/sort-comp
  setChartDisplay = status => {
    this.setState({ displayChart: status });
  };

  handleViewChartClick = this.setChartDisplay.bind(this, true);

  handleViewListClick = this.setChartDisplay.bind(this, false);

  loadServers() {
    const { load, context, buildname, datacenter, propMissing } = this.props;
    const { selectedServerState: state } = this.state;

    if (propMissing) return;
    load({ context, buildname, datacenter, state });
  }

  render() {
    return (
      <DetailPanelPresentational
        {...this.props}
        serverState={this.state.selectedServerState}
        onServerStateChange={this.handleServerStateChange}
        displayChart={this.state.displayChart}
        onViewChartClick={this.handleViewChartClick}
        onViewListClick={this.handleViewListClick}
      />
    );
  }
}

DetailPanel.propTypes = {
  ...DetailPanelPresentational.propTypes,
  propMissing: PropTypes.bool.isRequired,
  context: PropTypes.string,
  buildname: PropTypes.string,
  datacenter: PropTypes.string,
};

DetailPanel.defaultProps = {
  ...DetailPanelPresentational.defaultProps,
  context: null,
  buildname: null,
  datacenter: null,
};

const mapStateToProps = (state, props) => ({
  servers: selectors.getServerList(state),
  loading: selectors.getLoading(state, props),
  empty: selectors.getEmpty(state, props),
  propMissing: selectors.getPropMissing(state, props),
});

const mapDispatchToProps = {
  load: actions.fetchMMServerList,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPanel);
