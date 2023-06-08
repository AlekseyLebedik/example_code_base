import React from 'react';

import { shallow } from 'enzyme';
import IconButton from 'dw/core/components/IconButton';
import CopyUrlToClipboard from '..';

document.execCommand = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => action => action,
}));

it('CopyUrlToClipboard', async () => {
  const wrapper = shallow(<CopyUrlToClipboard />);

  await wrapper.find(IconButton).props().onClick();
  expect(document.execCommand).toBeCalledWith('copy');
});
