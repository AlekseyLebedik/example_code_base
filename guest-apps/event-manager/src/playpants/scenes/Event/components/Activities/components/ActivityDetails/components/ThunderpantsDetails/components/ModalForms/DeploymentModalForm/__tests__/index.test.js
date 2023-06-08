import React from 'react';
import { shallow } from 'enzyme';

import { thunderpantsDeploymentModalForm as props } from 'playpants/testUtils/eventProps';
import { DeploymentModalFormBase } from '../index';

describe('DeploymentModalForm', () => {
  const root = shallow(<DeploymentModalFormBase {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
});
