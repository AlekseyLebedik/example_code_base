import React from 'react';

import Textbox from './components/Textbox';
import Dropdown from './components/Dropdown';
import Toggle from './components/Toggle';
import FileUpload from './components/FileUpload';

/* returns default component for input type */
const getInputComponent = inputProps => {
  const { properties } = inputProps;
  const { type, enum: list, contentMediaType } = properties;

  if (list) {
    return <Dropdown {...inputProps} />;
  }
  if (type === 'boolean') {
    return <Toggle {...inputProps} />;
  }
  if (contentMediaType) {
    return <FileUpload {...inputProps} />;
  }
  return <Textbox {...inputProps} />;
};

/* returns input key, value pair for specified key to access it's value */
const getInput = (inputs, key) => inputs.find(i => i.key === key);

/* returns target input with index from name attribute */
export const splitName = (e, props) => {
  const name = e.target.name || e.target.getAttribute('name');
  const [key, index] = name.split(' ');
  const { inputs } = props.data;
  const input = getInput(inputs, key);
  return { input, index: index && index.substring(1, index.indexOf(')')) };
};

/* returns array of row objects for Ag-Grid rowData */
export const formatRowData = props => {
  try {
    const {
      data,
      schema: { properties },
      handleChange,
      handleDelete,
      disabled,
    } = props;

    const arr = [];
    // add row entries for each schema property
    Object.entries(properties).forEach(([key, values]) => {
      const { value } = getInput(data.inputs, key);
      const { type } = values;

      let inputProps = {
        label: key,
        properties: values,
        value,
        handleChange,
        handleDelete,
        deletable: false,
        disabled,
      };

      if (type === 'array') {
        const { items, uniqueItems } = values;
        // create grouped rows
        const group = `${key} [${value.length}]`;
        inputProps = {
          ...inputProps,
          properties: items,
          uniqueItems,
          data,
        };
        const emptyValue = items.contentMediaType ? {} : '';

        if (!value.length) {
          // empty array, initialize single empty input row
          inputProps = {
            ...inputProps,
            label: `${key} (1)`,
            value: emptyValue,
          };
          arr.push({
            key: inputProps.label,
            input: getInputComponent(inputProps),
            group,
          });
        } else {
          // display input rows with current values
          let idx = 1;
          value.forEach(v => {
            inputProps = {
              ...inputProps,
              label: `${key} (${idx})`,
              value: v,
              deletable: true,
            };
            arr.push({
              key: inputProps.label,
              input: getInputComponent(inputProps),
              group,
            });
            idx += 1;
          });
          // append empty row at end for new values
          inputProps = {
            ...inputProps,
            label: `${key} (${idx})`,
            value: emptyValue,
            deletable: false,
          };
          arr.push({
            key: inputProps.label,
            input: getInputComponent(inputProps),
            group,
          });
        }
      } else {
        // individual row entry without group
        arr.push({ key, input: getInputComponent(inputProps) });
      }
    });

    return arr;
  } catch (e) {
    return [];
  }
};

/* returns true if change value is unique amoung input array */
export const uniqueTest = (e, props) => {
  const { input } = splitName(e, props);
  const { value } = input;
  const { file } = e.target.value;

  if (file) {
    return !value.filter(v => v.file.name === file.name).length > 0;
  }
  return !value.includes(e.target.value);
};
