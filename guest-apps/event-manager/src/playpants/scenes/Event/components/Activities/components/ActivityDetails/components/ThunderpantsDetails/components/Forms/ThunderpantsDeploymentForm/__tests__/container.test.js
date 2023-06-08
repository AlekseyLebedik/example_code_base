import React from 'react';
import { shallow } from 'enzyme';

import { thunderpantsDeploymentFormProps as props } from 'playpants/testUtils/eventProps';
import { ThunderpantsDeploymentForm } from '../container';

describe('CustomTitleComponent', () => {
  const root = shallow(<ThunderpantsDeploymentForm {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
});
