/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';

import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import createStore from 'dw/online-configuration/store';
import reduxDecorator from 'stories/helpers/reduxDecorator';

const { store } = createStore();

storiesOf('core/AsyncAgGrid', module)
  .addDecorator(Story => (
    <div style={{ height: '100vh' }}>
      <Story />
    </div>
  ))
  .addDecorator(withInfo())
  .addDecorator(reduxDecorator(store))
  .add('default', () => (
    <AsyncAGGrid
      columnDefs={[
        {
          headerName: 'Col 1',
          field: 'datafield',
        },
        {
          headerName: 'Col 2',
          field: 'datafield2',
        },
        {
          headerName: 'Col 3',
          field: 'datafield3',
        },
      ]}
      gridOptions={{
        suppressContextMenu: true,
      }}
      onLoadData={(_, params) =>
        params.successCallback([
          {
            datafield: 'hi',
            datafield2: 'bye',
            datafield3:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id mattis tellus. In interdum commodo mollis. Donec condimentum, diam ac placerat vehicula, arcu dolor varius ipsum, ac ullamcorper augue nibh eu sapien.',
          },
        ])
      }
    />
  ));
