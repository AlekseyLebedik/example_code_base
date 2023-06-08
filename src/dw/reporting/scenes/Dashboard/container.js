import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Error404 from 'dw/core/components/Error404';
import {
  selectedFranchiseSelector,
  franchiseDataSelector,
} from 'dw/reporting/selectors';

import { fetchFranchiseData } from './actions';

import DashboardStateless from './presentational';

const stateToProps = (state, props) => ({
  franchise: selectedFranchiseSelector(state, props),
  franchiseData: franchiseDataSelector(state),
});

const dispatchToProps = {
  fetchFranchiseData,
};

class Dashboard extends Component {
  state = {};

  static getDerivedStateFromProps(props) {
    if (props.match.params.franchiseId !== props.franchiseData.id) {
      props.fetchFranchiseData(props.match.params.franchiseId);
    }
    return null;
  }

  render() {
    if (this.props.franchise !== undefined) {
      return <DashboardStateless {...this.props} />;
    }
    const redirectTo = this.props.match.path.split(':franchiseId')[0];
    return <Error404 redirectTo={redirectTo} />;
  }
}

Dashboard.propTypes = {
  franchise: PropTypes.object,
  match: PropTypes.object.isRequired,
  franchiseData: PropTypes.object,
  fetchFranchiseData: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  franchise: undefined,
  franchiseData: {},
};

export default connect(stateToProps, dispatchToProps)(Dashboard);
