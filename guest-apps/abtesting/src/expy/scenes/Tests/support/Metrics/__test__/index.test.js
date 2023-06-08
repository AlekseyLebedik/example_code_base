import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MetricsView from '../index';

const theme = {
  spacing: numb => numb * 2,
  palette: {
    statuses: {
      live: {
        main: '#000',
      },
      proposal: {
        main: '#000',
      },
      done: {
        main: '#000',
      },
    },
    grey: {
      300: '#000',
    },
  },
};

describe('ABTesting Design - Metrics', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <MetricsView />
      </MuiThemeProvider>
    );
  });

  it('renders design metrics snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correct button', () => {
    const currentYear = new Date().getFullYear();
    const button = wrapper.find('button', currentYear).at(0);
    expect(button.text()).toEqual(`${currentYear}`);
  });
});
