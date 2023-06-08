import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';

import styles from './index.module.css';

class WarningStatusBarComponent extends Component {
  state = { msg: null };

  setWarning = msg => this.setState({ msg });

  render() {
    return this.state.msg ? (
      <div className={styles.warning}>
        <Icon>warning</Icon>
        {this.state.msg}
      </div>
    ) : null;
  }
}

export default WarningStatusBarComponent;
