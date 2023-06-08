/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import moment from 'moment-timezone';

import { storiesOf } from '@storybook/react';
import { object, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import Calendar from 'dw/core/components/Calendar';

storiesOf('core/Calendar', module)
  .addDecorator(withInfo())
  .add('default', () => (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <Calendar
        onChange={value => alert(value)}
        value={object('value', moment().add(1, 'days'))}
      />
      <div>
        <span>Min date, disabled till current date</span>
        <Calendar onChange={value => alert(value)} minDate={moment()} />
      </div>
      <div>
        <span>Max date, disabled from current date</span>
        <Calendar onChange={value => alert(value)} maxDate={moment()} />
      </div>
    </div>
  ))
  .add('timezone', () => (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div>
        <span>Dublin timezone</span>
        <Calendar
          onChange={value => alert(value)}
          value={moment().add(1, 'days')}
          timezone={select(
            'timezone',
            ['Europe/Dublin', 'Europe/Kiev'],
            'Europe/Dublin'
          )}
        />
      </div>
      <div>
        <span>Vancouver timezone</span>
        <Calendar
          onChange={value => alert(value)}
          value={moment().add(1, 'days')}
          timezone="America/Vancouver"
        />
      </div>
    </div>
  ))
  .add('hidden', () => (
    <Calendar
      onChange={value => alert(value)}
      value={moment().add(1, 'days')}
    />
  ));
