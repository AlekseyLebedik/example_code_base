import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isEqual from 'lodash/isEqual';
import groupBy from 'lodash/groupBy';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AGGrid from 'dw/online-configuration/scenes/gvs/components/AGGrid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';

import { GVS_EDIT_CONFIGURATION } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission, useFormatDateTime } from 'dw/core/hooks';

import Empty from 'dw/core/components/Empty';
import Select from 'dw/core/components/Select';
import SearchField from 'dw/core/components/AGGrid/components/SearchField';
import { useConfigOption } from 'dw/online-configuration/hooks';
import { BreadcrumbsContext } from 'dw/online-configuration/scenes/gvs/context';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { DEFAULT_PLATFORMS } from 'dw/online-configuration/scenes/gvs/scenes/constants';
import {
  useDefinitions,
  useDefinitionsKeyTypeMapping,
  useNameMapping,
} from 'dw/online-configuration/scenes/gvs/graphql/hooks';
import { PLAYER } from '@gvs/constants';
import { getColumnDefs } from './constants';
import SelectDraftModal from './components/SelectDraftModal';
import AddDefinitions from './components/AddDefinitions';
import SaveButton from './components/SaveButton';
import { useDraft, useExternalFilters } from './hooks';
import {
  NameCellRenderer,
  PlatformCellRenderer,
  PlatformCellEditor,
} from './gridComponents';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    flexGrow: 1,
    overflowY: 'hidden',
    '& .ag-header-cell': {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '& .ag-cell': {
      paddingLeft: '8px !important',
      paddingRight: '5px !important',
    },
    '& .ag-cell.ag-cell-inline-editing': {
      top: '0',
      width: 'auto !important',
      zIndex: '10',
    },
    '& .ag-cell .ag-react-container': {
      paddingLeft: '0',
    },
    '& .ag-cell-wrapper': {
      width: '100%',
    },
    '& .ag-cell-wrapper .ag-cell-value': {
      width: '100%',
    },
  },
  filters: {
    display: 'flex',
    width: '100%',
  },
  quickFilter: {
    marginTop: theme.spacing(2),
    flexGrow: 2,
    maxWidth: '50%',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '42px',
    marginTop: -theme.spacing(1),
  },
  draftSelector: {
    paddingLeft: theme.spacing(1),
    color: ({ draftId }) =>
      draftId === null ? '#00a36c' : 'rgba(0, 0, 0, 0.5)',
    fontWeight: 550,
  },
  draftSelectorRoot: {
    margin: 0,
    marginRight: theme.spacing(2),
  },
  draftSelectorWithDraft: {
    backgroundColor: '#d5d5d5',
  },
  draftSelectorEditMode: {
    backgroundColor: '#dff4ec',
    lineHeight: '32px',
    padding: `0 ${theme.spacing(1)}px`,
  },
  editBtn: {
    marginLeft: -theme.spacing(2),
  },
  lastModifiedAt: {
    fontSize: '0.65rem',
    marginTop: '-1px',
  },
}));

