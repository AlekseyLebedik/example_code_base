import React from 'react';
import PropTypes from 'prop-types';

import { formatRowData, splitName } from './helpers';
import { GRID_OPTIONS } from './constants';

import SchemaFormStateless from './presentational';

export class SchemaFormBase extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      inputs: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          // eslint-disable-next-line react/forbid-prop-types
          value: PropTypes.any,
        })
      ).isRequired,
      version: PropTypes.string,
      template_id: PropTypes.string,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    schema: PropTypes.object,
    handleVersionUpdate: PropTypes.func,
    needsUpdate: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    handleVersionUpdate: () => {},
    schema: undefined,
    needsUpdate: false,
    disabled: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeGrid);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resizeGrid);
  };

  resizeGrid = () => GRID_OPTIONS.gridApi.sizeColumnsToFit();

  handleChange = e => {
    const { input, index } = splitName(e, this.props);

    const { type } = e.target;
    let { value } = e.target;
    if (type === 'number') {
      value = parseFloat(value);
    } else if (type === 'checkbox') {
      value = e.target.checked;
    }

    if (index) {
      input.value[index - 1] = value;
    } else {
      input.value = value;
    }

    this.props.onUpdate();
  };

  handleDelete = e => {
    const { input, index } = splitName(e, this.props);
    input.value.splice(index - 1, 1);
    this.props.onUpdate();
  };

  render() {
    const { data, disabled, schema, needsUpdate, handleVersionUpdate } =
      this.props;
    const gridProps = {
      data,
      schema,
      disabled: disabled || needsUpdate,
      handleChange: this.handleChange,
      handleDelete: this.handleDelete,
    };
    return (
      <SchemaFormStateless
        gridOptions={{ ...GRID_OPTIONS, rowData: formatRowData(gridProps) }}
        onVersionUpdate={handleVersionUpdate}
        needsUpdate={needsUpdate}
      />
    );
  }
}

export default SchemaFormBase;
