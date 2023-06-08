import React from 'react';
import { shallow } from 'enzyme';

import IconButton from 'dw/__mocks__/@material-ui/IconButton';

import Expander from '../index';

describe('Expander', () => {
  it('renders collapse icon', () => {
    const props = {
      expanded: false,
      onClick: jest.fn(),
    };
    expect(shallow(<Expander {...props} />)).toMatchSnapshot();
  });

  it('renders expand icon', () => {
    const props = {
      expanded: true,
      onClick: jest.fn(),
    };
    expect(shallow(<Expander {...props} />)).toMatchSnapshot();
  });

  it('allows to override the tooltip message', () => {
    const props = {
      expanded: true,
      onClick: jest.fn(),
      title: 'Custom tooltip',
    };
    expect(shallow(<Expander {...props} />)).toMatchSnapshot();
  });

  it('allows to add custom className', () => {
    const props = {
      expanded: true,
      onClick: jest.fn(),
      className: 'custom-classname',
    };
    expect(shallow(<Expander {...props} />)).toMatchSnapshot();
  });

  it('calls the callback on click', () => {
    const props = {
      expanded: true,
      onClick: jest.fn(),
    };

    const root = shallow(<Expander {...props} />);
    root.find(IconButton).simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
