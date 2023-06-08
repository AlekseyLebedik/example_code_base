import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { duplicateEventStatelessProps as props } from 'playpants/testUtils/eventProps';
import mockState from 'playpants/testUtils/mockState';
import ModalForm from 'dw/core/components/ModalForm';
import DuplicateEventPresentational from '../presentational';

describe('DuplicateEvent presentational tests:', () => {
  const mockStore = configureMockStore();
  const initialState = mockState;
  let wrapper;
  let store;

  store = mockStore(initialState);

  describe('DuplicateEvent presentational tests:', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = shallow(
        <DuplicateEventPresentational {...props} store={store} />
      );
    });

    it('renders default properly', () => {
      expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders ModalForm', () => {
      expect(wrapper.find(ModalForm).length).toBe(1);
    });
  });
});
