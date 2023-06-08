import React from 'react';
import { shallow } from 'enzyme';

import { statelessActivityTitleProps as props } from 'playpants/testUtils/eventProps';

import TitleSelector from '../components/TitleSelector';
import MultiSelectButton from '../components/MultiSelectButton';
import Duplicate from '../components/Duplicate';
import Revert from '../components/Revert';

import ActivityTitlePresentational from '../presentational';

describe('ActivityTitlePresentational', () => {
  const wrapper = shallow(<ActivityTitlePresentational {...props} />);

  it('renders correctly when multiple titles and duplication is allowed', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('always renders TitleSelector', () => {
    expect(wrapper.find(TitleSelector)).toMatchSnapshot();
  });

  it('renders MultiSelectButton if multiple titles is allowed', () => {
    expect(wrapper.find(MultiSelectButton)).toMatchSnapshot();
  });

  it('renders Duplicate if there are left over titles', () => {
    expect(wrapper.find(Duplicate)).toMatchSnapshot();
  });

  it('renders Revert correctly if allowed', () => {
    expect(wrapper.find(Revert)).toMatchSnapshot();
  });
});
