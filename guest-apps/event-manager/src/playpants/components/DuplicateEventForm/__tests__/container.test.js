import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { duplicateEventFormProps as props } from 'playpants/testUtils/eventProps';
import mockState from 'playpants/testUtils/mockState';
import DuplicateEventForm from '../index';

describe('DuplicateEventForm container tests:', () => {
  const mockStore = configureMockStore();
  const initialState = mockState;
  let wrapper;
  let store;
  let payload;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<DuplicateEventForm {...props} store={store} />);
  });

  it('renders default properly', () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('handles change to currentPlatforms', () => {
    payload = ['PS4'];
    wrapper.setProps({ currentPlatforms: payload });
    expect(wrapper.dive().props().currentPlatforms).toMatchObject(payload);
  });

  it('form initial values reflect changes to props', () => {
    wrapper.setProps({
      currentEnv: 'Certification',
      currentPlatforms: ['XB1'],
      endAt: 3333333333,
      publishAt: 2222222222,
    });
    expect(wrapper.dive().props()).toMatchSnapshot();
  });
});
