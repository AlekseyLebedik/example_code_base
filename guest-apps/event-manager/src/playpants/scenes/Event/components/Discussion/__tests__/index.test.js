import React from 'react';
import { shallow } from 'enzyme';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { discussionProps as props } from 'playpants/testUtils/eventProps';

import { DiscussionBase } from '../container';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/TextField', () => 'TextField');

describe('Discussion', () => {
  const root = shallow(<DiscussionBase {...props} />);

  it('root should render as expected', () => {
    expect(root.dive()).toMatchSnapshot();
  });

  it('should always render a input TextField', () => {
    expect(root.dive().find(TextField)).toMatchSnapshot();
  });

  describe.skip('handleSubmit', () => {
    const submitBtn = root.dive().find(Button);
    it('should always render a submit button TextField', () => {
      expect(submitBtn).toMatchSnapshot();
    });

    beforeEach(() => {
      jest.clearAllMocks();
      root
        .dive()
        .find('input')
        .simulate('change', {
          target: {
            value: 'someValue',
          },
        });
      submitBtn.simulate('click');
    });

    it('should call createComment if there is an input', () => {
      expect(props.createComment).toHaveBeenCalledTimes(1);
    });

    it('should return input state to empty after submit', () => {
      expect(root.find('DiscussionStateless').props().input).toBe('');
    });

    it('should do nothing otherwise', () => {
      props.createComment.mockClear();
      submitBtn.simulate('click');
      expect(props.createComment).not.toHaveBeenCalled();
    });
  });
});
