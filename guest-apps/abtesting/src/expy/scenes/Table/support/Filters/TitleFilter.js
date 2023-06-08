import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { TEST_TITLES } from '../../../../constants';

class TitleFilter extends Component {
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
          labelId="title-filter"
          id="title-filter"
          name="title-filter"
          onChange={this.onChange}
          value={this.state.value}
        >
          <MenuItem value="All">All</MenuItem>
          {TEST_TITLES.map(title => (
            <MenuItem key={title.pretty_name} value={title.pretty_name}>
              {title.pretty_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

TitleFilter.propTypes = {
  parentFilterInstance: PropTypes.func.isRequired,
};

export default TitleFilter;