const Details = ({
  populationOverride,
  editable,
  data,
  draftSelector,
  edits,
  setEdits,
  error,
  currentEdits,
  refetchConfiguration,
  refetchDraft,
}) => {
  const keyTypeMapping = useDefinitionsKeyTypeMapping();
  const nameMapping = useNameMapping();
  const [gridApi, setGridApi] = useState();
  const columnApiRef = useRef();
  const { scopeURI, population = populationOverride, eventId } = useParams();
  const { draftId, draftOptions, onChangeDraft, draftName } = useDraft();
  const defaultObfuscationColumnVisible = useMemo(
    () => localStorage.getItem('OBFUSCATION_VISIBLE') === 'yes',
    [eventId, draftId, scopeURI, population]
  );
  const [obfuscationColumnVisible, setObfuscationColumnVisible] = useState(
    defaultObfuscationColumnVisible
  );
  const classes = useStyles({ draftId });
  const { actionsContainer, editMode } = useContext(BreadcrumbsContext);
  const [draftSelectOpen, setDraftSelectOpen] = useState();
  const editConfigurationPermission = useCurrentEnvPermission([
    GVS_EDIT_CONFIGURATION,
  ]);
  const { isExternalFilterPresent, doesExternalFilterPass, FiltersComponent } =
    useExternalFilters({
      gridApi,
      populationOverride,
      config: data,
    });
  const configPlatforms = useConfigOption('GVS_PLATFORMS');
  const platforms = useMemo(
    () => ['*'].concat(configPlatforms || DEFAULT_PLATFORMS),
    [configPlatforms]
  );
  const { definitions, refetch: refetchDefinitions } = useDefinitions();
  const availableKeys = useMemo(
    () =>
      definitions &&
      definitions.filter(({ isArchived }) => !isArchived).map(({ key }) => key),
    [definitions]
  );

  const onDataChanged = useCallback(() => {
    if (!editMode.enabled) return;
    const updatedEdits = [];
    const processNode = node =>
      platforms.forEach(platform => {
        const platformValue = node.data[platform];
        if (!(platformValue && platformValue.isUncommitted)) return;
        if (platformValue.source.population === population)
          updatedEdits.push(platformValue);
      });
    gridApi.forEachLeafNode(processNode);
    gridApi.pinnedRowModel?.pinnedTopRows?.forEach(processNode);
    setEdits(allEdits => [
      ...allEdits.filter(
        e =>
          !(
            e.source.scopeURI === scopeURI && e.source.population === population
          )
      ),
      ...updatedEdits,
    ]);
  }, [platforms, gridApi, editMode.enabled]);

  const formatDateTime = useFormatDateTime();
  const lastModifiedAt = useMemo(() => {
    if (!data || draftId) return undefined;
    return `Last Updated ${formatDateTime(data.lastModifiedAt)}`;
  }, [data, formatDateTime]);

  useEffect(() => {
    if (!(gridApi && data)) return;
    const transaction = { add: [], update: [] };
    const [populationType, populationValue = PLAYER] = population.split(':');
    const { variables: rawVariables } = data;
    rawVariables
      .filter(({ key }) => !availableKeys || availableKeys.includes(key))
      .forEach(({ key, ...vars }) => {
        const valuesPerPlatform = vars.valuesPerPlatform.reduce(
          (acc, value) => {
            const source = {
              ...value.source,
              populationType: value.source?.populationType || populationType,
              populationValue:
                value.source?.populationValue ||
                (populationType === 'global' ? PLAYER : populationValue),
              scopeURI: value.source?.scopeURI || scopeURI,
            };
            const platformPopulation = `${source.populationType}:${
              source.populationValue || PLAYER
            }`;
            source.population = platformPopulation;
            return {
              ...acc,
              [value.platform]: {
                ...value,
                source,
              },
            };
          },
          {}
        );
        const result = {
          key,
          ...vars,
          valuesPerPlatform,
          ...valuesPerPlatform,
        };
        const node = gridApi.getRowNode(key);
        const editsForKey = currentEdits.filter(e => e.key === key);
        let changed = false;
        editsForKey.forEach(e => {
          if (!isEqual(e, result[e.platform])) {
            changed = true;
            result[e.platform] = e;
            result.isUncommitted = true;
          }
        });
        if (!node) {
          transaction.add.push(result);
        } else if (changed) {
          transaction.update.push(result);
        }
      });
    const missingEdits = groupBy(
      currentEdits.filter(e => !rawVariables.find(v => v.key === e.key)),
      'key'
    );
    const pinnedRows =
      gridApi.pinnedRowModel?.pinnedTopRows?.map(node => node.data) || [];
    Object.entries(missingEdits).forEach(([k, lst]) => {
      if (pinnedRows.find(n => n.key === k)) return;
      const pinnedRow = {
        key: k,
        isUncommitted: true,
      };
      lst.forEach(e => {
        pinnedRow[e.platform] = e;
      });
      pinnedRows.push(pinnedRow);
    });
    gridApi.setPinnedTopRowData(pinnedRows);

    gridApi.applyTransaction(transaction);
  }, [gridApi, data, availableKeys, currentEdits]);

  const columnDefs = useMemo(
    () =>
      getColumnDefs(
        platforms,
        editMode.enabled,
        defaultObfuscationColumnVisible
      ),
    [platforms, editMode.enabled, defaultObfuscationColumnVisible]
  );

  const onGridReady = useCallback(({ api, columnApi }) => {
    setGridApi(api);
    columnApiRef.current = columnApi;
  }, []);

  const onColumnVisible = useCallback(e => {
    if (!(e.type === 'columnVisible' && e.column.colId === 'obfuscatedKey'))
      return;
    localStorage.setItem('OBFUSCATION_VISIBLE', e.visible ? 'yes' : 'no');
    setObfuscationColumnVisible(e.visible);
  }, []);

  const toggleEditMode = useCallback(
    enabled => {
      editMode.toggle(enabled);
    },
    [editMode]
  );

  const onEdit = useCallback(() => {
    if (draftId) {
      toggleEditMode();
    } else {
      setDraftSelectOpen(true);
    }
  }, [draftId]);

  useEffect(() => {
    if (editMode.enabled && !draftId) {
      toggleEditMode(false);
    }
  }, [draftId, editMode]);

  const toggleObfuscationColumn = useCallback(e => {
    if (!columnApiRef.current) return;
    const columns = columnApiRef.current.getColumnState();
    columnApiRef.current.applyColumnState({
      state: columns.map(c =>
        c.colId === 'obfuscatedKey' ? { ...c, hide: !e.target.checked } : c
      ),
    });
  }, []);

  if (error) {
    // eslint-disable-next-line
    console.log(error);
    return <Empty>Something went wrong. See logs for details</Empty>;
  }
  return (
    <>
      {draftSelector && (
        <Portal container={actionsContainer}>
          <FormControlLabel
            control={
              <Checkbox
                checked={obfuscationColumnVisible}
                onChange={toggleObfuscationColumn}
                color="primary"
              />
            }
            label="show obfuscation names"
          />
          <div className={classes.actions}>
            {editMode.enabled ? (
              <>
                <Typography
                  color="primary"
                  className={classes.draftSelectorEditMode}
                >
                  Editing <strong>{draftName}</strong>
                </Typography>
                <ConfirmActionComponent
                  tooltip="Discard Changes"
                  component="IconButton"
                  confirm={
                    edits.length > 0
                      ? {
                          title: 'Confirm Discard Changes',
                          confirmMsg: (
                            <>
                              <p>
                                Are you sure you want to discard all the changes
                                you have made?
                              </p>
                              <p>
                                If you want to save the changes, please click{' '}
                                <strong>Cancel</strong> and hit the{' '}
                                <strong>Save</strong> button next to this one.
                              </p>
                            </>
                          ),
                          destructive: true,
                        }
                      : undefined
                  }
                  onClick={() => toggleEditMode(false, true)}
                >
                  clear
                </ConfirmActionComponent>
                <SaveButton
                  edits={edits}
                  toggleEditMode={toggleEditMode}
                  refetchConfiguration={refetchConfiguration}
                  refetchDraft={refetchDraft}
                />
              </>
            ) : (
              <>
                <Select
                  classes={{
                    root: cn(classes.draftSelector, {
                      [classes.draftSelectorWithDraft]: draftId,
                    }),
                  }}
                  className={classes.draftSelectorRoot}
                  options={draftOptions}
                  value={draftId || '--'}
                  onChange={e => onChangeDraft(e.target.value)}
                  helperText={lastModifiedAt}
                  FormHelperTextProps={{ className: classes.lastModifiedAt }}
                />
                {editConfigurationPermission && editable && (
                  <Tooltip title="Edit Configuration">
                    <IconButton onClick={onEdit} className={classes.editBtn}>
                      <Icon>edit</Icon>
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
          </div>
        </Portal>
      )}
      {draftSelectOpen ? (
        <SelectDraftModal
          onChange={() => {
            toggleEditMode(true);
          }}
          handleClose={() => setDraftSelectOpen(false)}
        />
      ) : null}
      <div className={cn(classes.filters, 'gvs-configuration-filters')}>
        {gridApi && editMode.enabled ? (
          <AddDefinitions
            gridApi={gridApi}
            scopeURI={scopeURI}
            gridData={data}
            currentEdits={currentEdits}
            definitions={definitions}
            refetchDefinitions={refetchDefinitions}
          />
        ) : null}
        <SearchField
          gridApi={gridApi}
          className={classes.quickFilter}
          placeholder="Search Variables"
          queryParamName="q"
        />
        {FiltersComponent}
      </div>
      <div className={cn('ag-theme-material', classes.gridContainer)}>
        <AGGrid
          key={`${scopeURI}-${population}-${draftId}-${eventId}-${editMode.enabled}`}
          columnDefs={columnDefs}
          defaultColDef={{ autoHeight: false }}
          components={{
            nameCellRenderer: NameCellRenderer,
            platformCellRenderer: PlatformCellRenderer,
            platformCellEditor: PlatformCellEditor,
          }}
          rowData={null}
          context={{
            nameMapping,
            platforms,
            draftID: draftId,
            keyTypeMapping,
            scopeURI,
            population,
            editMode,
          }}
          onGridReady={onGridReady}
          getRowId={({ data: d }) => d.key}
          suppressRowClickSelection
          suppressRowHoverHighlight
          onCellValueChanged={onDataChanged}
          onRowDataUpdated={onDataChanged}
          onColumnVisible={onColumnVisible}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
          suppressClickEdit
        />
      </div>
    </>
  );
};

Details.propTypes = {
  data: PropTypes.object,
  populationOverride: PropTypes.string,
  editable: PropTypes.bool,
  draftSelector: PropTypes.bool,
  currentEdits: PropTypes.arrayOf(PropTypes.object),
  edits: PropTypes.arrayOf(PropTypes.object),
  setEdits: PropTypes.func,
  error: PropTypes.object,
  refetchConfiguration: PropTypes.func,
  refetchDraft: PropTypes.func,
};
Details.defaultProps = {
  data: undefined,
  populationOverride: undefined,
  editable: true,
  draftSelector: true,
  currentEdits: [],
  edits: [],
  error: undefined,
  setEdits() {},
  refetchConfiguration() {},
  refetchDraft() {},
};

export default Details;
