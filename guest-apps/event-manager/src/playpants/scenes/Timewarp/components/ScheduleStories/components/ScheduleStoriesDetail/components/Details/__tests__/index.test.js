import React from 'react';
import { shallow } from 'enzyme';
import { detailsProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import { DetailsBase } from '../index';

describe('Details', () => {
  const root = shallow(<DetailsBase {...detailsProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
