import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

import {
  STORAGE_ADD_PUBLISHER_VARIABLES,
  STORAGE_DELETE_PUBLISHER_VARIABLES,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import AGGrid from 'dw/core/components/AGGrid';
import SearchField from 'dw/core/components/AGGrid/components/SearchField';
import KeyValueEditor from './components/KeyValueEditor';

import { COLUMN_DEFS, ROW_HEIGHT } from './constants';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    '& .ag-cell': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& .ag-cell-wrapper': {
      lineHeight: '40px',
    },
    '& .ag-cell-value, .ag-react-container': {
      width: '100%',
    },
    '& .ag-cell-inline-editing': {
      height: '50px',
      '& .ag-react-container > div': {
        margin: `4px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
        '& p': {
          marginTop: '-2px',
        },
        '& input': {
          fontSize: '13px',
        },
      },
    },
    '& .ag-theme-material input[class^="ag-"][type="text"]': {
      paddingBottom: 0,
      paddingLeft: theme.spacing(2),
      border: 0,
    },
    '& .with-label .ag-react-container > div': {
      marginTop: -theme.spacing(2),
      lineHeight: '50px',
    },
  },
  gridContainer: { flexGrow: 1 },
  actions: {
    display: 'flex',
    padding: `0 ${theme.spacing(2)}px`,
    width: '100%',
    alignItems: 'flex-end',
  },
  search: {
    marginBottom: theme.spacing(1),
  },
  keyContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    '& div': {
      fontSize: '0.666rem',
      lineHeight: 1,
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },
}));

const ActionsCellRenderer = ({
  api,
  data,
  node,
  context: { hasAddPermission, hasDeletePermission, onDataChanged },
}) => {
  return (
    <>
      {hasAddPermission && (
        <KeyValueEditor
          gridApi={api}
          node={node}
          onDataChanged={onDataChanged}
        />
      )}
      {hasDeletePermission && data ? (
        <Tooltip title="Delete key / value pair" placement="left">
          <IconButton
            onClick={() => {
              api.applyTransaction({ remove: [data] });
            }}
          >
            <Icon>delete</Icon>
          </IconButton>
        </Tooltip>
      ) : null}
    </>
  );
};
ActionsCellRenderer.propTypes = {
  api: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  data: PropTypes.object,
  node: PropTypes.object,
};
ActionsCellRenderer.defaultProps = {
  data: undefined,
  node: undefined,
};

const KeyCellRenderer = ({ value, context: { variableMapping } }) => {
  const classes = useStyles();
  return (
    <div className={classes.keyContainer}>
      {value}
      {variableMapping[value] && <div>{variableMapping[value]}</div>}
    </div>
  );
};
KeyCellRenderer.propTypes = {
  value: PropTypes.string,
  context: PropTypes.object.isRequired,
};
KeyCellRenderer.defaultProps = {
  value: '',
};

const KeyValueCellEditor = forwardRef(
  (
    { api, value: initialValue, column: { colId }, keyPress, charPress },
    ref
  ) => {
    const refInput = useRef(null);

    useLayoutEffect(() => {
      // focus on the input
      setTimeout(() => {
        refInput.current.focus();
        if (!(keyPress || charPress) || keyPress === 13)
          refInput.current.select();
      });
    }, []);

    const [value, setValue] = useState(charPress || initialValue);
    const [error, setError] = useState();

    const keys = useMemo(() => {
      const existing = [];
      api.forEachLeafNode(node => existing.push(node.data.key));
      return existing;
    }, [api]);

    useEffect(() => {
      setError(null);
      if (colId !== 'key') return;
      if (keys.includes(value) && initialValue !== value) {
        setError('Key already exists, change will be ignored');
      }
    }, [keys, value, colId, initialValue]);

    useImperativeHandle(ref, () => {
      return {
        getValue() {
          return value;
        },

        isCancelBeforeStart() {
          return false;
        },

        isCancelAfterEnd() {
          return Boolean(error);
        },
      };
    });
    return (
      <TextField
        inputRef={refInput}
        value={value}
        onChange={e => setValue(e.target.value)}
        error={Boolean(error)}
        helperText={error}
      />
    );
  }
);

KeyValueCellEditor.propTypes = {
  api: PropTypes.object.isRequired,
  value: PropTypes.string,
  column: PropTypes.object.isRequired,
  keyPress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  charPress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
KeyValueCellEditor.defaultProps = {
  value: '',
  keyPress: undefined,
  charPress: undefined,
};

const defaultExportOptions = { columnKeys: ['key', 'value'] };

const AGGridKeyValueField = ({ input, variableMapping }) => {
  const classes = useStyles();
  const [gridApi, setGridApi] = useState();
  const onGridReady = useCallback(({ api }) => {
    setGridApi(api);
    api.sizeColumnsToFit();
  }, []);
  const onDataChanged = useCallback(({ api }) => {
    const data = [];
    api.forEachLeafNode(node => data.push({ ...node.data }));
    input.onChange(data);
  }, []);

  const hasAddPermission = useCurrentEnvPermission(
    STORAGE_ADD_PUBLISHER_VARIABLES
  );
  const hasDeletePermission = useCurrentEnvPermission(
    STORAGE_DELETE_PUBLISHER_VARIABLES
  );
  const columnDefs = useMemo(
    () => COLUMN_DEFS.filter(c => hasDeletePermission || c.field !== 'delete'),
    [hasDeletePermission]
  );
  const columnTypes = useMemo(
    () => ({
      keyValue: {
        editable: hasAddPermission,
      },
    }),
    [hasAddPermission]
  );
  useEffect(() => {
    if (!gridApi) return;
    let count = 0;
    gridApi.forEachLeafNode(() => {
      count += 1;
    });
    if (count === 0)
      gridApi.applyTransaction({ add: input.value.map(v => ({ ...v })) });
  }, [gridApi, input.value]);
  return (
    <div className={classes.container}>
      <div className={classes.actions}>
        <SearchField
          gridApi={gridApi}
          className={classes.search}
          placeholder="Search for Publisher Variables"
          autoFocus
        />
        {hasAddPermission ? (
          <KeyValueEditor gridApi={gridApi} onDataChanged={onDataChanged} />
        ) : null}
      </div>
      <div className={cn('ag-theme-material', classes.gridContainer)}>
        <AGGrid
          onGridReady={onGridReady}
          rowHeight={ROW_HEIGHT}
          columnTypes={columnTypes}
          columnDefs={columnDefs.filter(
            c => hasAddPermission || hasDeletePermission || c.field !== 'delete'
          )}
          rowData={null}
          gridOptions={{
            headerHeight: 25,
            components: {
              actionsCellRenderer: ActionsCellRenderer,
              keyCellRenderer: KeyCellRenderer,
              keyValueCellEditor: KeyValueCellEditor,
            },
            onGridSizeChanged({ api }) {
              api.sizeColumnsToFit();
            },
          }}
          onCellValueChanged={onDataChanged}
          onRowDataUpdated={onDataChanged}
          defaultExcelExportParams={defaultExportOptions}
          defaultCsvExportParams={defaultExportOptions}
          context={{
            hasAddPermission,
            hasDeletePermission,
            variableMapping,
            onDataChanged,
          }}
          autoSizeColumns={false}
          suppressRowClickSelection
          stopEditingWhenCellsLoseFocus
          enableCellChangeFlash
        />
      </div>
    </div>
  );
};
AGGridKeyValueField.propTypes = {
  input: PropTypes.object.isRequired,
  variableMapping: PropTypes.object,
};
AGGridKeyValueField.defaultProps = {
  variableMapping: {},
};

export default AGGridKeyValueField;
