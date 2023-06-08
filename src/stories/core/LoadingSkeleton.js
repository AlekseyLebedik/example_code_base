/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';

import LoadingSkeleton from 'dw/core/components/LoadingSkeleton';

storiesOf('core/LoadingSkeleton', module)
  .addDecorator(withInfo())
  .add('default', () => <LoadingSkeleton />);
