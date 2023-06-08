import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { serviceEnabledSelector } from 'dw/core/helpers/title-env-selectors';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';

import ActiveStoreTabsStatelessComponent from './presentational';
import { tabChange } from './actions';
import * as selectors from './selectors';

const stateToProps = state => ({
  activeStoreDetails: selectors.activeStoreDetailsSelector(state),
  currenciesState: selectors.TabCurrenciesSelector(state),
  entitlementsState: selectors.TabEntitlementsSelector(state),
  exchangeState: selectors.TabExchangeSelector(state),
  exchangeServiceEnabled: serviceEnabledSelector(state)(SERVICE_NAMES.EXCHANGE),
  formatDateTime: formatDateTimeSelector(state),
  itemsState: selectors.TabItemsSelector(state),
  pawnableItemsState: selectors.TabPawnableItemsSelector(state),
  productsState: selectors.TabProductsSelector(state),
  skusState: selectors.TabSkusSelector(state),
});

const dispatchToProps = dispatch => ({
  onChange: key => dispatch(tabChange(key)),
});

ActiveStoreTabsStatelessComponent.propTypes = {
  ...ActiveStoreTabsStatelessComponent.propTypes,
  onChange: PropTypes.func.isRequired,
};

export default compose(connect(stateToProps, dispatchToProps))(
  ActiveStoreTabsStatelessComponent
);
