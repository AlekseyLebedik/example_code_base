/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';

import AGGrid from 'dw/core/components/AGGrid';
import createStore from 'dw/online-configuration/store';
import reduxDecorator from 'stories/helpers/reduxDecorator';

const { store } = createStore();

storiesOf('core/AgGrid', module)
  .addDecorator(Story => (
    <div style={{ height: '100vh' }}>
      <Story />
    </div>
  ))
  .addDecorator(withInfo())
  .addDecorator(reduxDecorator(store))
  .add('default', () => (
    <AGGrid
      async={false}
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
          headerName: 'Test long header title. Should handle text wrap',
          field: 'datafield3',
        },
        {
          headerName: 'Name',
          field: 'datafield4',
        },
        {
          headerName: 'Col 5',
          field: 'datafield5',
        },
        {
          headerName: 'Col 6',
          field: 'datafield6',
        },
      ]}
      rowData={[
        {
          datafield: 'hi',
          datafield2: 'bye',
          datafield3: 'testing 1, 2, 3',
          datafield4: 'Kobe',
          datafield5:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id mattis tellus. In interdum commodo mollis. Donec condimentum, diam ac placerat vehicula, arcu dolor varius ipsum, ac ullamcorper augue nibh eu sapien.',
        },
        {
          datafield: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          datafield2: 'bye',
          datafield3: '10/25',
          datafield4: 'John',
          datafield5: 'test',
          datafield6: 'row has 6th col data',
        },
      ]}
    />
  ));
