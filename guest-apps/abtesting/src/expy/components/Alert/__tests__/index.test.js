import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Alert from '../index';

describe('ABTesting Design - Badge', () => {
  it('renders design badge snapshot', () => {
    expect(
      shallow(
        <MuiThemeProvider
          theme={{
            palette: {
              statuses: {
                approved: {
                  main: '#000',
                },
              },
            },
          }}
        >
          <Alert color="approved" title="Title" />
        </MuiThemeProvider>
      )
    ).toMatchSnapshot();
  });
});
