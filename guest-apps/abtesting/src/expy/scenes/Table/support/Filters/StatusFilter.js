import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { TEST_STATUSES } from '../../../../constants';

class StatusFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'All',
    };
  }

  onChange = e => {
    this.setState({ value: e.target.value }, () => {
      const valueToUse = this.state.value === 'All' ? null : this.state.value;
      this.props.parentFilterInstance(instance => {
        instance.onFloatingFilterChanged('equals', valueToUse);
      });
    });
  };

  onParentModelChanged(parentModel) {
    this.setState({
      value: !parentModel ? 'All' : parentModel.filter,
    });
  }

  render() {
    return (
      <FormControl
        style={{ marginTop: '8.5px' }}
        variant="outlined"
        fullWidth
        size="small"
      >
        <Select
          labelId="status"
          id="status"
          name="status"
          onChange={this.onChange}
          value={this.state.value}
        >
          <MenuItem value="All">All</MenuItem>
          {TEST_STATUSES.map(status => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

StatusFilter.propTypes = {
  parentFilterInstance: PropTypes.func.isRequired,
};

export default StatusFilter;
