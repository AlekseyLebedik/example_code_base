import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Badge from '../index';

describe('ABTesting Design - Badge', () => {
  it('renders design badge snapshot', () => {
    expect(
      shallow(
        <MuiThemeProvider
          theme={{
            palette: {
              statuses: {
                live: {
                  main: '#000',
                },
              },
            },
          }}
        >
          <Badge color="live">Badge</Badge>
        </MuiThemeProvider>
      )
    ).toMatchSnapshot();
  });
});
