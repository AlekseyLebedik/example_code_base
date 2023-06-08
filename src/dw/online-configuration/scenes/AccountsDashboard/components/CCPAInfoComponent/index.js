import React from 'react';
import PropTypes from 'prop-types';

import {
  getDetailsDefault,
  mergeKpis,
  useTransformDetails,
} from '../../helpers';
import KeyValue from '../KeyValue';

import styles from './index.module.css';

const KpiRowNameComponent = ({ name }) => (
  <div className={name === 'Under 16' ? styles.under16RowName : styles.rowName}>
    {name}
  </div>
);

KpiRowNameComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

const KpiRowValueComponent = ({ value }) => (
  <div className={styles.rowValue}>{value}</div>
);

KpiRowValueComponent.propTypes = {
  value: PropTypes.string.isRequired,
};

const CCPAInfoComponent = ({
  enableSearch,
  getDetails,
  itemsToDisplay,
  keySize,
  name,
  notOk,
  ok,
  overrideTableStyle,
  rolloverText,
  showDataModalOnly,
  underAge,
  viewAllButtonName,
}) => {
  const okDetails = useTransformDetails(
    null,
    getDetailsDefault(getDetails, ok)
  );
  const notOkDetails = useTransformDetails(
    null,
    getDetailsDefault(getDetails, notOk)
  );
  const underAgeDetails = useTransformDetails(
    null,
    getDetailsDefault(getDetails, underAge)
  );

  const result = mergeKpis(
    notOkDetails,
    okDetails,
    underAge && underAgeDetails,
    name
  );

  return (
    <KeyValue
      classes={{ root: styles[name] }}
      data={result.data}
      enableSearch={enableSearch}
      header={[result.displayName]}
      itemsToDisplay={itemsToDisplay}
      key={`keyValue/${result.displayName}`}
      keySize={keySize}
      overrideTableStyle={overrideTableStyle}
      rolloverText={rolloverText}
      rowNameComponent={item => <KpiRowNameComponent name={item} />}
      rowValueComponent={(key, value) =>
        key === 'Under 16' ? (
          <KpiRowValueComponent value={value} />
        ) : (
          value && value.toLocaleString()
        )
      }
      showDataModalOnly={showDataModalOnly}
      subheader={
        result.hasTwoDimensions ? [null, 'Not ok to sell', 'Ok to sell'] : []
      }
      viewAllButtonName={viewAllButtonName}
    />
  );
};

CCPAInfoComponent.propTypes = {
  enableSearch: PropTypes.bool,
  getDetails: PropTypes.func.isRequired,
  itemsToDisplay: PropTypes.number,
  keySize: PropTypes.number,
  name: PropTypes.string.isRequired,
  notOk: PropTypes.string.isRequired,
  ok: PropTypes.string.isRequired,
  overrideTableStyle: PropTypes.string,
  rolloverText: PropTypes.string,
  showDataModalOnly: PropTypes.bool,
  underAge: PropTypes.string,
  viewAllButtonName: PropTypes.string,
};

CCPAInfoComponent.defaultProps = {
  enableSearch: false,
  itemsToDisplay: undefined,
  keySize: 6,
  overrideTableStyle: null,
  rolloverText: null,
  showDataModalOnly: false,
  underAge: null,
  viewAllButtonName: null,
};

export default CCPAInfoComponent;
