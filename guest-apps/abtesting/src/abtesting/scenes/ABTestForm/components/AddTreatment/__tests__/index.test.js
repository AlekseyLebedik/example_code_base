import React from 'react';
import { shallow } from 'enzyme';

import AddTreatment from '../index';
import { FORM_MODE_ENUM } from '../../../constants';

describe('ABTesting component AddTreatment', () => {
  it('renders component', () => {
    expect(
      shallow(
        <AddTreatment formMode={FORM_MODE_ENUM.NEW} cohort="cohorts[0]" />
      )
    ).toMatchSnapshot();
  });
});
