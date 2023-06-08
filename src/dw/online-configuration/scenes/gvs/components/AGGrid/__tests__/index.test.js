import React from 'react';

import { shallow } from 'enzyme';

import GVSAGGrid from '..';

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams() {
    return { titleId: 1 };
  },
}));
const FakeRenderer = () => null;
const COLUMN_DEFS = [{ field: 'name' }, { field: 'value' }];

describe('GVSAGGrid', () => {
  it('adds sidebar to the grid options', () => {
    const wrapper = shallow(
      <GVSAGGrid
        columnDefs={COLUMN_DEFS}
        components={{ fakeRenderer: FakeRenderer }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
