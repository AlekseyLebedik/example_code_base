import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { TEST_CATEGORIES } from '../../../../constants';

class TagFilter extends Component {
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
        instance.onFloatingFilterChanged('contains', valueToUse);
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
          labelId="tag-filter"
          id="tag-filter"
          name="tag-filter"
          onChange={this.onChange}
          value={this.state.value}
        >
          <MenuItem value="All">All</MenuItem>
          {TEST_CATEGORIES.map(tag => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

TagFilter.propTypes = {
  parentFilterInstance: PropTypes.func.isRequired,
};

export default TagFilter;
