import React from 'react';
import { shallow } from 'enzyme';
import { rulesProps } from 'playpants/testUtils/timewarp/components/rulesProps';
import { RulesBase } from '../index';

describe('Rules', () => {
  const root = shallow(<RulesBase {...rulesProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
