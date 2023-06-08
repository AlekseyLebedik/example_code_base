import React from 'react';
import { shallow } from 'enzyme';

import { statelessActivityTitleProps as props } from 'playpants/testUtils/eventProps';

import IconButton from 'dw/core/components/IconButton';

import MultiSelectButton from '../index';

describe('MultiSelectButton', () => {
  const rootNotAllTitles = shallow(<MultiSelectButton {...props} />);
  it('renders correctly when not all titles are selected', () => {
    expect(rootNotAllTitles).toMatchSnapshot();
    expect(rootNotAllTitles.find(IconButton).props().iconProps.color).toBe(
      'secondary'
    );
  });

  props.selectedActivity.title_envs = [3, 5];
  const rootAllTitles = shallow(<MultiSelectButton {...props} />);
  it('renders correctly when all titles are selected', () => {
    expect(rootAllTitles).toMatchSnapshot();
    expect(rootAllTitles.find(IconButton).props().iconProps.color).toBe(
      'secondary'
    );
  });

  describe('handleClick', () => {
    it('should call onTitlesChange', () => {
      rootAllTitles.simulate('click');
      expect(props.onTitlesChange).toHaveBeenCalledTimes(1);
    });
  });
});
