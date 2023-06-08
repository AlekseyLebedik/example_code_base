/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';

import SectionTitle from 'dw/core/components/SectionTitle';

storiesOf('core/SectionTitle', module)
  .addDecorator(withInfo())
  .add('default', () => <SectionTitle />);
