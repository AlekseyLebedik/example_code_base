import React from 'react';
import { shallow } from 'enzyme';

import AddCohort from '../index';
import { FORM_MODE_ENUM } from '../../../constants';

describe('ABTesting component AddCohort', () => {
  it('renders component', () => {
    expect(
      shallow(<AddCohort updateTest formMode={FORM_MODE_ENUM.NEW} />)
    ).toMatchSnapshot();
  });
});
