/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import moment from 'moment-timezone';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import DateTimeCalendar from 'dw/core/components/DateTimeCalendar';

storiesOf('core/DateTimeCalendar', module)
  .addDecorator(withInfo())
  .add('default', () => (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <DateTimeCalendar
        onChange={value => alert(value)}
        value={moment().add(1, 'days')}
      />
      <div>
        <span>Max/Max date, 5 days can be selected</span>
        <DateTimeCalendar
          onChange={value => alert(value)}
          minDate="now"
          maxDate={moment().add(4, 'days')}
        />
      </div>
    </div>
  ))
  .add('hidden', () => (
    <DateTimeCalendar
      onChange={value => alert(value)}
      value={moment().add(1, 'days')}
    />
  ));
