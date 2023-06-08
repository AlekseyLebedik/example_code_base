import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dw/core/helpers/component';
import { getReactBaseURL } from 'dw/online-configuration/selectors';

import activeStoreSelector from './selectors';
import { fetchActiveStore } from './actions';
import ActiveStoreStatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  activeStore: activeStoreSelector(state),
  onClickStoreLabel: label =>
    props.history.push(
      `${getReactBaseURL(state)}marketplace/stores/?q=${label}`
    ),
});

const dispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchActiveStore());
  },
});

class ActiveStore extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return ActiveStoreStatelessComponent(this.props);
  }
}

ActiveStore.propTypes = {
  ...ActiveStoreStatelessComponent.propTypes,
  onLoad: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, ActiveStore);
