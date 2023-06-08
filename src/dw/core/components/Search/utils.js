export const addField = (field, fields) => {
  const newFields = [...fields];
  const fieldPosition = fields.findIndex(f => f.key === field.key);
  const newFieldInstance =
    newFields.filter(f => f.parent === field.key).length + 1;
  const newField = {
    ...field,
    multi: false,
    removable: true,
    parent: field.key,
    key: `${field.key}-${newFieldInstance + 1}`,
  };
  newFields.splice(fieldPosition + newFieldInstance, 0, newField);
  return { newField, newFields };
};

export const processNestedValues = (values, fields, separator) => {
  const newValues = { ...values };
  let newAllFields = [...fields];
  Object.entries(values).forEach(([name, value]) => {
    const field = fields.find(f => f.key === name);
    if (field.multi) {
      const [mainValue, ...nestedValues] = String(value).split(separator);
      newValues[field.key] = mainValue;
      nestedValues.forEach(v => {
        const { newField, newFields } = addField(field, newAllFields);
        newAllFields = newFields;
        newValues[newField.key] = v;
      });
    }
  });
  return { values: newValues, fields: newAllFields };
};
