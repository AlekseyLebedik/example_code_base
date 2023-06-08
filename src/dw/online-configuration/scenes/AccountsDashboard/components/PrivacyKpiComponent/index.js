import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { formatPrivKpiData } from '../../helpers';
import KeyValue from '../KeyValue';

import styles from './index.module.css';

const PrivacyKpiComponent = ({
  name,
  privacyKpis,
  privacyKpisData,
  privacyKpisTotals,
}) => {
  const privKpiProps = formatPrivKpiData(name, privacyKpis, privacyKpisTotals);
  if (!isEmpty(privacyKpisData)) {
    // eslint-disable-next-line prefer-destructuring
    privKpiProps.data = Object.values(privacyKpisData)[0];
  }
  return (
    <KeyValue
      customViewAllClass={styles.privKpisViewAllContainer}
      key={`keyValue/privacyKpi/${name}`}
      viewAllKeySize={8}
      {...privKpiProps}
    />
  );
};

PrivacyKpiComponent.propTypes = {
  name: PropTypes.string.isRequired,
  privacyKpis: PropTypes.object.isRequired,
  privacyKpisData: PropTypes.object,
  privacyKpisTotals: PropTypes.object.isRequired,
};

PrivacyKpiComponent.defaultProps = {
  privacyKpisData: null,
};

export default PrivacyKpiComponent;
