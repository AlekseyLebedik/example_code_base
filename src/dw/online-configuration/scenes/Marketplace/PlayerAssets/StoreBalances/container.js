import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import { getCurrencies } from '../actions';
import StoreBalancesStatelessComponent from './presentational';
import { isLoadingSelector, storeValuesBalancesSelector } from './selectors';

class StoreBalances extends React.Component {
  componentDidMount() {
    const { validContext } = this.props;
    if (validContext) {
      this.props.getCurrencies();
    }
  }

  componentDidUpdate(prevProps) {
    const { searchInput } = this.props;
    if (prevProps.searchInput !== searchInput) {
      // eslint-disable-next-line
      this.gridApi?.setQuickFilter(searchInput);
    }

    const { validContext } = this.props;
    if (validContext !== prevProps.validContext) {
      this.props.getCurrencies();
    }
  }

  onGridReady = params => {
    const { searchInput } = this.props;
    this.gridApi = params.api;
    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
      this.gridApi.setQuickFilter(searchInput);
    }, 500);
    if (this.props.onGridReady) this.props.onGridReady(params);
  };

  render() {
    return (
      <StoreBalancesStatelessComponent
        {...this.props}
        onGridReady={this.onGridReady}
      />
    );
  }
}

StoreBalances.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasEditPermission: PropTypes.bool,
  validContext: PropTypes.string,
  searchInput: PropTypes.string,
  onGridReady: PropTypes.func,
};

StoreBalances.defaultProps = {
  userId: null,
  hasEditPermission: false,
  validContext: null,
  searchInput: '',
  onGridReady: undefined,
};

const stateToProps = state => ({
  storeBalances: storeValuesBalancesSelector(state),
  validContext: makeContextToUseSelector(state, {
    serviceName: Services.Marketplace,
    exndpoint: ServiceEndpoints.Marketplace.getLabelledStore,
  }),
  isLoading: isLoadingSelector(state),
  formatDate: formatDateTimeSelector(state),
});

const dispatchToProps = {
  getCurrencies,
};

export default compose(
  withRouter,
  connect(stateToProps, dispatchToProps)
)(StoreBalances);
