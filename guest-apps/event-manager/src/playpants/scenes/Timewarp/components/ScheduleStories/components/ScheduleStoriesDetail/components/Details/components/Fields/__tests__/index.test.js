import React from 'react';
import { shallow } from 'enzyme';
import { fieldsProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import { FieldsBase } from '../index';

describe('Fields', () => {
  const root = shallow(<FieldsBase {...fieldsProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
