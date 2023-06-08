import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from '../index';

describe('ProgressBar', () => {
  const props = {
    value: 0,
  };

  const root = shallow(<ProgressBar {...props} />);

  it('renders default props ProgressBar', () => {
    expect(root).toMatchSnapshot();
  });

  it('renders 50% progress', () => {
    root.setProps({ value: 50 });
    expect(root).toMatchSnapshot();
  });

  it('renders 100% progress', () => {
    root.setProps({ value: 100 });
    expect(root).toMatchSnapshot();
  });
});
