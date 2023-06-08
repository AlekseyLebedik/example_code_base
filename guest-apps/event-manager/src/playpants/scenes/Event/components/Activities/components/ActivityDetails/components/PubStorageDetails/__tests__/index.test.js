import React from 'react';
import { shallow } from 'enzyme';

import { pubstorageProps as props } from 'playpants/testUtils/eventProps';
import { PublisherStorage } from '../index';

describe('PublisherStorage', () => {
  const root = shallow(<PublisherStorage {...props} />);

  it('renders the container component correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
