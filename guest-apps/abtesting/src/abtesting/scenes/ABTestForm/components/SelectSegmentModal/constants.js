import React from 'react';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import FeatureSwitchesCheck from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';

export const DeleteColumnFormatter = params => {
  const {
    data,
    context: { onRemove, hasDeletePermission },
  } = params;
  return (
    hasDeletePermission && (
      <FeatureSwitchesCheck
        featureSwitches={[fs.ABTESTING_DELETE_SEGMENT]}
        isStaffAllowed={false}
      >
        <ConfirmActionComponent
          component="IconButton"
          tooltip="Remove"
          onClick={() => onRemove([data])}
          confirm={{
            title: 'Confirm Remove',
            confirmMsg: `Are you sure you want to remove segment "${data.name}"?`,
            mainButtonLabel: 'Remove',
            destructive: true,
          }}
        >
          delete
        </ConfirmActionComponent>
      </FeatureSwitchesCheck>
    )
  );
};

function nameComparator(valueA, valueB) {
  if (valueA && valueB) {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  }
  return null;
}

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
    headerName: 'Segment ID',
    field: 'segmentID',
    sortable: true,
  },
  {
    headerName: 'Name',
    field: 'name',
    sortable: true,
    comparator: nameComparator,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: '',
    cellRenderer: 'deleteColumnFormatter',
    width: 94,
    suppressMenu: true,
    suppressSizeToFit: true,
  },
];
