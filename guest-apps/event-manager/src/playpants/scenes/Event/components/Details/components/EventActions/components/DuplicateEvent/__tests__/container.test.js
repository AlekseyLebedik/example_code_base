import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { duplicateEventProps as props } from 'playpants/testUtils/eventProps';
import mockState from 'playpants/testUtils/mockState';
import { DuplicateEvent } from '../container';
import DuplicateEventPresentational from '../presentational';

describe('DuplicateEvent container tests:', () => {
  const mockStore = configureMockStore();
  const initialState = mockState;
  let wrapper;

  const store = mockStore(initialState);
  beforeEach(() => {
    const DuplicateEventConnected = connect()(DuplicateEvent);
    wrapper = shallow(<DuplicateEventConnected {...props} store={store} />);
  });

  it('renders default properly', () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders props properly', () => {
    expect(wrapper.dive().props()).toMatchSnapshot();
  });

  it('renders presentational if not disabled', () => {
    wrapper.setProps({ disabled: false });
    expect(
      wrapper.dive().find(DuplicateEventPresentational).length
    ).toBeTruthy();
  });

  it('does not render presentational if disabled', () => {
    const DuplicateEventConnected = connect()(DuplicateEvent);
    wrapper = shallow(
      <DuplicateEventConnected {...props} disabled store={store} />
    );
    expect(
      wrapper.shallow().find(DuplicateEventPresentational).length
    ).toBeFalsy();
  });
});
