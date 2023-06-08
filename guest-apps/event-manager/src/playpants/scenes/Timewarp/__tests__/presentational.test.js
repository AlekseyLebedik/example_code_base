import React from 'react';
import { shallow } from 'enzyme';
import { statelessTimewarpProps } from 'playpants/testUtils/timewarp/timewarpProps';
import StatelessTimewarp from '../presentational';

describe('StatelessTimewarp', () => {
  const root = shallow(<StatelessTimewarp {...statelessTimewarpProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
