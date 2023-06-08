import React from 'react';
import { shallow } from 'enzyme';
import { TableLoadingSkeleton } from '../index';

describe('Accounts Audit Log Skeleton', () => {
  it('display ag grid table skeleton', () => {
    const skeleton = shallow(<TableLoadingSkeleton />);
    expect(skeleton).toMatchSnapshot();
  });
});
