import React from 'react';
import { shallow } from 'enzyme';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import AggridPresentational from '../presentational';

const gridHeaderNames = [
  'Username',
  'User Type',
  'Category',
  'Audit Context',
  'Context',
  'Audit Title ID',
  'Title ID',
  'Audit Env',
  'Env',
  'Entity ID',
  'Entity Name',
  'Source Name',
  'Extra',
  'Timestamp',
];

describe('AgGrid Presentational', () => {
  const wrapper = shallow(
    <AggridPresentational
      formatDateTime={jest.fn()}
      onLoadData={jest.fn()}
      refreshKey=""
    />
  );
  it('structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('check header names for grid', () => {
    const grid = wrapper.find(AsyncAGGrid);
    const headerNames = grid.props().columnDefs.map(item => item.headerName);
    expect(headerNames).toEqual(gridHeaderNames);
  });
});
