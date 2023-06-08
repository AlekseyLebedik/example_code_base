import React from 'react';
import { shallow } from 'enzyme';
import { formattedTimestampProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import { FormattedTimestampBase } from '../index';

describe('FormattedTimestamp', () => {
  const root = shallow(<FormattedTimestampBase {...formattedTimestampProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
