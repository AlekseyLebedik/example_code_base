/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';

import Loading from 'dw/core/components/Loading';

storiesOf('core/Loading', module)
  .addDecorator(withInfo())
  .add('default', () => <Loading />);
