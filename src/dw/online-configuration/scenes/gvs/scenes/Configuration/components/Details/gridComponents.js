import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { last, startsWith } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

import { Checkbox } from '@material-ui/core';
import { useSnackbar } from 'dw/core/hooks';
import { getReactBaseURL } from 'dw/online-configuration/selectors';
import { useApolloClient } from '@apollo/client';
import { useDefinitions } from '@gvs/graphql/hooks';
import { GET_POPULATION_QUERY } from '@gvs/graphql/queries';
import { PLAYER } from '@gvs/constants';
import {
  getIntValidator,
  getRanges,
  isFloat,
} from '../../../VariableDefinition/components/AddEditDefinition/validation';

const [charMin, charMax] = getRanges('char');

const useDefinition = key => {
  const { definitions } = useDefinitions();
  return useMemo(() => {
    if (!definitions) return null;
    return definitions.find(d => d.key === key);
  }, [definitions, key]);
};

const useDefinitionHelper = key => {
  const definition = useDefinition(key);

  const validation = useMemo(() => {
    if (!definition) return {};
    return definition?.validation ? JSON.parse(definition.validation) : {};
  }, [definition]);

  const [isList, type] = useMemo(() => {
    if (!definition) return [];
    let [_isList, _type] = definition.type.split('_');
    if (_type === undefined) {
      _type = _isList;
      _isList = false;
    }
    return [_isList, _type];
  }, [definition]);

  const [min, max] = useMemo(() => {
    if (!definition) return [];
    const [defaultMin, defaultMax] = getRanges(type);
    const { min: vmin = defaultMin, max: vmax = defaultMax } = validation;
    return [vmin, vmax];
  }, [definition, validation]);

  const labels = useMemo(() => {
    const result = {};
    if (!definition) return result;
    if (type === 'bool') return { type: 'Boolean' };
    let typeLabel = type;
    if (type === 'char') typeLabel = 'String';
    else if (type === 'float32') typeLabel = 'Decimal';
    else if (type.startsWith('int') || type.startsWith('uint'))
      typeLabel = 'Number';
    if (isList) typeLabel = `Comma separated list of ${typeLabel}s`;
    return { type: typeLabel, helperText: `min (${min}); max (${max})` };
  }, [isList, type, min, max]);

  return { min, max, validation, labels };
};

const useStyles = makeStyles(theme => ({
  actions: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    top: 0,
    '& button': {
      zIndex: 1,
    },
    '& .material-icons': {
      fontSize: '14px',
    },
  },
  editField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    height: '100% !important',
  },
  boolFieldContainer: {
    width: '100px',
  },
  variambeNameLink: {
    color: '#4ac0f1',
  },
  value: {
    width: '100%',
    height: '45px',
    position: 'relative',
    paddingLeft: theme.spacing(2),
    zIndex: 1,
    lineHeight: '43px',
  },
}));

const TooltipComponent = ({
  scopeURI,
  platformValue,
  nameMapping,
  children,
}) => {
  const client = useApolloClient();
  const populationDisplayValue = useMemo(() => {
    if (platformValue.source.populationType === 'global') return 'Global Group';
    const { populationType: type, populationValue: value } =
      platformValue.source;
    const platformPopulation = [type, value].join(':');
    const cache = client.readQuery({
      query: GET_POPULATION_QUERY,
      variables: {
        type,
        value,
      },
    });
    if (!cache) return platformPopulation;
    const {
      Population: { displayValue },
    } = cache;
    return displayValue;
  }, [client, platformValue]);
  let scopeName;
  if (scopeURI !== platformValue.source.scopeURI) {
    // The value is defined at the current scope for the current population
    scopeName = last(platformValue.source.scopeURI.split(':'));
    if (nameMapping[scopeName]) scopeName = nameMapping[scopeName];
  }
  const title = scopeName
    ? `(${scopeName}) ${populationDisplayValue}`
    : populationDisplayValue;
  return (
    <Tooltip title={`Set at ${title}`} enterDelay={500} enterNextDelay={500}>
      {children}
    </Tooltip>
  );
};
TooltipComponent.propTypes = {
  scopeURI: PropTypes.string.isRequired,
  platformValue: PropTypes.object.isRequired,
  nameMapping: PropTypes.object,
  children: PropTypes.node.isRequired,
};
TooltipComponent.defaultProps = {
  nameMapping: {},
};

