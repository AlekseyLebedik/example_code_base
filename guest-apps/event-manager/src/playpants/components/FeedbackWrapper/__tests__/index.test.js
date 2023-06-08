import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import mockState from 'playpants/testUtils/mockState';
import FeedbackWrapper from '../index';

describe('FeedbackWrapper index tests:', () => {
  const store = configureMockStore()(mockState);
  let component;

  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <FeedbackWrapper>
          <div>Some inner component</div>
        </FeedbackWrapper>
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
