import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

class CountStatusBarComponent extends Component {
  static propTypes = {
    api: PropTypes.object.isRequired,
  };

  state = { count: 0, hasMore: true };

  updateRowsCount = nextPageToken => {
    let totalRowCount = 0;
    this.props.api.forEachLeafNode(() => {
      totalRowCount += 1;
    });
    this.setState({
      hasMore: Boolean(nextPageToken),
      count: totalRowCount,
    });
  };

  render() {
    return this.state.hasMore ? (
      <div className={styles.container}>
        <strong>{this.state.count.toLocaleString('en-US')}</strong> Items shown
        {this.state.count > 0 && ' (scroll down to get more)'}
      </div>
    ) : (
      <div className={styles.container}>
        Total Rows: <strong>{this.state.count.toLocaleString('en-US')}</strong>
      </div>
    );
  }
}

export default CountStatusBarComponent;
