import React from 'react';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

export const DeleteColumnFormatter = params => {
  const {
    data,
    context: { onRemove, deleteDestructive, cancelOnBackdropClick },
  } = params;
  return (
    <ConfirmActionComponent
      component="IconButton"
      tooltip="Remove"
      onClick={() => onRemove([data])}
      confirm={{
        title: 'Confirm Remove',
        confirmMsg: `Are you sure you want to remove "${
          data.name || data.username
        }" from the group?`,
        mainButtonLabel: 'Remove',
        destructive: deleteDestructive,
      }}
      cancelOnBackdropClick={cancelOnBackdropClick}
    >
      delete
    </ConfirmActionComponent>
  );
};

export const COLUMNS = [
  {
    field: '',
    headerName: '',
    width: 50,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    suppressMenu: true,
    suppressSizeToFit: true,
  },
  {
    headerName: 'Id',
    field: 'id',
  },
  {
    headerName: 'Username',
    valueGetter: ({ data: { name, username } }) =>
      name ? `${name} (${username})` : username,
  },
  { headerName: 'Email', field: 'email' },
  {
    headerName: '',
    cellRenderer: 'deleteColumnFormatter',
    width: 94,
    suppressMenu: true,
    suppressSizeToFit: true,
  },
];
