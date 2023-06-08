import React from 'react';
import { shallow } from 'enzyme';
import TitleSearchSelectorPresentational from '../presentational';

describe('TitleSearchSelectorPresentational', () => {
  it('renders testTitles', () => {
    const props = {
      value: '123',
      testTitles: ['foo', 'bar'],
    };
    expect(
      shallow(<TitleSearchSelectorPresentational {...props} />)
    ).toMatchSnapshot();
  });
});
