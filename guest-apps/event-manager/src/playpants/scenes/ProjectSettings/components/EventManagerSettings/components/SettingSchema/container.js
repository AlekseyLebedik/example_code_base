import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';

import StatelessSettingSchema from './presentational';

export const SettingSchema = props => {
  const formRef = useRef();
  const [openKeys, setOpenKeys] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});

  const expandAll = formId => {
    const { listFields } = props.formContext;
    if (!listFields) return;
    if (isExpanded[formId])
      setOpenKeys(
        openKeys.filter(setting => !setting.match(new RegExp(`${formId}\\w*`)))
      );
    else
      setOpenKeys(
        uniq(openKeys.concat(listFields.map(field => `${formId}_${field}`)))
      );
    setIsExpanded({ ...isExpanded, [formId]: !isExpanded[formId] });
  };

  const handleSelection = (title, formId) => {
    const newOpenKeys = includes(openKeys, title)
      ? openKeys.filter(t => t !== title)
      : openKeys.concat([title]);
    setOpenKeys(newOpenKeys);
    const formFilteredKeys = newOpenKeys.filter(key =>
      key.match(new RegExp(`${formId}\\w*`))
    );
    if (formFilteredKeys.length === 0)
      setIsExpanded({ ...isExpanded, [formId]: false });
    else if (formFilteredKeys.length === props.formContext.listFields.length)
      setIsExpanded({ ...isExpanded, [formId]: true });
  };

  const handleChange = (e, keys) => {
    if (e && e.target) {
      let value;
      const { type } = e.target;
      ({ value } = e.target);
      if (type === 'number') {
        value = parseFloat(value);
      } else if (type === 'checkbox') {
        value = e.target.checked;
      }
      keys.onChange(value);
    } else {
      keys.onChange(e);
    }
  };

  const handleFormChange = () => {
    formRef?.current?.submit();
  };

  return (
    <StatelessSettingSchema
      {...props}
      isExpanded={isExpanded}
      expandAll={expandAll}
      formRef={form => {
        formRef.current = form;
      }}
      handleChange={handleChange}
      handleFormChange={handleFormChange}
      handleSelection={handleSelection}
      openKeys={openKeys}
    />
  );
};

SettingSchema.propTypes = {
  formContext: PropTypes.object,
  formData: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  settingSchema: PropTypes.object.isRequired,
};

SettingSchema.defaultProps = {
  formContext: {},
};

export default SettingSchema;
