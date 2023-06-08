import { useMemo } from 'react';
import moment from 'moment-timezone';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import flatMap from 'lodash/flatMap';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import maxBy from 'lodash/maxBy';

import deepCopy from 'dw/core/helpers/deep-copy';

import { COUNTRY_CODE_IDX, DISPLAY_NAMES_MAP, VALUE_IDX } from './constants';

import styles from './index.module.css';

/**
 * Get latest date in KPI Data
 * @param {*} kpiList
 */
export const getLatestUpToDate = kpiList =>
  flatMap(kpiList.map(d => d.details.data)).sort(
    (item1, item2) =>
      moment(item2[0], 'YYYY-MM-DD').unix() -
      moment(item1[0], 'YYYY-MM-DD').unix()
  )[0][0];

/**
 * Get message for displaying how up to date KPIs are (last updated)
 * @param {*} kpiList
 */
export const getLatestUpToDateMsg = kpiList =>
  kpiList.length > 0 ? `Last updated ${getLatestUpToDate(kpiList)}` : null;

/**
 * Transform details for KeyValue table
 * @param {*} kpis
 * @param {*} kpiDetails
 */
export const useTransformDetails = (kpis, kpiDetails) => {
  const displayName = useMemo(() => {
    if (DISPLAY_NAMES_MAP.hasOwnProperty(kpiDetails?.name))
      return DISPLAY_NAMES_MAP[kpiDetails?.name];
    const kpi = kpis && kpis.find(({ name }) => name === kpiDetails?.name);
    // eslint-disable-next-line
    return kpi?.display_name || kpiDetails?.name;
  }, [kpis, kpiDetails]);
  const hasTwoDimensions =
    kpiDetails?.details?.fieldNames?.includes('second_dimension');
  const data = useMemo(() => {
    const grouped = hasTwoDimensions
      ? groupBy(kpiDetails?.details?.data, row => row[1])
      : { total: kpiDetails?.details?.data };
    const normalizedData = Object.entries(grouped).reduce(
      (acc, [key, items]) => {
        const maxItem = maxBy(items, ([date]) =>
          moment(date, 'YYYY-MM-DD').unix()
        );
        return [...acc, [key, maxItem ? maxItem[maxItem.length - 1] : 0]];
      },
      []
    );
    return normalizedData;
  }, [kpiDetails, hasTwoDimensions]);
  const total = useMemo(
    () => data.reduce((acc, row) => acc + row[row.length - 1], 0),
    [data]
  );
  return {
    displayName,
    data,
    name: kpiDetails?.name,
    hasTwoDimensions,
    total,
  };
};

/**
 * Get default for kpi details
 * @param {*} getDetails
 * @param {*} name
 */
export const getDetailsDefault = (getDetails, name) =>
  getDetails(name) || {
    name,
    details: { data: [], fieldNames: [] },
  };

/**
 * Merge kpis
 * @param {*} notOk
 * @param {*} ok
 * @param {*} underAge
 */
export const mergeKpis = (notOk, ok, underAge = null, name) => {
  const result = deepCopy(notOk);
  result.name = name;
  result.displayName = DISPLAY_NAMES_MAP[name] || name;
  if (result.hasTwoDimensions) {
    result.data.forEach(row => {
      const [key] = row;
      const other = ok.data.find(([otherKey]) => otherKey === key);
      const value = other ? other[other.length - 1] : 0;
      row.push(value);
    });
  } else {
    // eslint-disable-next-line
    result.data = [['Not ok to sell', notOk.total]];
    if (underAge) {
      result.data.push(['Under 16', underAge.total]);
    }
    result.data.push(['Ok to sell', ok.total]);
  }
  return result;
};

/**
 * Sort countries
 * @param {*} row
 */
export const sortCountries = row => {
  const countryCode = row[COUNTRY_CODE_IDX];
  if (countryCode === 'US') return 10 ** 9 + 1;
  if (countryCode === 'GB') return 10 ** 9;
  return row[VALUE_IDX];
};

/**
 * Get country name for country code
 * @param {*} row
 */
export const getCountryName = row => {
  const regionNamesInEnglish = new Intl.DisplayNames(['en'], {
    type: 'region',
  });
  const newRow = [...row];
  try {
    newRow[COUNTRY_CODE_IDX] = regionNamesInEnglish.of(row[COUNTRY_CODE_IDX]);
  } catch (e) {
    // eslint-disable-next-line
    console.log(`Cannot find name for country code ${row[COUNTRY_CODE_IDX]}`);
  }
  return newRow;
};

/**
 * Replace country codes with country names for data
 * @param {*} kpiDetails
 */
