import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

import mockState from 'playpants/testUtils/mockState';
import { responsibilitesAndGamertagsProps as props } from 'playpants/testUtils/projectSettingsProps';
import Responsibilities from '../index';

describe('Responsibilities', () => {
  const store = configureMockStore()(mockState);
  const root = renderer.create(
    <Provider store={store}>
      <Router>
        <Responsibilities {...props} />
      </Router>
    </Provider>
  );

  it('renders correctly', () => {
    expect(root.toJSON()).toMatchSnapshot();
  });
});
