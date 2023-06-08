import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import isEmpty from 'lodash/isEmpty';
import mapKeys from 'lodash/mapKeys';
import get from 'lodash/get';

import { connect } from 'dw/core/helpers/component';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import PlayerBalancesStateless from './presentational';
import { userIdSelector, isClanSelector } from '../selectors';

import {
  selectedBalancesSelector,
  playerBalancesSelector,
  isLoadingSelector,
  balancesByCurrencyID,
} from './selectors';
import { selectStoreCurrencies, getPlayerBalances } from './actions';
import { ALL_BALANCES_EDIT_NAME } from './constants';

import { postAssetChanges } from '../actions';

class PlayerBalances extends Component {
  state = {
    isDeleteModalOpen: false,
    isEditing: false,
  };

  componentDidMount() {
    const { userId, validContext, isClan } = this.props;
    if (userId && validContext) {
      this.props.getPlayerBalances(userId, isClan);
    }
  }

  componentDidUpdate(prevProps) {
    const { userId, validContext, searchInput, isClan } = this.props;

    if (
      userId &&
      validContext &&
      (userId !== prevProps.userId || validContext !== prevProps.validContext)
    ) {
      this.props.getPlayerBalances(userId, isClan);
    }

    if (prevProps.searchInput !== searchInput) {
      // eslint-disable-next-line
      this.gridApi?.setQuickFilter(searchInput);
    }
  }

  onGridReady = params => {
    const { searchInput } = this.props;
    this.gridApi = params.api;
    setTimeout(() => {
      this.gridApi.setQuickFilter(searchInput);
    }, 500);
  };

  onFilterTextBoxChanged = value => {
    this.gridApi.setQuickFilter(value);
  };

  handleToggleDeleteModal = () => {
    this.setState(previousState => ({
      isDeleteModalOpen: !previousState.isDeleteModalOpen,
    }));
  };

  handleSubmitDeleteModal = () => {
    this.props.deleteCurrencies(this.props.selectedBalances);
    this.setState({ isDeleteModalOpen: false });
  };

  handleToggleEdit = () => {
    this.setState(previousState => ({ isEditing: !previousState.isEditing }));
    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    }, 500);
  };

  handleSubmitEdit = values => {
    this.props.onSetFormSubmit(values, this.props);
    this.handleToggleEdit();
  };

  render() {
    return (
      <PlayerBalancesStateless
        onToggleDeleteModal={this.handleToggleDeleteModal}
        onSubmitDelete={this.handleSubmitDeleteModal}
        onToggleEdit={this.handleToggleEdit}
        onSubmitEdit={this.handleSubmitEdit}
        isEditing={this.state.isEditing}
        isDeleteModalOpen={this.state.isDeleteModalOpen}
        onGridReady={this.onGridReady}
        {...this.props}
      />
    );
  }
}

const stateToProps = (state, props) => {
  const isClan = isClanSelector(state, props);
  const validContext = isClan
    ? makeContextToUseSelector(state, {
        serviceName: Services.Marketplace,
        endpoint: ServiceEndpoints.Marketplace.getClanBalances,
      })
    : makeContextToUseSelector(state, {
        serviceName: Services.Marketplace,
        endpoint: ServiceEndpoints.Marketplace.getPlayerBalances,
      });
  return {
    initialValues: { balances: balancesByCurrencyID(state) },
    playerBalances: playerBalancesSelector(state),
    selectedBalances: selectedBalancesSelector(state),
    userId: userIdSelector(state, props),
    isLoading: isLoadingSelector(state),
    validContext,
    formatDate: formatDateTimeSelector(state),
    isClan,
  };
};

const dispatchToProps = {
  onSelectItems: selectStoreCurrencies,
  postAssetChanges,
  getPlayerBalances,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  deleteCurrencies: currencies => {
    const { userId } = stateProps;
    if (!isEmpty(currencies)) {
      const operation = {
        fees: {
          currencies: currencies.map(x => ({
            amount: x.amount,
            currencyID: x.currencyID,
          })),
        },
      };
      dispatchProps.postAssetChanges(
        undefined,
        userId,
        operation,
        null,
        stateProps.isClan
      );
    }
  },
  onSetFormSubmit: values => {
    const { userId } = ownProps;
    const { form, initialValues } = stateProps;
    const originalBalances = initialValues.balances;
    const balanceOperations = {
      grants: { currencies: [] },
      fees: { currencies: [] },
    };

    mapKeys(values.balances, (value, key) => {
      const signedBalance = parseInt(value, 10);
      const currencyID = parseInt(key, 10);
      const originalSignedBalance = get(originalBalances, currencyID, 0);
      if (
        Number.isNaN(signedBalance) ||
        signedBalance === originalSignedBalance
      )
        return;

      const amount = Math.abs(signedBalance - originalSignedBalance);
      const operation = { currencyID, amount };
      if (signedBalance > originalSignedBalance) {
        balanceOperations.grants.currencies.push(operation);
      } else {
        balanceOperations.fees.currencies.push(operation);
      }
    });
    dispatchProps.postAssetChanges(
      form,
      userId,
      balanceOperations,
      null,
      stateProps.isClan
    );
  },
});

PlayerBalances.propTypes = {
  deleteCurrencies: PropTypes.func.isRequired,
  selectedBalances: PropTypes.array.isRequired,
  getPlayerBalances: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSetFormSubmit: PropTypes.func.isRequired,
  validContext: PropTypes.string,
  hasEditPermission: PropTypes.bool,
  searchInput: PropTypes.string,
  isClan: PropTypes.bool.isRequired,
};

PlayerBalances.defaultProps = {
  userId: null,
  validContext: null,
  hasEditPermission: false,
  searchInput: '',
};

export default connect(
  stateToProps,
  dispatchToProps,
  reduxForm({
    form: ALL_BALANCES_EDIT_NAME,
    enableReinitialize: true,
  })(PlayerBalances),
  mergeProps
);
