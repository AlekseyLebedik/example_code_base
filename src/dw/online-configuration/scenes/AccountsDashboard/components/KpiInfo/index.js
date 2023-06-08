import React from 'react';
import PropTypes from 'prop-types';

import { useCountryNames, useTransformDetails } from '../../helpers';
import KeyValue from '../KeyValue';

import styles from './index.module.css';

const KpiInfoComponent = ({
  autogenAcctsExcluded,
  calculateTotal,
  getDetails,
  itemsToDisplay,
  kpis,
  kpiDetails,
  overrideTableStyle,
}) => {
  const data = useTransformDetails(kpis, kpiDetails);
  const details = useCountryNames(data);
  const valueHeader = calculateTotal ? details.total : undefined;

  return (
    <KeyValue
      autogenAcctsExcluded={autogenAcctsExcluded}
      classes={{ root: styles[details.name] }}
      data={details.hasTwoDimensions ? details.data : []}
      getDetails={getDetails}
      header={[details.displayName, valueHeader]}
      itemsToDisplay={itemsToDisplay}
      key={`keyValue/${details.displayName}`}
      kpis={kpis}
      overrideTableStyle={overrideTableStyle}
    />
  );
};

KpiInfoComponent.propTypes = {
  autogenAcctsExcluded: PropTypes.bool,
  calculateTotal: PropTypes.bool,
  getDetails: PropTypes.func,
  itemsToDisplay: PropTypes.number,
  kpis: PropTypes.arrayOf(PropTypes.object).isRequired,
  kpiDetails: PropTypes.object.isRequired,
  overrideTableStyle: PropTypes.string,
};

KpiInfoComponent.defaultProps = {
  autogenAcctsExcluded: false,
  calculateTotal: false,
  getDetails: null,
  itemsToDisplay: undefined,
  overrideTableStyle: null,
};

export default KpiInfoComponent;
