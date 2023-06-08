import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import {
  useAgeGroup,
  useCountryNames,
  useTransformDetails,
} from '../../helpers';

import KeyValue from '../KeyValue';

import styles from './index.module.css';

const Under18TooltipComponent = () => (
  <div className={styles.under18Container}>
    Under 18
    <Tooltip title="Under 18 total includes Under 16 total">
      <Icon className={styles.under18TooltipIcon} fontSize="inherit">
        help
      </Icon>
    </Tooltip>
  </div>
);

const KpiPerAgeGroup = ({ getDetails, itemsToDisplay, kpis, kpiDetails }) => {
  const transformedData = useTransformDetails(kpis, kpiDetails);
  const details = useCountryNames(transformedData);

  const [selectedCountry, setSelectedCountry] = useState('United States');
  const toggleSelectedRow = useCallback(
    rowValue => {
      if (rowValue === selectedCountry) {
        setSelectedCountry('United States');
      } else {
        setSelectedCountry(rowValue);
      }
    },
    [selectedCountry, setSelectedCountry]
  );
  const resetSelectedRow = useCallback(() => {
    if (
      selectedCountry &&
      !['United States', 'United Kingdom'].includes(selectedCountry)
    ) {
      setSelectedCountry('United States');
    }
  }, [selectedCountry, setSelectedCountry]);

  const u16Details = useAgeGroup(
    getDetails,
    'total_under_16_uno_accounts_per_country',
    selectedCountry
  );
  const u18Details = useAgeGroup(
    getDetails,
    'total_under_18_uno_accounts_per_country',
    selectedCountry
  );
  const o18Details = useAgeGroup(
    getDetails,
    'total_over_18_uno_accounts_per_country',
    selectedCountry
  );
  const noDobDetails = useAgeGroup(
    getDetails,
    'total_uno_accounts_per_country_with_no_dob',
    selectedCountry
  );

  const data = [
    [0, 'Under 16', u16Details],
    [0, 'Under 18', u18Details],
    [0, 'Over 18', o18Details],
    [0, 'No Date of Birth', noDobDetails],
  ];

  const kpiAddlDataDetails = {
    details: {
      data,
      fieldNames: ['date', 'second_dimension', 'value'],
    },
    name: 'total_per_age_group',
  };
  const transformedAddlData = useTransformDetails(kpis, kpiAddlDataDetails);
  const addlDataDetails = useCountryNames(transformedAddlData);

  const renderAddlDetails = addDetailsStyle => (
    <KeyValue
      data={addlDataDetails.hasTwoDimensions ? addlDataDetails.data : []}
      getDetails={getDetails}
      header={[addlDataDetails.displayName]}
      isAddlData
      keySize={6}
      kpis={kpis}
      overrideTableStyle={addDetailsStyle}
      rowNameComponent={item =>
        item === 'Under 18' ? <Under18TooltipComponent /> : item
      }
    />
  );

  return (
    <>
      <KeyValue
        data={details.hasTwoDimensions ? details.data : []}
        getDetails={getDetails}
        hasAddlData
        header={[details.displayName]}
        itemsToDisplay={itemsToDisplay}
        kpis={kpis}
        onCloseViewAllAction={resetSelectedRow}
        overrideTableStyle={styles.perCountryContainer}
        rowClickAction={toggleSelectedRow}
        selectedRowValue={selectedCountry}
        ViewAllBoxAddlDetailsComponent={() =>
          renderAddlDetails(styles.viewAddlDetailsContainer)
        }
      />
      {renderAddlDetails(styles.perAgeGroupContainer)}
    </>
  );
};

KpiPerAgeGroup.propTypes = {
  getDetails: PropTypes.func.isRequired,
  itemsToDisplay: PropTypes.number,
  kpis: PropTypes.arrayOf(PropTypes.object).isRequired,
  kpiDetails: PropTypes.object,
};

KpiPerAgeGroup.defaultProps = {
  itemsToDisplay: undefined,
  kpiDetails: {},
};

export default KpiPerAgeGroup;
