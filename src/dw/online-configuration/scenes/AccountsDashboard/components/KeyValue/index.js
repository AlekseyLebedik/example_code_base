import React, { Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';

import { getViewAllButtonName } from '../../helpers';

import ViewAll from '../ViewAll';

import styles from './index.module.css';

const KpiTable = ({
  autogenAcctsExcluded,
  classes,
  customViewAllClass,
  data,
  enableSearch,
  getDetails,
  hasAddlData,
  header,
  isAddlData,
  itemsToDisplay,
  keySize,
  kpis,
  onCloseViewAllAction,
  overrideTableStyle,
  rolloverText,
  rowClickAction,
  rowNameComponent,
  rowValueComponent,
  selectedRowValue,
  showDataModalOnly,
  sortDataByDate,
  subheader,
  ViewAllBoxAddlDetailsComponent,
  viewAllButtonName,
  viewAllKeySize,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, onSearch] = useState('');
  const valueSize = 12 - keySize;
  const [showAllOpen, setShowAllOpen] = useState(false);
  const visibleData = filteredData.slice(0, itemsToDisplay);

  const showAll = event => {
    event.preventDefault();
    setShowAllOpen(true);
  };
  const onClose = useCallback(() => {
    setShowAllOpen(false);
    if (onCloseViewAllAction) onCloseViewAllAction();
  }, [onCloseViewAllAction, setShowAllOpen]);
  const [keyHeader, valueHeader] = header;
  const [keySubHeader, ...subheaderValues] = subheader;
  useEffect(() => {
    setFilteredData(
      data.filter(row =>
        row.some(item =>
          String(item).toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    );
  }, [searchValue, data]);

  const renderTable = useCallback(
    () => (
      <div
        className={classNames(
          overrideTableStyle || styles.tableContainer,
          classes.root,
          hasAddlData || overrideTableStyle
            ? null
            : styles.tableContainerNotExpanded,
          isAddlData ? styles.tableIsAddlData : null
        )}
      >
        {showDataModalOnly ? null : (
          <>
            <Grid className={styles.headerContainer} container>
              {keyHeader && (
                <Grid
                  classes={{
                    root: classNames(
                      styles.header,
                      styles.headerLeft,
                      classes.header
                    ),
                  }}
                  item
                  xs={valueHeader ? keySize : 12}
                >
                  {keyHeader}
                  {enableSearch ? (
                    <div className={styles.searchContainer}>
                      <Icon className="mx-2">search</Icon>
                      <input
                        onChange={e => onSearch(e.target.value)}
                        value={searchValue}
                      />
                      {searchValue && (
                        <IconButton
                          className={styles.clearSearch}
                          onClick={() => onSearch('')}
                        >
                          <Icon>close</Icon>
                        </IconButton>
                      )}
                    </div>
                  ) : null}
                </Grid>
              )}
              {valueHeader && (
                <Grid
                  classes={{
                    root: classNames(styles.headerRight, classes.header),
                  }}
                  item
                  xs={valueSize}
                >
                  <div>{valueHeader.toLocaleString()}</div>
                </Grid>
              )}
              {subheader.length > 0 && (
                <>
                  <Grid
                    classes={{
                      root: classNames(styles.subheader, styles.subheaderLeft),
                    }}
                    item
                    xs={keySize}
                  >
                    {keySubHeader}
                  </Grid>
                  {subheaderValues.map(value => (
                    <Grid
                      classes={{
                        root: classNames(
                          styles.subheader,
                          styles.subheaderLeft
                        ),
                      }}
                      item
                      key={value}
                      xs={valueSize / subheaderValues.length}
                    >
                      {value}
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
            <Grid container classes={{ root: styles.detailsContainer }}>
              {visibleData.map(([key, ...values]) => (
                <Fragment key={key}>
                  <Grid
                    className={classNames(
                      hasAddlData && key === selectedRowValue
                        ? styles.selectedRow
                        : null,
                      hasAddlData ? styles.dataRowCellSelect : null,
                      subheader.length > 0 && !Array.isArray(key)
                        ? styles.rightAlignedColumnNoPad
                        : styles.dataRowCellLeft
                    )}
                    container={Array.isArray(key)}
                    item
                    onClick={() => rowClickAction(key)}
                    xs={keySize}
                  >
                    {(Array.isArray(key) && (
                      <>
                        <Grid
                          classes={{
                            root: classNames(
                              styles.subheader,
                              classes.subheader
                            ),
                          }}
                          item
                          xs={8}
                        >
                          {key[0]}
                        </Grid>
                        <Grid
                          className={styles.rightAlignedColumnNoPad}
                          item
                          xs={4}
                        >
                          {key[1]}
                        </Grid>
                      </>
                    )) ||
                      (rowNameComponent
                        ? rowNameComponent(key)
                        : key && key.toLocaleString())}
                  </Grid>
                  {values.map((value, idx) => (
                    // eslint-disable-next-line
                    <Grid
                      className={classNames(
                        hasAddlData && key === selectedRowValue
                          ? styles.selectedRow
                          : null,
                        hasAddlData ? styles.dataRowCellSelect : null,
                        styles.rightAlignedColumn
                      )}
                      item
                      // eslint-disable-next-line
                      key={`${idx}-${value}`}
                      onClick={() => rowClickAction(key)}
                      xs={valueSize / values.length}
                    >
                      {rowValueComponent
                        ? rowValueComponent(key, value)
                        : value && value.toLocaleString()}
                    </Grid>
                  ))}
                </Fragment>
              ))}
            </Grid>
          </>
        )}
        {showDataModalOnly || filteredData.length !== visibleData.length ? (
          <div className={styles.showAll}>
            <Link href="#" onClick={showAll}>
              {getViewAllButtonName(
                showDataModalOnly,
                keyHeader,
                viewAllButtonName
              )}
            </Link>
          </div>
        ) : null}
        {showAllOpen ? (
          <ViewAll
            classes={{
              rightAlignedColumn: styles.rightAlignedColumn,
              selectedRow: styles.viewAllSelectedRow,
              subheader: classNames(
                styles.subheader,
                classes.subheader,
                styles.viewAllSubheader
              ),
              viewAllRow: styles.dataRowCellSelect,
              viewAllSearchBar: styles.viewAllSearchBar,
            }}
            customViewAllClass={customViewAllClass}
            data={data}
            getDetails={getDetails}
            hasAddlData={hasAddlData}
            keySize={viewAllKeySize || keySize}
            kpis={kpis}
            onClose={onClose}
            rowClickAction={rowClickAction}
            selectedRowValue={selectedRowValue}
            sortDataByDate={sortDataByDate}
            subheader={subheader}
            title={keyHeader}
            ViewAllBoxAddlDetailsComponent={ViewAllBoxAddlDetailsComponent}
          />
        ) : null}
      </div>
    ),
    [
      classes,
      customViewAllClass,
      data,
      enableSearch,
      filteredData,
      getDetails,
      isAddlData,
      hasAddlData,
      keyHeader,
      keySize,
      keySubHeader,
      kpis,
      onClose,
      onCloseViewAllAction,
      onSearch,
      overrideTableStyle,
      searchValue,
      selectedRowValue,
      showAllOpen,
      showDataModalOnly,
      sortDataByDate,
      subheader,
      subheaderValues,
      rowClickAction,
      valueHeader,
      valueSize,
      ViewAllBoxAddlDetailsComponent,
      viewAllButtonName,
      viewAllKeySize,
      visibleData,
    ]
  );

  return (
    <div className={styles.container}>
      <div className={styles.tableWithAgeGroupContainer}>
        {rolloverText ? (
          <Tooltip placement="bottom-end" title={rolloverText}>
            <div>{renderTable()}</div>
          </Tooltip>
        ) : (
          renderTable()
        )}
      </div>
      {autogenAcctsExcluded && (
        <span className={styles.autogenAccts}>
          (Excluding Autogenerated accounts)
        </span>
      )}
    </div>
  );
};

KpiTable.propTypes = {
  autogenAcctsExcluded: PropTypes.bool,
  classes: PropTypes.object,
  customViewAllClass: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.node])
    )
  ).isRequired,
  enableSearch: PropTypes.bool,
  getDetails: PropTypes.func,
  hasAddlData: PropTypes.bool,
  header: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  isAddlData: PropTypes.bool,
  itemsToDisplay: PropTypes.number,
  keySize: PropTypes.number,
  kpis: PropTypes.arrayOf(PropTypes.object),
  onCloseViewAllAction: PropTypes.func,
  overrideTableStyle: PropTypes.string,
  rolloverText: PropTypes.string,
  rowClickAction: PropTypes.func,
  rowNameComponent: PropTypes.func,
  rowValueComponent: PropTypes.func,
  selectedRowValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showDataModalOnly: PropTypes.bool,
  sortDataByDate: PropTypes.bool,
  subheader: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  ViewAllBoxAddlDetailsComponent: PropTypes.func,
  viewAllButtonName: PropTypes.string,
  viewAllKeySize: PropTypes.number,
};

KpiTable.defaultProps = {
  autogenAcctsExcluded: false,
  classes: {},
  customViewAllClass: null,
  enableSearch: false,
  getDetails: null,
  hasAddlData: false,
  header: [],
  isAddlData: false,
  itemsToDisplay: undefined,
  sortDataByDate: false,
  keySize: 8,
  kpis: null,
  onCloseViewAllAction: null,
  overrideTableStyle: null,
  rolloverText: null,
  rowClickAction: () => {},
  rowNameComponent: null,
  rowValueComponent: null,
  selectedRowValue: null,
  showDataModalOnly: false,
  subheader: [],
  ViewAllBoxAddlDetailsComponent: null,
  viewAllButtonName: null,
  viewAllKeySize: null,
};

export default KpiTable;
