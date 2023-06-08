import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from 'dw/core/components/TableHydrated';
import { hasData } from 'dw/core/helpers/object';

import { COLUMNS, sortedInfo } from './constants';
import styles from './index.module.css';

const INITIAL_LOADING_TIMEOUT = 30000;

const Empty = ({ initialLoading }) =>
  initialLoading ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <div className={styles.empty}>No data to display</div>
  );

Empty.propTypes = {
  initialLoading: PropTypes.bool.isRequired,
};

const initialState = ({ tests }) => ({
  tests,
  initialLoading: tests.length === 0,
});

class TestsList extends React.Component {
  state = initialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (nextProps.tests.length !== 0 && nextProps.tests !== prevState.tests) {
      newState.tests = nextProps.tests;
      newState.initialLoading = false;
    }
    if (hasData(newState)) return newState;
    return null;
  }

  componentDidMount() {
    this.setInitialLoadingCleanUp();
  }

  componentWillUnmount() {
    clearTimeout(this.initialLoadingTimeout);
  }

  setInitialLoadingCleanUp = () => {
    this.initialLoadingTimeout = setTimeout(
      () =>
        this.setState(prevState =>
          prevState.initialLoading ? { initialLoading: false } : {}
        ),
      INITIAL_LOADING_TIMEOUT
    );
  };

  render() {
    const { title, tests, formatDateTime } = this.props;
    const { initialLoading } = this.state;
    return (
      <div className={styles.testsSection} data-cy={`${title}-section`}>
        <div className={styles.mainTitle}>
          {title}
          <span className={styles.itemsShown}>({tests.length} shown)</span>
        </div>
        {tests.length !== 0 ? (
          <Table
            className={styles.table}
            data={tests}
            size="small"
            columns={COLUMNS}
            sortedInfo={sortedInfo}
            formatDateTime={formatDateTime}
            rowClassName={record => styles[`${record.environment}`] || ''}
            noClearAllButton
          />
        ) : (
          <Empty initialLoading={initialLoading} />
        )}
      </div>
    );
  }
}

TestsList.propTypes = {
  title: PropTypes.string.isRequired,
  tests: PropTypes.array.isRequired,
  formatDateTime: PropTypes.func,
};

TestsList.defaultProps = {
  formatDateTime: undefined,
};

export default TestsList;
