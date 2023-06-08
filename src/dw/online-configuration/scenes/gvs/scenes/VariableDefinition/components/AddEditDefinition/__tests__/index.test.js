import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import { renderWithApolloClient } from '../../../../../test-utils';

import AddEditDefinition from '../index';

const envScopeURI = 'cod:iw8:5830';

const mockRows = [
  { data: { category: 'c1' } },
  { data: { category: 'c2' } },
  { data: { category: 'c3' } },
];

const gridApi = {
  forEachLeafNode: () => callback => mockRows.forEach(r => callback(r)),
};

const handleClose = jest.fn();
const setFilter = jest.fn();
const refetch = jest.fn();

jest.mock('dw/core/hooks');
jest.mock('dw/core/components/Select', () => 'Select');

describe('AddEditDefinition', () => {
  const render = props =>
    renderWithApolloClient(
      <AddEditDefinition
        gridApi={gridApi}
        handleClose={handleClose}
        setFilter={setFilter}
        refetch={refetch}
        {...props}
      />,
      {
        params: {
          env: 'dev',
          titleId: '5830',
          scopeURI: envScopeURI,
        },
        scopeURI: envScopeURI,
      }
    )
      .shallow()
      .find(Dialog);
  it('renders add definition modal', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
  it('renders update definition modal', () => {
    const wrapper = render({
      isEdit: true,
      definition: {
        key: 'TEST_KEY',
        type: 'list_uint16',
        owner: { username: 'test-user' },
        category: 'TEST CATEGORY',
        description: 'TEST KEY DESCRIPTION',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
