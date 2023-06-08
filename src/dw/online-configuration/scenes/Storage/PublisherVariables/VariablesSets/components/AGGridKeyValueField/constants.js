export const ROW_HEIGHT = 50;

const valueSetter = ({ node, api, column: { colId }, newValue }) => {
  node.setData({ ...node.data, [colId]: newValue });
  setTimeout(() => api.redrawRows({ rowNodes: [node.data] }), 0);
  setTimeout(
    () =>
      api.flashCells({
        rowNodes: [node],
        columns: [colId],
        cellFlashDelay: 2000,
      }),
    100
  );
  return true;
};

export const COLUMN_DEFS = [
  {
    field: 'key',
    minWidth: 300,
    maxWidth: 700,
    flex: 1,
    type: 'keyValue',
    cellRenderer: 'keyCellRenderer',
    getQuickFilterText({ value, context: { variableMapping } }) {
      return String(value).concat(String(variableMapping[value]));
    },
    resizable: true,
    cellClass({ data: { key }, context: { variableMapping } }) {
      return variableMapping[key] ? 'with-label' : '';
    },
    valueSetter,
    cellEditor: 'keyValueCellEditor',
  },
  {
    field: 'value',
    flex: 1,
    minWidth: 300,
    maxWidth: 700,
    type: 'keyValue',
    resizable: true,
    valueSetter,
    cellEditor: 'keyValueCellEditor',
  },
  {
    field: 'delete',
    headerName: 'Actions',
    cellRenderer: 'actionsCellRenderer',
    minWidth: 120,
    maxWidth: 150,
    suppressMenu: true,
    sortable: false,
  },
];
