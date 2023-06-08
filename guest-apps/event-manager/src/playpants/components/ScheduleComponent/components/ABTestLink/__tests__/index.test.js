import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { abTestingLinkProps as props } from 'playpants/testUtils/scheduleProps';

import { ABTestLink } from '../index';

describe('ABTestLink', () => {
  const wrapper = mount(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/',
          key: `abtest/${props.data.title}/${props.data.id}`,
        },
      ]}
    >
      <ABTestLink {...props} />
    </MemoryRouter>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
