import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class InputFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = e => {
    this.setState({ value: e.target.value }, () => {
      const valueToUse = this.state.value === '' ? null : this.state.value;
      this.props.parentFilterInstance(instance => {
        instance.onFloatingFilterChanged('contains', valueToUse);
      });
    });
  };

  onParentModelChanged(parentModel) {
    this.setState({
      value: !parentModel ? '' : parentModel.filter,
    });
  }

  onClear() {
    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <TextField
        style={{ marginTop: '8.5px' }}
        id={`${this.props.column.colId}`}
        placeholder={`Search ${this.props.column.colId}...`}
        value={this.state.value}
        onChange={this.onChange}
        variant="outlined"
        fullWidth
      />
    );
  }
}

InputFilter.propTypes = {
  parentFilterInstance: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
};

export default InputFilter;
