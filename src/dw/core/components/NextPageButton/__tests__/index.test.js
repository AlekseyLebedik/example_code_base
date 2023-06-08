import React from 'react';
import { shallow } from 'enzyme';

import Button from 'dw/__mocks__/@material-ui/Button';

import NextPageButton from '../index';

describe('NextPageButton', () => {
  it('renders nothing when nextPageToken is null', () => {
    const props = {
      onClick: jest.fn(),
    };
    expect(shallow(<NextPageButton {...props} />)).toMatchSnapshot();
  });

  it('renders a show more button when nextPageToken is given', () => {
    const props = {
      nextPageToken: '123-token',
      onClick: jest.fn(),
    };
    expect(shallow(<NextPageButton {...props} />)).toMatchSnapshot();
  });

  it('calls the callback on click', () => {
    const props = {
      nextPageToken: '123-token',
      onClick: jest.fn(),
    };

    const root = shallow(<NextPageButton {...props} />);
    root.find(Button).simulate('click');
    expect(props.onClick).toHaveBeenCalledWith(props.nextPageToken);
  });
});
