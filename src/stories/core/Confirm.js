/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { boolean } from '@storybook/addon-knobs';

import Confirm from 'dw/core/components/Confirm';

storiesOf('core/Confirm', module)
  .addDecorator(withInfo())
  .add('default', () => (
    <Confirm
      open={boolean('open', true)}
      onHide={action('onHide')}
      onConfirm={action('onConfirm')}
    />
  ))
  .add('hidden', () => (
    <Confirm
      open={boolean('open', false)}
      onHide={action('onHide')}
      onConfirm={action('onConfirm')}
    />
  ));
