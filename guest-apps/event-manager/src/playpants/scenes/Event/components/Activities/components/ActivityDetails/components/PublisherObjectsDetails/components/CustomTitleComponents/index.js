import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import UploadAction from 'dw/core/components/ObjectStore/UploadAction';

const CustomTitleComponents = ({
  categories,
  deleteSelected,
  disabled,
  disabledUploadAction,
  groups,
  onUpload,
  selectedRows,
}) => (
  <div className="flex" data-cy="pubObjTitleComponents">
    {!disabledUploadAction && (
      <UploadAction
        onUploadFile={onUpload}
        groups={groups}
        categories={categories}
      />
    )}

    <ConfirmActionComponent
      component="IconButton"
      color="inherit"
      tooltipProps={
        !isEmpty(selectedRows)
          ? {
              title: 'Delete Selected',
              placement: 'bottom',
            }
          : null
      }
      onClick={deleteSelected}
      confirm={{
        title: 'Confirm Delete',
        confirmMsg: `Are you sure you want to delete the selected objects?`,
        mainButtonLabel: 'Delete',
        destructive: true,
      }}
      disabled={isEmpty(selectedRows) || disabled}
    >
      delete
    </ConfirmActionComponent>
  </div>
);

CustomTitleComponents.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  disabledUploadAction: PropTypes.bool.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpload: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CustomTitleComponents;
