import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

class FilteredStatusBarComponent extends Component {
  static propTypes = {
    api: PropTypes.object.isRequired,
  };

  state = { count: 0, visible: false };

  componentDidMount() {
    this.props.api.addEventListener('filterChanged', this.updateRowsCount);
    this.props.api.addEventListener('rowDataUpdated', this.updateRowsCount);
  }

  getTotalRowCount = () => {
    let totalRowCount = 0;
    this.props.api.forEachLeafNode(() => {
      totalRowCount += 1;
    });
    return totalRowCount;
  };

  getFilteredRowCountValue = () => {
    let filteredRowCount = 0;

    this.props.api.forEachNodeAfterFilter(node => {
      if (!node.group) {
        filteredRowCount += 1;
      }
    });
    return filteredRowCount;
  };

  updateRowsCount = () => {
    const total = this.getTotalRowCount();
    const filtered = this.getFilteredRowCountValue();
    this.setState({ count: filtered, visible: filtered !== total });
  };

  render() {
    return this.state.visible ? (
      <div className={styles.container}>
        Filtered: <strong>{this.state.count.toLocaleString('en-US')}</strong>
      </div>
    ) : null;
  }
}

export default FilteredStatusBarComponent;
