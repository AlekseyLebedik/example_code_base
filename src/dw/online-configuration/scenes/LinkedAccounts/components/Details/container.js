import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAccountsBans } from '../../actions';
import { bannedAccountsSelector } from '../../selectors';

import StatelessComponent from './presentational';

class DetailsComponent extends Component {
  state = {
    selectedItemId: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { fetchBans, selectedItem } = nextProps;
    if (selectedItem && selectedItem.umbrellaID !== prevState.selectedItemId) {
      const { umbrellaID: selectedItemId, accounts } = selectedItem;
      fetchBans(accounts);
      return { selectedItemId };
    }
    return null;
  }

  render() {
    return <StatelessComponent {...this.props} />;
  }
}

DetailsComponent.propTypes = {
  fetchBans: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    umbrellaID: PropTypes.string,
    accounts: PropTypes.arrayOf(PropTypes.object),
  }),
};
DetailsComponent.defaultProps = {
  selectedItem: null,
};

const stateToProps = state => ({
  bannedAccounts: bannedAccountsSelector(state),
});

const dispatchToProps = dispatch => ({
  fetchBans: accounts => dispatch(fetchAccountsBans(accounts)),
});

export default connect(stateToProps, dispatchToProps)(DetailsComponent);
