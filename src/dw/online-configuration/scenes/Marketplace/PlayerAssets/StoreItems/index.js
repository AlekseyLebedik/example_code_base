import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'dw/core/helpers/component';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import { postAssetChanges, getStoreItems } from '../actions';
import InventoryItems from '../components/InventoryItems';
import ActionBar from '../components/ActionBar';
import {
  userIdSelector,
  storeLabelSelector,
  isClanSelector,
} from '../selectors';
import { muiStyles } from '../styles';
import AddButton from './components/AddButton';
import {
  selectedItemsSelector,
  storeItemsSelector,
  isLoadingSelector,
  missingItemsSelector,
} from './selectors';
import { selectStoreItems } from './actions';

import styles from './index.module.css';

class StoreItems extends Component {
  componentDidMount() {
    const { validContext, items } = this.props;
    if (validContext && items.length === 0) {
      this.props.getStoreItems();
    }
  }

  componentDidUpdate(prevProps) {
    const { validContext } = this.props;
    if (validContext !== prevProps.validContext) {
      this.props.getStoreItems();
    }
  }

  render() {
    const {
      missingItems,
      grantItems,
      selectedItems,
      storeLabel,
      classes,
      hasEditPermission,
      externalActions,
    } = this.props;
    const noSelectedItems = selectedItems && selectedItems.length === 0;
    return (
      <InventoryItems
        darkMode
        columnsDefs={[
          {
            field: 'maxQuantity',
            menuTabs: ['filterMenuTab', 'columnsMenuTab'],
            filter: 'agNumberColumnFilter',
          },
        ]}
        {...this.props}
        actionsRender={() =>
          externalActions ? null : (
            <ActionBar
              ActionButtonComponent={AddButton}
              actionButtonComponentProps={{
                selectedItems,
                hasEditPermission,
                grantItems,
              }}
              ActionButtonProps={{}}
              label={storeLabel}
              inventoryContext="store"
              actions={
                <div
                  className={classNames({
                    [styles.hidden]: noSelectedItems,
                  })}
                >
                  <ConfirmActionComponent
                    tooltip="Add all missing items"
                    confirm={{
                      title: 'Confirm Add Missing',
                      confirmMsg: (
                        <div key="dialogDiv">
                          Are you sure you want to add the missing items to the
                          player?
                          <br />
                        </div>
                      ),
                      mainButtonLabel: 'Confirm',
                      destructive: false,
                    }}
                    component="IconButton"
                    focusRipple
                    color="primary"
                    onClick={() => grantItems(missingItems)}
                    classes={{
                      root: classNames(classes.rootButton, styles.hidden),
                      disabled: classes.disabledButton,
                    }}
                    disabled={!this.props.hasEditPermission}
                  >
                    <Icon>playlist_add_check</Icon>
                  </ConfirmActionComponent>
                </div>
              }
            />
          )
        }
      />
    );
  }
}

StoreItems.propTypes = {
  items: PropTypes.array.isRequired,
  grantItems: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  missingItems: PropTypes.array.isRequired,
  getStoreItems: PropTypes.func.isRequired,
  userId: PropTypes.string,
  hasEditPermission: PropTypes.bool,
  storeLabel: PropTypes.string,
  validContext: PropTypes.string,
  classes: PropTypes.object,
  externalActions: PropTypes.bool,
};

StoreItems.defaultProps = {
  userId: null,
  hasEditPermission: false,
  storeLabel: '',
  validContext: null,
  classes: {},
  externalActions: false,
};

const stateToProps = (state, props) => ({
  items: storeItemsSelector(state),
  isLoading: isLoadingSelector(state),
  selectedItems: selectedItemsSelector(state),
  userId: userIdSelector(state, props),
  missingItems: missingItemsSelector(state),
  storeLabel: storeLabelSelector(state),
  validContext: makeContextToUseSelector(state, {
    serviceName: Services.Marketplace,
    exndpoint: ServiceEndpoints.Marketplace.getLabelledStore,
  }),
  formatDate: formatDateTimeSelector(state),
  isClan: isClanSelector(state, props),
});

const dispatchToProps = {
  onSelectItems: selectStoreItems,
  postAssetChanges,
  getStoreItems,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  grantItems: (items, quantity = 1) => {
    const { userId } = stateProps;
    if (!isEmpty(items)) {
      const operation = {
        grants: {
          items: items.map(x => ({
            quantity,
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

export { StoreItems as StoreItemsDisconnected };

export default connect(
  stateToProps,
  dispatchToProps,
  withStyles(muiStyles)(StoreItems),
  mergeProps
);
