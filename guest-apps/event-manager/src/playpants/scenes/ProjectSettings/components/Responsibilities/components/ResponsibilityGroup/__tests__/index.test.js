import React from 'react';
import { shallow } from 'enzyme';
import { responsibilityGroupProps as props } from 'playpants/testUtils/projectSettingsProps';

import ResponsibilityGroup from '../index';

describe('ResponsibilityGroup', () => {
  const root = shallow(<ResponsibilityGroup {...props} />);

  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
