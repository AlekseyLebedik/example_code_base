import React from 'react';
import { shallow } from 'enzyme';
import { groupStoriesDetailProps } from 'playpants/testUtils/groupStoriesProps';
import createStore from 'playpants/store';
import { Provider } from 'react-redux';
import { GroupStoriesDetailBase } from '../index';

describe('GroupStoriesDetail', () => {
  const { store } = createStore();
  const root = shallow(
    <Provider store={store}>
      <GroupStoriesDetailBase {...groupStoriesDetailProps} />
    </Provider>
  );
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
