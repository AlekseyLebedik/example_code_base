import React from 'react';
import { shallow } from 'enzyme';

import { statelessEventSummaryProps as props } from 'playpants/testUtils/eventSummaryProps';
import { MuiThemeProvider } from '@material-ui/core/styles';
import eventManagerTheme from 'playpants/components/App/theme';

import EventSummaryDialog from '../presentational';

describe('EventSummaryDialog', () => {
  const wrapper = shallow(
    <MuiThemeProvider theme={{}}>
      <MuiThemeProvider theme={eventManagerTheme}>
        <EventSummaryDialog {...props} />
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
