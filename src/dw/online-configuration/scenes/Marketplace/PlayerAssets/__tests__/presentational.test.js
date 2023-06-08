import React from 'react';
import { shallow } from 'enzyme';

import PlayerAssetsStateless from '../presentational';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    inventoryType: 'blah',
  }),
}));

describe('PlayerAssetsStateless', () => {
  const props = {};

  const root = shallow(<PlayerAssetsStateless {...props} />);

  it('renders correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
