import React from 'react';
import { shallow } from 'enzyme';

import { statelessPubvarsProps as props } from 'playpants/testUtils/eventProps';

import { ChangedVarSetsBase } from '../index';

describe('ChangedVarSetsBase', () => {
  const root = shallow(<ChangedVarSetsBase {...props} />);

  it('renders ChangedVarSets correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
