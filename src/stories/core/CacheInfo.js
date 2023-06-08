/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import moment from 'moment-timezone';

import { storiesOf } from '@storybook/react';
import { object, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import { formatDateTime, defaultTimezone } from 'dw/core/helpers/date-time';
import CacheInfo from 'dw/core/components/CacheInfo';

storiesOf('core/CacheInfo', module)
  .addDecorator(withInfo())
  .add('default', () => {
    const timezone = select(
      'timezone',
      [defaultTimezone, 'UTC', 'Europe/Dublin', 'America/Vancouver'],
      defaultTimezone
    );
    return (
      <CacheInfo
        key={timezone}
        timestamp={moment(object('timestamp', moment())).unix()}
        formatDateTime={timestamp =>
          formatDateTime(timestamp, undefined, timezone)
        }
      />
    );
  });
