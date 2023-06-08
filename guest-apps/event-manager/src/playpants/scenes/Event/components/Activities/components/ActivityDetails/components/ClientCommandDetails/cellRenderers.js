import React from 'react';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

export const actionsRenderer = params => {
  const { context, data } = params;
  if (data && data.command) {
    const { onDelete } = context;
    return (
      <ConfirmActionComponent
        tooltip="Delete Command"
        confirm={{
          title: 'Confirm Delete Client Command',
          confirmMsg: (
            <div key="dialogDiv">
              Are you sure you want to remove this command?
            </div>
          ),
          mainButtonLabel: 'Confirm',
          destructive: false,
        }}
        component="IconButton"
        onClick={() => onDelete(data.command)}
      >
        delete
      </ConfirmActionComponent>
    );
  }
  return '';
};