export const PlatformCellRenderer = ({
  colDef: { field: platform },
  context: {
    nameMapping,
    platforms,
    draftID,
    keyTypeMapping,
    scopeURI,
    population,
    editMode,
  },
  api,
  data: { key },
  rowIndex,
  column,
}) => {
  const startEditing = () => {
    const isPinned = !!api.pinnedRowModel?.pinnedTopRows.find(
      ({ data }) => data.key === key
    );

    const startEditingParams = {
      rowIndex,
      colKey: column?.getId(),
      rowPinned: isPinned ? 'top' : undefined,
    };
    api.startEditingCell(startEditingParams);
  };

  const getRowNode = useCallback(
    k => {
      const node = api.getRowNode(k);
      if (node) return node;
      return (
        api?.pinnedRowModel?.pinnedTopRows?.find(n => n.data.key === k) || {
          data: {},
        }
      );
    },
    [api]
  );
  const classes = useStyles();
  const platformValue = useMemo(() => {
    const node = getRowNode(key);
    const { data } = node;
    return data && data[platform];
  }, [key, getRowNode]);

  const onDelete = useCallback(() => {
    const node = getRowNode(key);
    const { data } = node;
    const newData = {
      ...data,
      [platform]: data.valuesPerPlatform
        ? data.valuesPerPlatform[platform]
        : undefined,
      isUncommitted: platforms
        .filter(p => p !== platform)
        .some(p => data[p]?.isUncommitted),
    };
    if (node.rowPinned) {
      node.data = newData;
    } else {
      api.applyTransaction({ update: [newData] });
    }
    api.redrawRows({ rowNodes: [node] });
  }, [key, platform, platforms, api, getRowNode]);

  const onUnset = useCallback(() => {
    const node = getRowNode(key);
    const { data } = node;
    if (
      !data.valuesPerPlatform ||
      data.valuesPerPlatform[platform] === undefined ||
      data.valuesPerPlatform[platform]?.source?.population !== population
    ) {
      onDelete();
      return;
    }
    const [populationType, populationValue = PLAYER] = population.split(':');
    const newData = {
      ...data,
      [platform]: {
        key: data.key,
        unset: true,
        value: data.valuesPerPlatform[platform]?.parentValue,
        isUncommitted: true,
        platform,
        source: {
          draftID,
          population,
          populationType,
          populationValue,
          scopeURI,
        },
      },
      isUncommitted: true,
    };
    if (node.rowPinned) {
      node.data = newData;
    } else {
      api.applyTransaction({ update: [newData] });
    }
    api.redrawRows({ rowNodes: [node] });
  }, [key, platform, population, draftID, scopeURI, api, getRowNode]);

  const onExclude = useCallback(() => {
    const node = getRowNode(key);
    const { data } = node;
    const [populationType, populationValue = PLAYER] = population.split(':');
    const newData = {
      ...data,
      [platform]: {
        key,
        value: null,
        isUncommitted: true,
        platform,
        source: {
          draftID,
          population,
          populationType,
          populationValue,
          scopeURI,
        },
      },
      isUncommitted: true,
    };
    if (node.rowPinned) {
      node.data = newData;
    } else {
      api.applyTransaction({ update: [newData] });
    }
    api.redrawRows({ rowNodes: [node] });
  }, [key, platform, population, draftID, scopeURI, api, getRowNode]);

  if (!platformValue)
    return <div className={classes.value} onClick={startEditing} />;
  let value = String(platformValue.value) || <>&nbsp;</>;
  if (['None', 'null'].includes(value)) value = 'null';
  else if (keyTypeMapping[key] === 'bool')
    value = ['true', '1'].includes(value) ? 'true' : 'false';
  else if (value === '__UNSET__') value = 'Not Set';
  return (
    <>
      <TooltipComponent
        scopeURI={scopeURI}
        platformValue={platformValue}
        nameMapping={nameMapping}
      >
        <div className={classes.value} onClick={startEditing}>
          {value}
        </div>
      </TooltipComponent>
      {editMode.enabled ? (
        <div className={classes.actions}>
          {value !== 'null' || platformValue.unset ? (
            <Tooltip title="Exclude this key for this platform">
              <IconButton size="small" color="secondary" onClick={onExclude}>
                <Icon fontSize="inherit">block</Icon>
              </IconButton>
            </Tooltip>
          ) : null}
          {!platformValue.unset &&
          platformValue.source?.population === population &&
          platformValue.source?.scopeURI === scopeURI ? (
            <Tooltip title="Remove Override">
              <IconButton size="small" color="secondary" onClick={onUnset}>
                <Icon fontSize="inherit">clear</Icon>
              </IconButton>
            </Tooltip>
          ) : null}
          {platformValue.isUncommitted ? (
            <Tooltip title="Undo current edit">
              <IconButton size="small" onClick={onDelete}>
                <Icon fontSize="inherit">undo</Icon>
              </IconButton>
            </Tooltip>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
PlatformCellRenderer.propTypes = {
  colDef: PropTypes.object.isRequired,
  data: PropTypes.object,
  context: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
};
PlatformCellRenderer.defaultProps = {
  data: {},
};

export const PlatformCellEditor = forwardRef((props, ref) => {
  const { value: oldValue } = props;
  const classes = useStyles();
  const snackbar = useSnackbar();
  const definition = useDefinition(props.data.key);

  const { min, max, validation, labels } = useDefinitionHelper(props.data.key);

  const options = useMemo(() => {
    return validation.enum
      ? validation.enum
          .split(',')
          .reduce(
            (acc, item) => (acc.includes(item) ? acc : [...acc, item]),
            []
          )
      : [];
  }, [validation]);
  const isMulti = useMemo(
    () => options.length > 0 && startsWith(definition?.type, 'list_'),
    [definition, options]
  );
  const [value, setValue] = useState(undefined);
  const [error, setError] = useState();

  const [isList, type] = useMemo(() => {
    if (!definition) return [];
    let [_isList, _type] = definition.type.split('_');
    if (_type === undefined) {
      _type = _isList;
      _isList = false;
    }
    return [_isList, _type];
  }, [definition]);

  useEffect(() => {
    if (!definition) return;
    let newValue = String(props.value);
    if (isMulti) {
      newValue = props.value
        ? String(props.value)
            .split(',')
            .filter(v => options.includes(v))
        : [];
    }
    setValue(newValue);
  }, [definition, props.value, isMulti, type]);

  const validate = useCallback(
    newValue => {
      if (!definition) return false;
      if (oldValue === newValue) return null;
      if (!(oldValue || newValue)) return null;
      if (definition.type === 'bool') {
        if (typeof newValue !== 'boolean') {
          return 'Should be true or false';
        }
        return null;
      }
      if (definition.type === 'float32') {
        if (!isFloat(newValue)) return 'Should be a Decimal number';
        const [floatMin, floatMax, floatValue] = [min, max, newValue].map(
          parseFloat
        );
        if (floatValue < floatMin || floatValue > floatMax) {
          return `The value should be in range [${min} : ${max}]`;
        }
        return null;
      }
      if (isList || definition.type === 'char') {
        const r0 = parseInt(isList && type !== 'char' ? charMin : min, 10);
        const r1 = parseInt(isList && type !== 'char' ? charMax : max, 10);
        if (newValue.length < r0 || newValue.length > r1) {
          return `The value length should be in range [${r0} : ${r1}]`;
        }
        if (type === 'char') {
          return null;
        }
      }
      const valuesList = String(newValue).split(',');
      const validator = getIntValidator(type, min, max);
      if (valuesList.every(v => validator(v))) return null;
      return `${
        isMulti ? 'Each value in a list' : 'Value'
      } should be in range [${min} : ${max}]`;
    },
    [definition]
  );
  useEffect(() => {
    setError(null);
    if (!definition || value === undefined) return;
    const newValue = isMulti && Array.isArray(value) ? value.join(',') : value;
    const e = validate(newValue);
    setError(e);
  }, [definition, value, validate]);

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (!inputRef.current) return;
      inputRef.current.focus();
      inputRef.current.select();
    }, 100);
  }, []);

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return isMulti && Array.isArray(value)
          ? value.join(',')
          : String(value);
      },

      isCancelBeforeStart() {
        return false;
      },

      isCancelAfterEnd() {
        if (error)
          snackbar.error(
            `The value was not changed due to the error: ${error}`
          );
        return (
          Boolean(error) ||
          String(props.value) ===
            (isMulti && Array.isArray(value) ? value.join(',') : value)
        );
      },
      isPopup() {
        return type !== 'bool';
      },
    };
  });

  if (!definition || value === undefined) return null;

  if (type === 'bool') {
    return (
      <div className={classes.boolFieldContainer}>
        <Checkbox
          inputRef={inputRef}
          color="primary"
          checked={['true', '1', true].includes(value)}
          onChange={event => setValue(event.target.checked)}
        />
      </div>
    );
  }

  if (validation.enum)
    return (
      <AutocompleteGeneral
        className={classes.editField}
        defaultValue={
          isMulti && Array.isArray(value)
            ? value.map(v => ({ value: v, label: v }))
            : value
        }
        onChange={v => {
          let newValue = v;
          if (!newValue) {
            newValue = isMulti ? [] : '';
          }
          setValue(newValue);
        }}
        options={options}
        textFieldProps={{
          fullWidth: true,
          style: { width: '100%', minWidth: '250px' },
        }}
        isMulti={isMulti}
        error={Boolean(error)}
        helperText={error && `Error: ${error}`}
        valuesOnly
      />
    );
  return (
    <TextField
      inputRef={inputRef}
      label={`Type: ${labels.type}`}
      InputLabelProps={{ shrink: true }}
      className={classes.editField}
      value={value.split(',').join('\n')}
      error={Boolean(error)}
      helperText={error ? `Error: ${error}` : labels.helperText}
      type={
        (startsWith(definition.type, 'int') ||
          startsWith(definition.type, 'uint')) &&
        !['int64', 'uint64'].includes(type)
          ? 'number'
          : undefined
      }
      onChange={e => setValue(e.target.value.split('\n').join(','))}
      fullWidth
      multiline
    />
  );
});

