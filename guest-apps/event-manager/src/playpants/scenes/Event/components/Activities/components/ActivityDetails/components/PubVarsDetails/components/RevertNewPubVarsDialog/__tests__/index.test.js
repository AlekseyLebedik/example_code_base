import React from 'react';
import { shallow } from 'enzyme';

import { revertPubVarsProps as props } from 'playpants/testUtils/eventProps';

import { RevertNewPubVarsDialog } from '../index';

describe('RevertNewPubVarsDialog', () => {
  it('renders revert dialog open', () => {
    const wrapper = shallow(<RevertNewPubVarsDialog {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders revert dialog closed', () => {
    const wrapper = shallow(<RevertNewPubVarsDialog {...props} open={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
