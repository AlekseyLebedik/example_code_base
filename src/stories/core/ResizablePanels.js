/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';

import ResizablePanels from 'dw/core/components/ResizablePanels';

storiesOf('core/ResizablePanels')
  .addDecorator(withInfo())
  .add('ResizablePanels', () => (
    <div style={{ height: 1000 }}>
      <h1>ReactJS Resizable Panels</h1>
      <ResizablePanels
        sizes={[
          { size: 300, max: 500, min: 100 },
          { size: 300, max: 500, min: 0 },
        ]}
      >
        <div>first panel</div>
        <div>This is the second panel. Starts with 300px.</div>
        <div />
      </ResizablePanels>
    </div>
  ));
