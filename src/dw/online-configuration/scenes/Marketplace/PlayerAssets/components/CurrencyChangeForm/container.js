import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import mapKeys from 'lodash/mapKeys';
import { withRouter } from 'react-router-dom';

import { postAssetChanges } from '../../actions';
import { isClanSelector } from '../../selectors';
import CurrencyChangeFormStateless from './presentational';

const stateToProps = (state, props) => ({
  initialValues: {
    [props.fieldName]: 0,
  },
  isClan: isClanSelector(state, props),
});

const dispatchToProps = {
  postAssetChanges,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSubmit: (values, _, props) => {
    const { form, userId } = props;
    const balanceOperations = {
      grants: { currencies: [] },
      fees: { currencies: [] },
    };

    mapKeys(values.balances, (value, key) => {
      const signedBalance = parseInt(value, 10);
      const currencyID = parseInt(key, 10);
      if (signedBalance === 0 || Number.isNaN(signedBalance)) return;

      const amount = Math.abs(signedBalance);
      const operation = { currencyID, amount };
      if (signedBalance > 0) {
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

export default compose(
  withRouter,
  connect(stateToProps, dispatchToProps, mergeProps),
  reduxForm({})
)(CurrencyChangeFormStateless);
