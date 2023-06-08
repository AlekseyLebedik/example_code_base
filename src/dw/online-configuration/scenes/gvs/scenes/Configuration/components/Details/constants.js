import cn from 'classnames';
import { PLAYER } from '@gvs/constants';
import styles from './index.module.css';

export const LINE_HEIGHT = 18;
export const PADDING = 16;
export const MIN_LINE_LENGTH_TO_BREAK = 60;
export const LINE_LENGTH = 22;

const valueSetter = ({
  newValue,
  context: { scopeURI, population, draftID, platforms },
  colDef: { field: platform },
  api,
  node,
}) => {
  const { valuesPerPlatform } = node.data;
  const oldValue =
    valuesPerPlatform && valuesPerPlatform[platform]
      ? valuesPerPlatform[platform].value
      : undefined;
  const isUncommitted = oldValue !== newValue;
  const [populationType, populationValue = PLAYER] = population.split(':');
  const perPlatformValue = {
    key: node.data.key,
    isUncommitted,
    value: newValue,
    platform,
    source: {
      draftID,
      populationType,
      populationValue,
      population,
      scopeURI,
    },
  };
  if (isUncommitted) {
    // eslint-disable-next-line
    node.data[platform] = perPlatformValue;
    // eslint-disable-next-line
    node.data.isUncommitted = isUncommitted;
  } else {
    // eslint-disable-next-line
    node.data[platform] =
      valuesPerPlatform && valuesPerPlatform[platform]
        ? valuesPerPlatform[platform]
        : undefined;
    // eslint-disable-next-line
    node.data.isUncommitted = platforms.some(p => node.data[p]?.isUncommitted);
  }
  api.redrawRows({ rowNodes: [node] });
  return true;
};

const valueGetter = ({ data, colDef: { field } }) => data && data[field]?.value;

const cellClass = ({
  data,
  colDef: { field },
  context: { scopeURI, population },
}) => {
  const platformValue = data && data[field];
  if (!(platformValue && platformValue.source)) return styles.base;
  const platformPopulation = [
    platformValue.source.populationType,
    platformValue.source.populationValue || PLAYER,
  ].join(':');
  const level =
    scopeURI.split(':').length -
    platformValue.source.scopeURI.split(':').length;
  let className = styles.base;
  const isDraft = Boolean(platformValue.source.draftID);
  const { isUncommitted } = platformValue;
  if (platformValue.source.populationType === 'global') {
    className = styles.global;
  } else if (population === platformPopulation) {
    className = styles.current;
  } else {
    className = styles.parent;
  }
  if (isUncommitted) className = styles.edit;
  else if (isDraft || platformValue?.source?.isUncommitted) {
    className = cn(className, styles.draft);
  }
  return cn(className, styles[`levelUp${level}`]);
};

const columnProps = {
  cellRenderer: 'platformCellRenderer',
  cellClass,
  valueSetter,
  valueGetter,
  cellEditor: 'platformCellEditor',
  minWidth: 100,
  maxWidth: 100,
};

export const getColumnDefs = (
  platforms,
  editable,
  obfuscationColumnVisible = false
) => [
  {
    field: 'key',
    headerName: 'Name',
    filter: 'agTextColumnFilter',
    pinned: 'left',
    sort: 'asc',
    cellClass({ data }) {
      if (data.isUncommitted) return styles.edit;
      if (data.draftID) return styles.draft;
      return '';
    },
    minWidth: 300,
    cellRenderer: 'nameCellRenderer',
  },
  {
    field: 'obfuscatedKey',
    headerName: 'Obfuscated Name',
    pinned: 'left',
    minWidth: 170,
    maxWidth: 170,
    initialHide: !obfuscationColumnVisible,
    valueGetter: ({ data, context }) =>
      data?.obfuscatedKey ||
      (context?.obfuscatedKeys && context.obfuscatedKeys[data?.key]),
  },
  {
    field: '*',
    headerName: 'Default Value',
    pinned: 'left',
    editable,
    ...columnProps,
    minWidth: 210,
    maxWidth: 210,
  },
  ...[...platforms]
    .sort()
    .filter(p => p !== '*')
    .map(p => ({
      field: p,
      headerName: p,
      editable,
      ...columnProps,
    })),
];
