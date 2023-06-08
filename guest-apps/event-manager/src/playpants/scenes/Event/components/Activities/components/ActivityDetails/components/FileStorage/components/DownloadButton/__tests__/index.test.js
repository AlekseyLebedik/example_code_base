import React from 'react';
import { shallow } from 'enzyme';

import DownloadButton from '../index';

describe('DownloadButton', () => {
  const props = {
    value: false,
    size: 20,
    icon: 'save_alt',
    tooltip: 'Download File',
    color: 'primary',
  };

  const root = shallow(<DownloadButton {...props} />);

  it('renders default props DownloadButton', () => {
    expect(root).toMatchSnapshot();
  });

  it('renders disabled button DownloadButton', () => {
    root.setProps({ value: true });
    expect(root).toMatchSnapshot();
  });
});
