import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '@material-ui/core/Avatar';
import { thunderpantsBadgeCellRendererProps as props } from 'playpants/testUtils/eventProps';
import BadgeCellRenderer from '../index';

describe('BadgeCellRenderer', () => {
  const root = shallow(<BadgeCellRenderer {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
  it('renders the correct number of badges', () => {
    expect(root.find(Avatar).length).toBe(4);
  });
});
