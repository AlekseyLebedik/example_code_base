import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { connect } from 'dw/core/helpers/component';

import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import ProductsList from '../components/ProductsList';
import ActionBar from '../components/ActionBar';
import {
  userIdSelector,
  storeLabelSelector,
  isClanSelector,
} from '../selectors';
import { getStoreProducts, getStoreItems } from '../actions';

import {
  selectedItemsSelector,
  productsListSelector,
  isLoadingSelector,
} from './selectors';
import { selectStoreProducts, postGrantProducts } from './actions';
import AddButton from './components/AddButton';

class Products extends React.Component {
  componentDidMount() {
    const { validContext, items } = this.props;
    if (validContext && items.length === 0) {
      this.props.getStoreItems();
      this.props.getStoreProducts();
    }
  }

  componentDidUpdate(prevProps) {
    const { validContext } = this.props;
    if (validContext !== prevProps.validContext) {
      this.props.getStoreItems();
      this.props.getStoreProducts();
    }
  }

  render() {
    const { storeName, selectedItems, grantItems, hasEditPermission } =
      this.props;
    return (
      <ProductsList
        {...this.props}
        actionsRender={() => (
          <ActionBar
            ActionButtonComponent={AddButton}
            actionButtonComponentProps={{
              selectedItems,
              hasEditPermission,
              grantItems,
            }}
            label={storeName}
            inventoryContext="store"
          />
        )}
      />
    );
  }
}

const stateToProps = (state, props) => ({
  items: productsListSelector(state),
  isLoading: isLoadingSelector(state),
  selectedItems: selectedItemsSelector(state),
  userId: userIdSelector(state, props),
  storeName: storeLabelSelector(state),
  validContext: makeContextToUseSelector(state, {
    serviceName: Services.Marketplace,
    endpoint: ServiceEndpoints.Marketplace.getLabelledStore,
  }),
  formatDate: formatDateTimeSelector(state),
  isClan: isClanSelector(state, props),
});

const dispatchToProps = {
  onSelectItems: selectStoreProducts,
  postGrantProducts,
  getStoreProducts,
  getStoreItems,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  grantItems: items => {
    const { userId } = stateProps;
    if (!isEmpty(items)) {
      const operation = {
        products: items.map(x => ({
          quantity: 1,
          productID: x.productID,
        })),
      };
      dispatchProps.postGrantProducts(userId, operation, stateProps.isClan);
    }
  },
});

Products.propTypes = {
  items: PropTypes.array.isRequired,
  grantItems: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  getStoreProducts: PropTypes.func.isRequired,
  getStoreItems: PropTypes.func.isRequired,
  userId: PropTypes.string,
  hasEditPermission: PropTypes.bool,
  storeName: PropTypes.string,
  validContext: PropTypes.string,
  isClan: PropTypes.bool.isRequired,
};

Products.defaultProps = {
  userId: null,
  hasEditPermission: false,
  storeName: '',
  validContext: null,
};

export { Products as StoreProductsList };

export default connect(stateToProps, dispatchToProps, Products, mergeProps);
