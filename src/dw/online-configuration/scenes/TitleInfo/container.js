import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dw/core/helpers/component';
import { getTitleInfoGridData } from './selectors';
import { fetchTitleInfo } from './titleInfoSlice';
import GridStatelessComponent from './gridPresentational';

import { REFRESH_INTERVAL } from './constants';

class TitleInfo extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.refreshInterval = setInterval(
      () => this.props.onLoad(),
      REFRESH_INTERVAL
    );
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  onGridReady = ({ api }) => {
    api.sizeColumnsToFit();
    this.gridApi = api;
  };

  onFilterChange = value => this.gridApi.setQuickFilter(value);

  render() {
    const { titleInfoGrid } = this.props;
    return (
      <GridStatelessComponent
        titleInfo={titleInfoGrid}
        onGridReady={this.onGridReady}
        onFilterChange={this.onFilterChange}
      />
    );
  }
}

const stateToProps = state => ({
  titleInfoGrid: getTitleInfoGridData(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchTitleInfo()),
});

TitleInfo.propTypes = {
  onLoad: PropTypes.func.isRequired,
  titleInfoGrid: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(stateToProps, dispatchToProps, TitleInfo);
