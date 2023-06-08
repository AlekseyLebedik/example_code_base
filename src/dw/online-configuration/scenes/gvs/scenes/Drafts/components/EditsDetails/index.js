import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import capitalize from 'lodash/capitalize';
import isEqual from 'lodash/isEqual';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Empty from 'dw/core/components/Empty';
import { useConfigOption } from 'dw/online-configuration/hooks';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { useSnackbar } from 'dw/core/hooks';
import { SCENES, PLAYER, POPULATION_TYPE_LABELS } from '@gvs/constants';
import {
  useDeleteDraftsEdit,
  useDiffs,
  useDraftEditsDiffs,
  useEventEditsDiffs,
  useNameMapping,
  usePopulationsDisplayValues,
} from '@gvs/graphql/hooks';
import { DEFAULT_PLATFORMS } from '@gvs/scenes/constants';
import AGGrid from '@gvs/components/AGGrid';
import ExpandAll from '../ExpandAll';
import {
  COLUMN_DEFS,
  getDetailColumnDefs,
  ROW_HEIGHT,
  MAX_DETAIL_LINE_LENGTH,
  DETAIL_CELL_LINE_LENGTH,
  DETAIL_CELL_LINE_HEIGHT,
} from './constants';
import { useLocalStorage } from '../../hooks';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    flexGrow: 1,
    overflow: 'hidden',
    '& .ag-cell-wrapper.ag-row-group': {
      alignItems: 'center',
    },
    '& .ag-details-row-auto-height': {
      padding: theme.spacing(2),
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
  actions: {
    position: 'absolute',
    top: '-10px',
    right: 0,
    zIndex: 1,
  },
}));

const DeleteCellRenderer = ({ data }) => {
  const snackbar = useSnackbar();
  const { draftId, scopeURI } = useParams();
  const deleteEditMutation = useDeleteDraftsEdit();
  const { refetch: refetchDraftEdits } = useDraftEditsDiffs();
  const { refetch: refetchDraftDiffs } = useDiffs(
    draftId
      ? {
          source: { type: 'live', scopeURI },
          target: { type: 'draft', scopeURI, value: draftId },
        }
      : null
  );
  const onDelete = useCallback(async () => {
    if (!data) return;
    let error;
    try {
      ({ error } = await deleteEditMutation(draftId, data.id));
    } catch (err) {
      error = err;
    }
    if (error) {
      // eslint-disable-next-line
      console.log(error);
      snackbar.error('Something went wrong, see logs for details');
    } else {
      await refetchDraftEdits();
      refetchDraftDiffs();
      snackbar.success('The edit has been successfully deleted');
    }
  }, [data, deleteEditMutation, draftId]);
  if (!data) return null;
  return (
    <ConfirmActionComponent
      onClick={onDelete}
      confirm={{
        title: 'Confirm Draft Edit Delete',
        confirmMsg: 'Are you sure you want to delete the Draft Edit?',
        destructive: true,
      }}
      tooltip="Delete"
      component="IconButton"
    >
      delete
    </ConfirmActionComponent>
  );
};
DeleteCellRenderer.propTypes = {
  data: PropTypes.object.isRequired,
};

const DetailsPlatformHeaderRenderer = ({ column: { colId } }) => (
  <div>{capitalize(colId === '*' ? 'Default Value' : colId)}</div>
);
DetailsPlatformHeaderRenderer.propTypes = {
  column: PropTypes.object.isRequired,
};

