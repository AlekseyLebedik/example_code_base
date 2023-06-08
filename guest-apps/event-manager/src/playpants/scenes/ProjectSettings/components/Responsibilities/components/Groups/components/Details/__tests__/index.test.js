import React from 'react';
import { shallow } from 'enzyme';
import { groupDetailsProps as props } from 'playpants/testUtils/projectSettingsProps';
import mockState from 'playpants/testUtils/mockState';
import { createMockStore } from 'redux-test-utils';

import Details from '..';

describe('Responsibilility groups details', () => {
  const root = shallow(
    <Details store={createMockStore(mockState)} {...props} />
  );

  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
