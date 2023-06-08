import React from 'react';
import { shallow } from 'enzyme';

import { thunderpantsBuildOptionsCellRendererProps as props } from 'playpants/testUtils/eventProps';
import BuildOptionsCellRendererComponent from '../index';

describe('BuildOptionsCellRenderer', () => {
  const root = shallow(<BuildOptionsCellRendererComponent {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
});