const DetailsBase = ({ edits, loading, component }) => {
  const paramName = component === SCENES.DRAFTS ? 'draftId' : 'eventId';
  const classes = useStyles();
  const formatDateTime = useSelector(formatDateTimeSelector);
  const { [paramName]: itemId, scopeURI: currentScopeUri } = useParams();
  const { cache: cachedEdits = [], save: updateCache } =
    useLocalStorage(itemId);
  const [gridApi, setGridApi] = useState();
  const platforms = useConfigOption('GVS_PLATFORMS') || DEFAULT_PLATFORMS;

  const currentScopeName = useMemo(() => {
    const parts = currentScopeUri.split(':');
    return parts[parts.length - 1];
  }, [currentScopeUri]);

  useEffect(() => {
    if (!edits || component === SCENES.EVENTS) {
      return;
    }
    const newValue = edits.map(e => e.id);
    if (!isEqual(cachedEdits, newValue))
      updateCache([{ id: itemId, edits }], false);
  }, [edits, cachedEdits, component]);

  const displayNames = useNameMapping();

  const populations = useMemo(() => {
    if (!edits) return [];
    return edits
      .reduce((acc, { diffs }) => {
        if (!diffs || diffs.length === 0) return acc;
        const [{ populationType, populationValue }] = diffs;
        const population = `${populationType}:${populationValue || PLAYER}`;
        return acc.includes(population) ? acc : [...acc, population];
      }, [])
      .map(population => {
        const [type, value = PLAYER] = population.split(':');
        return { type, value };
      });
  }, [edits]);

  const { populations: displayValues } =
    usePopulationsDisplayValues(populations);

  const rowData = useMemo(() => {
    if (!edits || !displayValues || loading) return null;
    return edits.map(edit => {
      const { diffs } = edit;
      if (!diffs || diffs.length === 0) return { ...edit, diffs: [] };
      return {
        ...edit,
        diffs: edit.diffs.reduce(
          (
            diffsAcc,
            {
              variables,
              populationType,
              populationValue,
              scopeURI: origScopeURI,
              scopeName: origScopeName,
            }
          ) => {
            const scopeURI = origScopeURI || currentScopeUri;
            const scopeName = origScopeName || currentScopeName;
            const population = `${populationType}:${populationValue || PLAYER}`;
            const displayValue =
              populationType === 'global'
                ? POPULATION_TYPE_LABELS[population]
                : displayValues.find(
                    ({ type, value }) =>
                      type === populationType && value === populationValue
                  )?.displayValue;
            const scopeDisplayName = displayNames[scopeName] || scopeName;
            return [
              ...diffsAcc,
              ...variables.reduce(
                (acc, { key, valuesPerPlatform }) => [
                  ...acc,
                  ...valuesPerPlatform.reduce(
                    (platformAcc, { platform, target, source }) => [
                      ...platformAcc,
                      {
                        scopeURI,
                        scopeName,
                        population,
                        displayValue,
                        scopeDisplayName,
                        key,
                        name: key,
                        platform,
                        source: String(source),
                        target: String(target),
                      },
                    ],
                    []
                  ),
                ],
                []
              ),
            ];
          },
          []
        ),
        isNew:
          component === SCENES.EVENTS
            ? undefined
            : (moment().subtract(7, 'd') < moment.unix(edit.createdAt) &&
                !cachedEdits.includes(edit.id)) ||
              undefined,
      };
    });
  }, [edits, cachedEdits, displayValues, loading, component]);

  const getDetailRowHeight = useCallback(
    ({ data }) => {
      const allPlatforms = ['*'].concat(platforms);
      const maxValue = Math.max(
        ...allPlatforms.map(platform =>
          data && data[platform] ? String(data[platform]).length : 0
        )
      );
      if (maxValue > MAX_DETAIL_LINE_LENGTH)
        return (
          Math.ceil(maxValue / DETAIL_CELL_LINE_LENGTH) *
          DETAIL_CELL_LINE_HEIGHT
        );
      return ROW_HEIGHT;
    },
    [platforms]
  );

  const columnDefs = useMemo(() => {
    if (component === SCENES.DRAFTS) return COLUMN_DEFS;
    return COLUMN_DEFS.filter(c => c.field !== 'delete');
  }, [component]);

  if (!itemId) return <Empty>Select draft for details</Empty>;
  return (
    <div className={cn('ag-theme-material', classes.gridContainer)}>
      <ExpandAll key={`${itemId}-expand`} gridApi={gridApi} />
      <AGGrid
        key={itemId}
        masterDetail
        columnDefs={columnDefs}
        rowData={rowData}
        context={{ formatDateTime }}
        components={{
          deleteCellRenderer: DeleteCellRenderer,
        }}
        autoSizeColumns={false}
        rowHeight={ROW_HEIGHT}
        detailCellRendererParams={{
          getDetailRowData({ data, successCallback }) {
            successCallback(data.diffs);
          },
          detailGridOptions: {
            columnDefs: getDetailColumnDefs(platforms),
            groupDisplayType: 'custom',
            groupHideOpenParents: true,
            getRowHeight: getDetailRowHeight,
            components: {
              detailsPlatformHeaderRenderer: DetailsPlatformHeaderRenderer,
            },
            groupDefaultExpanded: -1,
          },
        }}
        onGridReady={({ api }) => {
          setGridApi(api);
          api.forEachLeafNode(node =>
            node.addEventListener('expandedChanged', e => {
              if (e.node.expanded && e.node.data?.isNew) {
                e.node.setData({ ...e.node.data, isNew: false });
                setTimeout(() => api.redrawRows({ rowNodes: [e.node] }), 100);
              }
            })
          );
        }}
        detailRowAutoHeight
      />
    </div>
  );
};

DetailsBase.propTypes = {
  edits: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  component: PropTypes.string.isRequired,
};
DetailsBase.defaultProps = {
  edits: undefined,
  loading: false,
};

const DraftEdits = () => {
  const { edits, loading } = useDraftEditsDiffs();
  return (
    <DetailsBase edits={edits} loading={loading} component={SCENES.DRAFTS} />
  );
};

const EventsEdits = () => {
  const { edits, error, loading } = useEventEditsDiffs();
  if (error) {
    // eslint-disable-next-line
    console.log(error);
    return <Empty>Something went wrong, see logs for details</Empty>;
  }
  return (
    <DetailsBase edits={edits} loading={loading} component={SCENES.EVENTS} />
  );
};

const Details = () => {
  const { scene } = useParams();
  if (scene === SCENES.DRAFTS) return <DraftEdits />;
  return <EventsEdits />;
};
export default Details;
