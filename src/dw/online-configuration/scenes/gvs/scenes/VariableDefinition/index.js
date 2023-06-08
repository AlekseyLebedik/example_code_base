import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { GVS_EDIT_DEFINITIONS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission, useQueryParam } from 'dw/core/hooks';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import AGGrid from 'dw/online-configuration/scenes/gvs/components/AGGrid';
import Loading from 'dw/core/components/Loading';
import SearchField from 'dw/core/components/AGGrid/components/SearchField';
import { BreadcrumbsContext } from '../../context';
import { useDefinitions } from '../../graphql/hooks';
import { COLUMN_DEFS } from './constants';
import { useScopeURI } from './hooks';
import AddEditDefinition from './components/AddEditDefinition';
import { ArchiveBtn, RestoreBtn } from './components/ArchiveRestore';
import PropagateButton from './components/PropagateButton';

const KeyCellRenderer = ({
  data,
  context: { setEditDefinition },
  api,
  ...props
}) => {
  // This is needed to fetch updated data after editing definition.
  const node = api.getRowNode(data.key);
  return (
    <Tooltip title="Edit Definition">
      <a href="#" onClick={() => setEditDefinition(node.data)}>
        {props.valueFormatted || props.value}
      </a>
    </Tooltip>
  );
};

KeyCellRenderer.propTypes = {
  data: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  valueFormatted: PropTypes.string,
  value: PropTypes.string,
  api: PropTypes.object.isRequired,
};
KeyCellRenderer.defaultProps = {
  valueFormatted: undefined,
  value: undefined,
};

const useStyles = makeStyles(theme => ({
  gridContainer: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  actions: {
    position: 'absolute',
    top: '-10px',
    right: 0,
    zIndex: 1,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  showArchived: {
    minWidth: 170,
    marginLeft: theme.spacing(2),
    marginRight: 0,
  },
}));

const INITIAL_FILTERS = {
  showArchived: false,
};

const Definitions = () => {
  const classes = useStyles();
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editDefinition, setEditDefinition] = useState(null);

  const toggleAddForm = useCallback(
    open => setAddFormOpen(open),
    [setAddFormOpen]
  );
  const [selected, setSelected] = useState([]);
  const scopeURI = useScopeURI();
  const { definitions, loading, refetch } = useDefinitions(scopeURI, {
    fetchPolicy: 'network-only',
  });
  const [currentFilters, setCurrentFilters] = useState(INITIAL_FILTERS);
  const filtersRef = useRef(currentFilters);
  const [gridApi, setGridApi] = useState();
  const [, setQuickFilterValue] = useQueryParam('q');
  const setInputValue = useCallback(
    value => {
      setQuickFilterValue(value);
      gridApi.setQuickFilter(value);
    },
    [gridApi, setQuickFilterValue]
  );
  useEffect(() => {
    setCurrentFilters(INITIAL_FILTERS);
    filtersRef.current = INITIAL_FILTERS;
    if (gridApi) gridApi.onFilterChanged();
  }, [gridApi]);
  const showFilter = useMemo(() => {
    if (!definitions) return false;
    return definitions.some(d => d.isArchived);
  }, [definitions]);
  const { actionsContainer } = useContext(BreadcrumbsContext);
  const formatDateTime = useSelector(formatDateTimeSelector);
  const onSelectionChanged = useCallback(
    () => setSelected(gridApi.getSelectedNodes()),
    [gridApi]
  );
  const onGridReady = useCallback(({ api }) => {
    setGridApi(api);
  }, []);
  useEffect(() => {
    if (!(definitions && gridApi)) return;
    const update = [];
    const add = [];
    definitions.forEach(d => {
      const node = gridApi.getRowNode(d.key);
      if (node === undefined) {
        add.push(d);
        return;
      }
      if (!isEqual(d, node.data)) {
        update.push(d);
      }
    });
    gridApi.applyTransaction({ add, update });
  }, [definitions, gridApi]);
  const applyFilters = useCallback(
    filters => {
      const result = Object.keys(filters).length > 0 ? filters : null;
      filtersRef.current = result;
      setCurrentFilters(result);
      setTimeout(() => gridApi.onFilterChanged(), 100);
    },
    [gridApi, setCurrentFilters]
  );
  const isExternalFilterPresent = useCallback(
    () => Boolean(filtersRef.current),
    []
  );
  const doesExternalFilterPass = useCallback(({ data }) => {
    if (!(data && filtersRef.current)) return true;
    const showArchived = filtersRef.current?.showArchived === undefined;
    return showArchived || !data.isArchived;
  }, []);
  const editPermission = useCurrentEnvPermission([GVS_EDIT_DEFINITIONS]);
  if (!definitions && loading) return <Loading />;
  return (
    <>
      <Portal container={actionsContainer}>
        <div className={classes.actions}>
          {editPermission && (
            <Tooltip title="Add new Variable Definition">
              <IconButton onClick={() => toggleAddForm(true)}>
                <Icon>playlist_add</Icon>
              </IconButton>
            </Tooltip>
          )}
          <PropagateButton gridApi={gridApi} selected={selected} />
          {editPermission && [
            <ArchiveBtn
              key="archive"
              selected={selected}
              gridApi={gridApi}
              refetch={refetch}
            />,
            <RestoreBtn
              key="restore"
              selected={selected}
              gridApi={gridApi}
              refetch={refetch}
            />,
          ]}
        </div>
      </Portal>
      <div className={classes.searchContainer}>
        <SearchField
          gridApi={gridApi}
          queryParamName="q"
          placeholder="Search Definitions"
          fullWidth
        />
        {showFilter && (
          <FormControlLabel
            className={classes.showArchived}
            control={
              <Switch
                checked={currentFilters?.showArchived === undefined}
                onChange={event =>
                  applyFilters({
                    ...currentFilters,
                    showArchived: event.target.checked ? undefined : false,
                  })
                }
                color="primary"
              />
            }
            label="Show Archived"
          />
        )}
      </div>
      <div className={cn('ag-theme-material', classes.gridContainer)}>
        <AGGrid
          rowSelection="multiple"
          columnDefs={COLUMN_DEFS}
          rowData={[]}
          context={{ formatDateTime, setEditDefinition }}
          autoSizeColumns={false}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          getRowId={({ data }) => data.key}
          suppressRowClickSelection
          components={{
            keyCellRenderer: KeyCellRenderer,
          }}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
        />
      </div>
      {addFormOpen || Boolean(editDefinition) ? (
        <AddEditDefinition
          gridApi={gridApi}
          handleClose={() => {
            toggleAddForm(false);
            setEditDefinition(null);
          }}
          setFilter={f => setInputValue(f)}
          refetch={refetch}
          isEdit={Boolean(editDefinition)}
          definition={editDefinition || undefined}
        />
      ) : null}
    </>
  );
};

export default Definitions;
