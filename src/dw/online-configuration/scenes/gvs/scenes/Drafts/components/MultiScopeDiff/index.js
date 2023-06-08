import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SearchField from 'dw/core/components/AGGrid/components/SearchField';

import AGGrid from '@gvs/components/AGGrid';
import {
  useFormatValue,
  useNameMapping,
  usePopulationsDisplayValues,
} from '@gvs/graphql/hooks';
import { PLAYER } from '@gvs/constants';
import ExpandAll from '../ExpandAll';
import { MASTER_COLUMN_DEFS, DETAIL_COLUMN_DEFS } from './constants';

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    '& .ag-cell-wrapper.ag-row-group': {
      alignItems: 'center',
    },
    '& .ag-details-row': {
      padding: theme.spacing(2),
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
}));

const DiffBase = props => {
  const classes = useStyles();
  const { diffs, itemId, loading } = props;

  const formatValue = useFormatValue();

  const [gridApi, setGridApi] = useState();
  const onGridReady = useCallback(({ api }) => {
    setGridApi(api);
  }, []);

  const { scopeURI: currentScopeURI } = useParams();
  const currentScopeName = useMemo(() => {
    const parts = currentScopeURI.split(':');
    return parts[parts.length - 1];
  }, [currentScopeURI]);

  const displayNames = useNameMapping();

  const populations = useMemo(() => {
    if (!diffs) return [];
    return diffs
      .reduce((acc, { populationType, populationValue }) => {
        const population = `${populationType}:${populationValue || PLAYER}`;
        return acc.includes(population) ? acc : [...acc, population];
      }, [])
      .map(population => {
        const [type, value = PLAYER] = population.split(':');
        return { type, value };
      });
  }, [diffs]);

  const { populations: displayValues } =
    usePopulationsDisplayValues(populations);

  useEffect(() => {
    if (!(gridApi && formatValue && diffs && !loading)) return;
    if (diffs.length === 0) {
      gridApi.applyTransaction({ add: [] });
      return;
    }
    if (!(displayValues && displayValues.some(p => Boolean(p.__typename))))
      return;
    const displayValuesMap = displayValues.reduce(
      (acc, { type, value, displayValue }) => {
        const population = `${type}:${value || PLAYER}`;
        return { ...acc, [population]: displayValue || population };
      },
      {}
    );
    const transaction = { add: [], update: [] };
    diffs.forEach(
      ({
        scopeURI: diffScopeURI,
        scopeName: diffScopeName,
        populationType: type,
        populationValue: value,
        variables: variablesRaw,
      }) => {
        const scopeURI = diffScopeURI || currentScopeURI;
        const scopeName = diffScopeName || currentScopeName;
        const scopeDisplayName = displayNames[scopeName] || scopeName;
        const population = `${type}:${value || PLAYER}`;
        const displayValue = displayValuesMap[population];
        const node = gridApi.getRowNode(`${scopeURI}:${population}`);
        if (
          node &&
          displayValue === node.data.displayValue &&
          scopeDisplayName === node.data.scopeDisplayName
        )
          return;
        if (node) {
          const newData = { ...node.data, displayValue, scopeDisplayName };
          transaction.update.push(newData);
        } else {
          const variables = [];
          variablesRaw.forEach(({ key, valuesPerPlatform }) => {
            valuesPerPlatform.forEach(({ platform, source, target }) => {
              variables.push({
                key,
                platform,
                source: formatValue(key, source),
                target: formatValue(key, target),
              });
            });
          });
          transaction.add.push({
            _id: `${scopeURI}:${population}`,
            scopeURI,
            population,
            displayValue,
            scopeDisplayName,
            variables,
          });
        }
      }
    );
    gridApi.applyTransaction(transaction);
    setTimeout(() =>
      gridApi.forEachLeafNode(node => node.setExpanded(true), 500)
    );
  }, [gridApi, diffs, displayValues, displayNames, populations, formatValue]);

  const columnDefs = useMemo(() => {
    if (props.includeScope) return MASTER_COLUMN_DEFS;
    return MASTER_COLUMN_DEFS.filter(c => c.field !== 'scopeURI').map(c => ({
      ...c,
      sort: 'asc',
      flex: 1,
      minWidth: 800,
      cellRenderer: 'agGroupCellRenderer',
    }));
  }, [props.includeScope]);

  const detailColumnDefs = useMemo(() => {
    if (!props.columnHeaders) return DETAIL_COLUMN_DEFS;
    const [source, target] = props.columnHeaders;
    const map = { source, target };
    return DETAIL_COLUMN_DEFS.map(c => ({
      ...c,
      headerName: map[c.field] || c.headerName,
    }));
  }, [props.columnHeaders, DETAIL_COLUMN_DEFS]);

  return (
    <div className={classes.container}>
      <ExpandAll key={`${itemId}-expand`} gridApi={gridApi} defaultExpanded />
      <AGGrid
        key={itemId}
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        detailCellRendererParams={{
          detailGridOptions: {
            columnDefs: detailColumnDefs,
            defaultColDef: {
              wrapText: false,
            },
          },
          getDetailRowData(params) {
            params.successCallback(params.data.variables);
          },
        }}
        gridOptions={{
          defaultColDef: {
            autoHeight: false,
          },
          rowHeight: 40,
          getRowId({ data }) {
            return data._id;
          },
        }}
        rowData={null}
        masterDetail
        autoSizeColumns={false}
        detailRowAutoHeight
        suppressRowClickSelection
      />
    </div>
  );
};
DiffBase.propTypes = {
  diffs: PropTypes.array,
  itemId: PropTypes.string,
  columnHeaders: PropTypes.arrayOf(PropTypes.string),
  includeScope: PropTypes.bool,
  loading: PropTypes.bool,
};
DiffBase.defaultProps = {
  diffs: [],
  itemId: undefined,
  columnHeaders: undefined,
  includeScope: true,
  loading: false,
};

