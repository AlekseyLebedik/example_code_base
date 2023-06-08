import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import mockState from 'playpants/testUtils/mockState';

import { thunderpantsCustomTitleComponentProps as props } from 'playpants/testUtils/eventProps';
import CustomTitleComponent from '../index';

describe('CustomTitleComponent', () => {
  const store = configureMockStore()(mockState);
  let component;
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <CustomTitleComponent {...props} />
      </Provider>
    );
  });
  it('renders default', () => {
    expect(component).toMatchSnapshot();
  });
});
