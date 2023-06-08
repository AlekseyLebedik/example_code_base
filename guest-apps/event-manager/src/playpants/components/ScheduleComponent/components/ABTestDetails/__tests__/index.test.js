import React from 'react';
import { shallow } from 'enzyme';

import { abTestDetailsProps as props } from 'playpants/testUtils/scheduleProps';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from '@demonware/devzone-core/themes';
import eventManagerTheme from 'playpants/components/App/theme';

import ABTestDetailsStateless from '../presentational';

describe('ABTestDetails', () => {
  const wrapper = shallow(
    <MuiThemeProvider theme={muiTheme}>
      <MuiThemeProvider theme={eventManagerTheme}>
        <ABTestDetailsStateless {...props} />
      </MuiThemeProvider>
    </MuiThemeProvider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
