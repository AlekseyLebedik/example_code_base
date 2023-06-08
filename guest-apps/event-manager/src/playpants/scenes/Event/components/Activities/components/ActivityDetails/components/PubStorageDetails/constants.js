export const columnDefs = (contextsData, disabled, functionRefs) => {
  const { onSaveCell } = functionRefs;
  return [
    {
      headerName: 'Title',
      field: 'title',
      onCellValueChanged: onSaveCell,
      editable: !disabled,
    },
    {
      headerName: 'Filename',
      field: 'filename',
      editable: false,
    },
    {
      headerName: 'Remote Filename',
      field: 'remoteFilename',
      onCellValueChanged: onSaveCell,
      editable: !disabled,
    },
    {
      headerName: 'Context',
      field: 'context',
      onCellValueChanged: onSaveCell,
      editable: !disabled,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: contextsData,
      },
    },
    {
      headerName: 'Size',
      field: 'size',
      editable: false,
    },
    {
      headerName: 'Comment',
      field: 'comment',
      cellEditor: 'agLargeTextCellEditor',
      onCellValueChanged: onSaveCell,
      editable: !disabled,
    },
  ];
};
