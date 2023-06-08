import React from 'react';
import { shallow } from 'enzyme';

import { thunderpantsDeploymentFormStatelessProps as props } from 'playpants/testUtils/eventProps';
import ThunderpantsDeploymentForm from '../presentational';

describe('CustomTitleComponent', () => {
  const root = shallow(<ThunderpantsDeploymentForm {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
});
