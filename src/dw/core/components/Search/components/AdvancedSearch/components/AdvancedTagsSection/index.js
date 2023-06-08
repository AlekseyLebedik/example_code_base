import React from 'react';
import PropTypes from 'prop-types';

import { hasData } from 'dw/core/helpers/object';
import { DATE_TIME_FORMATS, formatDateTime } from 'dw/core/helpers/date-time';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const Tag = ({ id, name, value, removeField }) => (
  <span className={`mdl-chip mdl-chip--deletable ${id}`}>
    <Tooltip title={`${name}: ${value}`}>
      <span className="mdl-chip__text">{`${name}: ${value}`}</span>
    </Tooltip>
    <IconButton
      className="mdl-chip__action"
      onClick={() => {
        removeField(id, true);
      }}
    >
      <Icon fontSize="small">cancel</Icon>
    </IconButton>
  </span>
);

Tag.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  removeField: PropTypes.func.isRequired,
};

const AdvancedTagsSection = ({ values, fields, timezone, removeField }) =>
  hasData(values) && (
    <div key="tag-panel" className="advanced-search-tag-section">
      {Object.keys(values).map(key => {
        const field = fields.find(f => f.key === key || f.parent === key);
        const tagValue = values[key];
        let displayValue;
        switch (field.type) {
          case 'date':
            displayValue = formatDateTime(
              tagValue,
              DATE_TIME_FORMATS.DEFAULT_DATE,
              timezone
            );
            break;
          case 'datetime':
            displayValue = formatDateTime(
              tagValue,
              DATE_TIME_FORMATS.DEFAULT,
              timezone
            );
            break;
          case 'bool':
            displayValue = tagValue ? 'Yes' : 'No';
            break;
          default:
            displayValue = tagValue;
        }
        return (
          <Tag
            key={key}
            id={key}
            name={field.label || field.parent || key}
            value={displayValue}
            removeField={removeField}
          />
        );
      })}
    </div>
  );

AdvancedTagsSection.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.object.isRequired,
  removeField: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
};

export default AdvancedTagsSection;
