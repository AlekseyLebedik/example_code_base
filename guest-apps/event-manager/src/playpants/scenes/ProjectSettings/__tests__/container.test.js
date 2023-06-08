import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

import mockState from 'playpants/testUtils/mockState';
import { projectSettingsProps as props } from 'playpants/testUtils/projectSettingsProps';
import ProjectSettings from '../index';

describe('ProjectSettings', () => {
  const store = configureMockStore()(mockState);
  const wrapper = renderer.create(
    <Provider store={store}>
      <Router>
        <ProjectSettings {...props} />
      </Router>
    </Provider>
  );

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
