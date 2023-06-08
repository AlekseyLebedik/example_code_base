import React from 'react';
import { shallow } from 'enzyme';
import { createdByProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import CreatedBy from '../index';

describe('CreatedBy', () => {
  const root = shallow(<CreatedBy {...createdByProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
