import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Select from 'dw/core/components/FormFields/Select';

const TemplatesField = props => {
  const { templatesData, onChangeSelectedTemplate, selectedTemplate } = props;
  const hasSelectedTemplate = !isEmpty(selectedTemplate);
  const orderedTemplates = sortBy(templatesData, templates => templates.name);

  return (
    <>
      <Field
        component={Select}
        InputProps={{
          endAdornment: hasSelectedTemplate && (
            <InputAdornment position="end">
              <Tooltip title="Clear story">
                <IconButton onClick={e => onChangeSelectedTemplate(e, null)}>
                  <Icon>clear</Icon>
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        fullWidth
        label="Template"
        name="templates"
        onChange={onChangeSelectedTemplate}
      >
        {orderedTemplates.map(orderedTemplateSetting => (
          <MenuItem
            key={orderedTemplateSetting.name}
            value={orderedTemplateSetting.source_event}
          >
            {orderedTemplateSetting.name}
          </MenuItem>
        ))}
      </Field>
    </>
  );
};

TemplatesField.propTypes = {
  templatesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeSelectedTemplate: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.object.isRequired,
};

export default TemplatesField;
