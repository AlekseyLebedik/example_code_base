import React, { Component } from 'react';

import styles from './index.module.css';

class CountStatusBarComponent extends Component {
  state = { visible: false };

  setVisible = visible => this.setState({ visible });

  render() {
    return this.state.visible ? (
      <div className={styles.loading}>Loading</div>
    ) : null;
  }
}

export default CountStatusBarComponent;