export const useCountryNames = kpiDetails => {
  if (!kpiDetails?.name?.includes('per_country')) {
    return kpiDetails;
  }
  const details = {
    ...kpiDetails,
    data: orderBy(kpiDetails.data, sortCountries, 'desc')
      .filter(item => !!item[COUNTRY_CODE_IDX])
      .map(getCountryName),
  };
  return details;
};

/**
 * Get display value for per country age group
 * @param {*} getDetails
 * @param {*} name
 * @param {*} selectedCountry
 */
export const useAgeGroup = (getDetails, name, selectedCountry) => {
  const details = getDetailsDefault(getDetails, name);
  const normalized = useTransformDetails(null, details);
  const foundCountry = normalized.data.find(
    item => getCountryName(item) && getCountryName(item)[0] === selectedCountry
  );
  const value = useMemo(() => {
    if (selectedCountry) {
      if (foundCountry) return foundCountry[1];
      return 0;
    }
    return normalized.data.reduce((acc, row) => acc + row[row.length - 1], 0);
  }, [normalized, selectedCountry, foundCountry]);

  return value;
};

/**
 * Transform privacy KPI data into format for KeyValue component
 * @param {*} data
 */
export const transformPrivKpiData = data => {
  if (isEmpty(data)) return {};
  const {
    query_results: { column_positions: cols, row_positions: rows, values },
  } = data;
  const transformedData = {};
  cols.forEach((col, colIdx) => {
    const kpiTypeData = [];
    values.forEach((valueList, valIdx) => {
      kpiTypeData.push([rows[valIdx][0].name, valueList[colIdx]]);
    });
    transformedData[col[col.length - 1].name] = kpiTypeData;
  });
  return transformedData;
};

/**
 * Filter Privacy KPI Data, sort by date, then format for display
 * @param {*} data
 */
const filterSortPrivKpiData = data =>
  data
    .filter(row => row[0] !== '$total')
    .sort(
      (item1, item2) =>
        moment(item2[0], 'MMM YYYY').unix() -
        moment(item1[0], 'MMM YYYY').unix()
    )
    .map(item => [moment(item[0], 'MMM YYYY').format('MMMM'), item[1]]);

/**
 * Transform Privacy KPI data for display
 * according to the kpi name, assign rest of
 * KeyValue props according to the particular
 * kpi name
 * @param {*} kpiName
 */
export const formatPrivKpiData = (kpiName, privacyKpiData, totals) => {
  switch (kpiName) {
    case 'privacy_kpi_delete_requests': {
      const rtbfData = privacyKpiData['RTBF Sub-Task'];
      return {
        data: filterSortPrivKpiData(rtbfData),
        header: [
          'Total # of Deletes',
          get(totals, ['RTBF Sub-Task', '0', '1'], ''),
        ],
        itemsToDisplay: 2,
        keySize: 8,
        overrideTableStyle: styles.rtbfContainer,
        sortDataByDate: true,
      };
    }
    case 'privacy_kpi_export_requests': {
      const dprData = privacyKpiData['DPR Sub-Task'];
      const sarData = privacyKpiData['SAR Sub-Task'];
      const exportData = [...dprData, ...sarData].reduce((acc, row) => {
        const foundIdx = acc.findIndex(item => item[0] === row[0]);
        if (foundIdx > -1) {
          const updatedAcc = [...acc];
          updatedAcc[foundIdx] = [
            updatedAcc[foundIdx][0],
            updatedAcc[foundIdx][1] + row[1],
          ];
          return updatedAcc;
        }
        return [...acc, row];
      }, []);
      const exportTotals =
        get(totals, ['DPR Sub-Task', '0', '1'], '') +
        get(totals, ['SAR Sub-Task', '0', '1'], '');
      return {
        data: filterSortPrivKpiData(exportData),
        header: ['Total # of Exports', exportTotals],
        itemsToDisplay: 2,
        keySize: 8,
        overrideTableStyle: styles.dprSarContainer,
        sortDataByDate: true,
      };
    }
    default: {
      return {
        data: [],
        header: [
          'Total # of Privacy requests to date',
          get(totals, ['$total', '0', '1'], ''),
        ],
        itemsToDisplay: 0,
        keySize: 10,
        overrideTableStyle: styles.totalsContainer,
        viewAllButtonName: 'TOTAL PER COUNTRY',
      };
    }
  }
};

/**
 * Determines name of view all button. When showDataModalOnly
 * (when data shows only in view modal), use the header name
 * as the view all button name, otherwise just display 'VIEW ALL'.
 * Adding viewAllButtonName overrides these names.
 * @param {*} showDataModalOnly
 * @param {*} keyHeader
 * @param {*} viewAllButtonName
 */
export const getViewAllButtonName = (
  showDataModalOnly,
  keyHeader,
  viewAllButtonName = null
) => {
  if (viewAllButtonName) return viewAllButtonName;
  return showDataModalOnly ? `${keyHeader}` : 'VIEW ALL';
};
