import React from 'react';
import { shallow } from 'enzyme';
import { groupStoryFormDialogProps } from 'playpants/testUtils/groupStoriesProps';
import { GroupStoryFormDialogBase } from '../index';

describe('GroupStoryFormDialog', () => {
  const root = shallow(
    <GroupStoryFormDialogBase {...groupStoryFormDialogProps} />
  );
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
