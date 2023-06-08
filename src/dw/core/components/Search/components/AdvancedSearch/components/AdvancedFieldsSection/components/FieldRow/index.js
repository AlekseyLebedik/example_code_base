import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import GetFieldRowComponent from '../GetRowFields';

const AddOtherButton = ({ addMoreFields, field }) => (
  <Tooltip title="Add new field" placement="left">
    <IconButton
      onClick={() => addMoreFields(field)}
      className="add-other-field"
    >
      <Icon fontSize="small">playlist_add</Icon>
    </IconButton>
  </Tooltip>
);

AddOtherButton.propTypes = {
  field: PropTypes.object.isRequired,
  addMoreFields: PropTypes.func.isRequired,
};

const RemoveButton = ({ removeField, field }) => (
  <Tooltip title="Remove field" placement="left">
    <IconButton
      onClick={() => removeField(field.key, false)}
      className="remove-other-field"
    >
      <Icon fontSize="small">remove</Icon>
    </IconButton>
  </Tooltip>
);

RemoveButton.propTypes = {
  field: PropTypes.object.isRequired,
  removeField: PropTypes.func.isRequired,
};

const FieldRow = ({
  field,
  values,
  onChange,
  timezone,
  removeField,
  addMoreFields,
}) => {
  let adornment;
  if (field.multi)
    adornment = <AddOtherButton addMoreFields={addMoreFields} field={field} />;
  if (field.removable)
    adornment = <RemoveButton removeField={removeField} field={field} />;

  return (
    <div key={`field-row-label-${field.key}-${field.position}`}>
      <GetFieldRowComponent
        field={field}
        adornment={adornment}
        onChange={onChange}
        values={values}
        timezone={timezone}
      />
    </div>
  );
};

FieldRow.propTypes = {
  field: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  addMoreFields: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
};

export default FieldRow;
