import React from 'react';
import { render } from 'enzyme';
import { messagePanelProps as props } from 'playpants/testUtils/eventProps';
import MessagePanel from '../index';

describe('MessagePanel', () => {
  const root = render(<MessagePanel {...props} />);
  it('should render correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
