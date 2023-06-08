import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchFranchises } from 'dw/reporting/actions';
import { franchisesSelector } from 'dw/reporting/selectors';
import { compose } from 'redux';

import MWInfo from '../MWInfo';
import styles from './index.module.css';

const stateToProps = state => ({
  franchises: franchisesSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchFranchises()),
});

class App extends Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return <MWInfo className={styles.container} />;
  }
}

export const AppConnected = connect(stateToProps, dispatchToProps)(App);

export default compose(withRouter)(AppConnected);
