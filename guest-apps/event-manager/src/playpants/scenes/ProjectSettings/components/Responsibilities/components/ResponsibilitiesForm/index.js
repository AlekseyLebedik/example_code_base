import React from 'react';
import PropTypes from 'prop-types';

import MasterDetailForm from 'playpants/components/MasterDetailForm';
import ResponsibilityGroup from '../ResponsibilityGroup';

const ResponsibilitiesForm = ({
  envTypes,
  extraFields,
  form,
  initialValues,
  isLoading,
  onSave,
  selectedItem,
  title,
}) => (
  <MasterDetailForm
    form={form}
    formFields={
      <>
        {extraFields}
        {envTypes.map((env, index) => (
          <div key={env.id}>
            <ResponsibilityGroup
              key={env}
              selection={`envTypes[${index}]`}
              envType={env}
              index={index}
            />
          </div>
        ))}
      </>
    }
    initialValues={initialValues}
    isLoading={isLoading}
    onSave={onSave}
    selectedItem={selectedItem}
    title={title}
  />
);

ResponsibilitiesForm.propTypes = {
  envTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  extraFields: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  form: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  title: PropTypes.string.isRequired,
};

ResponsibilitiesForm.defaultProps = {
  extraFields: null,
  selectedItem: {},
};

export default ResponsibilitiesForm;
