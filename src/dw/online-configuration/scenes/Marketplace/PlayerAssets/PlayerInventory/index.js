import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import isEmpty from 'lodash/isEmpty';

import { connect } from 'dw/core/helpers/component';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { transformObjectToList } from 'dw/core/helpers/lists';

import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import { selectPlayerItems, getPlayerItems } from './actions';

import InventoryItems from '../components/InventoryItems';
import ActionBar from '../components/ActionBar';
import { RARITY_TYPES } from '../constants';
import { postAssetChanges } from '../actions';
import DeleteButton from './components/DeleteButton';
import {
  invalidItemsSelector,
  playerItemsSelector,
  isLoadingSelector,
  selectedItemsSelector,
  maxQuantitySelector,
} from './selectors';

import { isClanSelector } from '../selectors';

const getRarityTypes = memoizeOne(() =>
  transformObjectToList(RARITY_TYPES).filter(x => x.key > 0)
);

export class PlayerItemsStateless extends React.Component {
  state = {
    checked: false,
  };

  componentDidMount() {
    const { userId, validContext, isClan } = this.props;
    if (userId && validContext) {
      this.props.getPlayerItems(userId, isClan);
    }
  }

  componentDidUpdate(prevProps) {
    const { userId, validContext, isClan } = this.props;

    if (
      userId &&
      validContext &&
      (userId !== prevProps.userId || validContext !== prevProps.validContext)
    ) {
      this.props.getPlayerItems(userId, isClan);
    }
  }

  handleChecked = () =>
    this.setState(prevState => ({ checked: !prevState.checked }));

  render() {
    const {
      selectedItems,
      maxQuantity,
      hasEditPermission,
      invalidItems,
      onRemoveItems,
    } = this.props;
    return (
      <InventoryItems
        {...this.props}
        checked={this.state.checked}
        actionsRender={() => (
          <ActionBar
            ActionButtonComponent={DeleteButton}
            actionButtonComponentProps={{
              selectedItems,
              maxQuantity,
              hasEditPermission,
              onRemoveItems,
            }}
            label={this.props.userId}
            inventoryContext="player"
            checked={this.state.checked}
            invalidItems={invalidItems}
            handleChecked={this.handleChecked}
          />
        )}
      />
    );
  }
}

PlayerItemsStateless.propTypes = {
  onRemoveItems: PropTypes.func,
  selectedItems: PropTypes.array,
  hasEditPermission: PropTypes.bool,
  getPlayerItems: PropTypes.func.isRequired,
  invalidItems: PropTypes.arrayOf(PropTypes.object),
  maxQuantity: PropTypes.number.isRequired,
  userId: PropTypes.string,
  validContext: PropTypes.string,
};

PlayerItemsStateless.defaultProps = {
  invalidItems: [],
  userId: null,
  validContext: null,
  onRemoveItems: null,
  selectedItems: [],
  hasEditPermission: false,
};

const stateToProps = (state, props) => {
  const isClan = isClanSelector(state, props);
  const validContext = isClan
    ? makeContextToUseSelector(state, {
        serviceName: Services.Marketplace,
        endpoint: ServiceEndpoints.Marketplace.getClanItems,
      })
    : makeContextToUseSelector(state, {
        serviceName: Services.Marketplace,
        endpoint: ServiceEndpoints.Marketplace.getPlayerItems,
      });
  return {
    invalidItems: invalidItemsSelector(state),
    formatDate: formatDateTimeSelector(state),
    items: playerItemsSelector(state),
    rarityTypes: getRarityTypes(),
    isLoading: isLoadingSelector(state),
    selectedItems: selectedItemsSelector(state),
    maxQuantity: maxQuantitySelector(state),
    validContext,
    isClan,
  };
};

const dispatchToProps = {
  getPlayerItems,
  onSelectItems: selectPlayerItems,
  postAssetChanges,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onRemoveItems: (items, quantity) => {
    const { userId } = ownProps;
    if (!isEmpty(items)) {
      const operation = {
        fees: {
          items: items.map(x => ({
            quantity: quantity === 'all' ? x.quantity : quantity,
            itemID: x.itemID,
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
});

PlayerItemsStateless.propTypes = {
  onRemoveItems: PropTypes.func,
  selectedItems: PropTypes.array,
  hasEditPermission: PropTypes.bool,
  isClan: PropTypes.bool.isRequired,
};

PlayerItemsStateless.defaultProps = {
  onRemoveItems: null,
  selectedItems: [],
  hasEditPermission: false,
};

export default connect(
  stateToProps,
  dispatchToProps,
  PlayerItemsStateless,
  mergeProps
);
