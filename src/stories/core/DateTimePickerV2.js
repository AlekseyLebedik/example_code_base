/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import moment from 'moment-timezone';

import Grid from '@material-ui/core/Grid';

import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';

import DateTimePicker from 'dw/core/components/DateTimePickerV2';

class WrappedPicker extends Component {
  state = {
    startDate: moment(),
    endDate: moment().add(7, 'days'),
  };

  onChange = value => {
    if (this.props.ranged) {
      const { startDate, endDate } = value;
      this.setState({ startDate, endDate });
    } else {
      this.setState({ startDate: value });
    }
  };

  render() {
    const { startDate, endDate } = this.state;
    return (
      <DateTimePicker
        value={this.props.ranged ? { startDate, endDate } : startDate}
        onChange={this.onChange}
        {...this.props}
      />
    );
  }
}

storiesOf('core/DateTimePicker V2', module)
  .addDecorator(withInfo())
  .add('default', () => (
    <Grid container spacing={6} style={{ margin: 25, width: 'inherit' }}>
      <Grid item xs={12} sm={6}>
        <div style={{ maxWidth: 600, margin: 'auto' }}>
          <WrappedPicker
            clearable
            endDateRequired={false}
            label="Date Range Picker"
            minDate={moment()}
            months={2}
            ranged
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div style={{ maxWidth: 300, margin: 'auto' }}>
          <WrappedPicker
            clearable
            label="Vertical Date Range Picker"
            months={2}
            ranged
            verticalRangeFields
          />
        </div>
      </Grid>
      <Grid item xs={4}>
        <WrappedPicker
          clearable
          helperText="Type date in natural language"
          label="Date Time Picker"
          minDate={new Date()}
          maxDate={moment().add(45, 'days').unix()}
          months={1}
        />
      </Grid>
      <Grid item xs={4}>
        <WrappedPicker
          autoOk
          dateOnly
          direction="vertical"
          hideSidePanel
          label="Date Picker"
        />
      </Grid>
      <Grid item xs={4}>
        <WrappedPicker
          dateOnly
          helperText="Displays event list"
          events={[
            {
              title: 'COD MW Launch',
              start: moment().subtract(1, 'day').startOf('day'),
              end: moment().subtract(1, 'day').endOf('day'),
            },
            {
              title: 'All Hands Meeting',
              start: moment(),
              end: moment().add(2, 'hours'),
            },
            {
              title: 'COD MW Launch',
              start: moment().subtract(1, 'day').startOf('day'),
              end: moment().subtract(1, 'day').endOf('day'),
            },
            {
              title: 'Crash Beta Test',
              start: moment(),
              end: moment().add(5, 'days'),
            },
            {
              title: 'Tony Hawk Launch Week',
              start: moment().add(1, 'week'),
              end: moment().add(2, 'weeks'),
            },
          ]}
        />
      </Grid>
    </Grid>
  ));