PlatformCellEditor.propTypes = {
  data: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
};
PlatformCellEditor.defaultProps = {
  value: '',
};

const Tip = ({ variableDefinition, scopeURI }) => {
  const classes = useStyles();
  const variableDefinitionUrl = useSelector(
    state => `${getReactBaseURL(state)}gvs/variable-definition/${scopeURI}?q=`
  );
  const { labels } = useDefinitionHelper(variableDefinition.key);
  return variableDefinition ? (
    <>
      <div>Key: {variableDefinition.key}</div>
      <div>
        Type: {labels.type} {labels.helperText}
      </div>
      {variableDefinition.description && (
        <div>Description: {variableDefinition.description}</div>
      )}
      {variableDefinition.validation && (
        <div>Validation: {variableDefinition.validation}</div>
      )}
      <a
        target="_blank"
        href={`${variableDefinitionUrl}${variableDefinition.key}`}
        rel="noreferrer"
        className={classes.variambeNameLink}
      >
        See details ...
      </a>
    </>
  ) : null;
};
Tip.propTypes = {
  variableDefinition: PropTypes.object,
  scopeURI: PropTypes.string.isRequired,
};
Tip.defaultProps = {
  variableDefinition: null,
};

export const NameCellRenderer = ({ value, context: { scopeURI } }) => {
  const variableDefinition = useDefinition(value);
  const tip = (
    <Tip variableDefinition={variableDefinition} scopeURI={scopeURI} />
  );

  return (
    <Tooltip interactive title={tip} enterDelay={500} enterNextDelay={500}>
      <div>{value}</div>
    </Tooltip>
  );
};

NameCellRenderer.propTypes = {
  value: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
};