export const SingleDiff = ({ diffs, loading, columnHeaders }) => {
  const classes = useStyles();

  const formatValue = useFormatValue();

  const columnDefs = useMemo(() => {
    if (!columnHeaders) return DETAIL_COLUMN_DEFS;
    const [source, target] = columnHeaders;
    const map = { source, target };
    return DETAIL_COLUMN_DEFS.map(c => ({
      ...c,
      headerName: map[c.field] || c.headerName,
    }));
  }, [columnHeaders]);

  const [gridApi, setGridApi] = useState();
  const onGridReady = useCallback(({ api }) => {
    setGridApi(api);
  }, []);

  useEffect(() => {
    if (!(gridApi && diffs && formatValue && !loading)) return;
    if (diffs.length === 0) {
      gridApi.applyTransaction({ add: [] });
      return;
    }
    const transaction = { add: [], update: [] };
    const [{ variables: variablesRaw }] = diffs;
    variablesRaw.forEach(({ key, valuesPerPlatform }) => {
      valuesPerPlatform.forEach(({ platform, source, target }) => {
        const node = gridApi.getRowNode(`${key}:${platform}`);
        const lst = node ? transaction.update : transaction.add;
        lst.push({
          _id: `${key}:${platform}`,
          key,
          platform,
          source: formatValue(key, source),
          target: formatValue(key, target),
        });
      });
    });
    gridApi.applyTransaction(transaction);
  }, [gridApi, diffs, formatValue]);

  return (
    <>
      <SearchField gridApi={gridApi} />
      <AGGrid
        className={classes.container}
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        defaultColDef={{
          autoHeight: false,
          wrapText: false,
        }}
        gridOptions={{
          rowHeight: 40,
          getRowId({ data }) {
            return data._id;
          },
        }}
        rowData={null}
        autoSizeColumns={false}
        suppressRowClickSelection
      />
    </>
  );
};
SingleDiff.propTypes = {
  diffs: PropTypes.array,
  columnHeaders: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};
SingleDiff.defaultProps = {
  diffs: [],
  columnHeaders: undefined,
  loading: false,
};

export default DiffBase;
