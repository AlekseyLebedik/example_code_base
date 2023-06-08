import React from 'react';
import { shallow } from 'enzyme';

import UserTagsChoice from '../index';

describe('UserTagsChoice', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <UserTagsChoice
        onGetValidTags={() => null}
        onPooledObjectSearch={() => null}
        users={[]}
        setUsers={() => null}
        usersOperator="and"
        setUsersOperator={() => null}
        tags={[]}
        setTags={() => null}
        tagsOperator="and"
        setTagsOperator={() => null}
        setPooledObjectsQuery={() => null}
      />
    );
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
