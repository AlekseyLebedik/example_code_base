import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import { Row, Col } from 'antd';

import TrendTable from './components/TrendTable';
import PlatformsTable from './components/PlatformsTable';
import TrendCharts from './components/TrendCharts';

import styles from './index.module.css';

const DashboardStateless = ({ franchise, franchiseData, location }) => (
  <div className={styles.container}>
    <TrendTable franchiseData={franchiseData} baseUrl={location.pathname} />
    <Row>
      <Col sm={24} md={12}>
        <TrendCharts
          franchiseData={franchiseData}
          baseUrl={location.pathname}
        />
      </Col>
      <Col sm={24} md={12}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <PlatformsTable
              key="1"
              franchise={franchise}
              baseUrl={location.pathname}
              availableWidth={width}
            />
          )}
        </AutoSizer>
      </Col>
    </Row>
  </div>
);

DashboardStateless.propTypes = {
  franchise: PropTypes.object,
  franchiseData: PropTypes.object,
  location: PropTypes.object.isRequired,
};

DashboardStateless.defaultProps = {
  franchise: null,
  franchiseData: {},
};

export default DashboardStateless;
