/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import moment from 'moment-timezone';

import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';

import DateTimePicker from 'dw/core/components/DateTimePicker';

class WrappedPicker extends Component {
  state = {
    selectedDate: moment(),
  };

  onChange = selectedDate => this.setState({ selectedDate });

  render() {
    const { selectedDate } = this.state;
    return (
      <DateTimePicker
        value={selectedDate}
        onChange={this.onChange}
        {...this.props}
      />
    );
  }
}

storiesOf('core/DateTimePicker', module)
  .addDecorator(withInfo())
  .add('default', () => (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div>
        <WrappedPicker label="Date Time Picker" clearable />
      </div>
      <div>
        <WrappedPicker label="Date Picker" clearable dateOnly />
      </div>
    </div>
  ));
