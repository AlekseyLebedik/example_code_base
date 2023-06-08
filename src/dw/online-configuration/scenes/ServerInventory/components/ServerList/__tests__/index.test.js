import React from 'react';
import { render } from 'enzyme';
import { compose } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from '@demonware/devzone-core/themes';
import ServerList from '../index';

const withMui = child => (
  <MuiThemeProvider theme={muiTheme}>{child}</MuiThemeProvider>
);

const withRouter = routerProps => child =>
  <MemoryRouter {...routerProps}>{child}</MemoryRouter>;

const ComposedServerList = compose(withMui, withRouter(), ServerList);

describe('ServerInventory', () => {
  describe('ServerList', () => {
    it('renders empty list', () => {
      expect(render(<ServerList servers={[]} />)).toMatchSnapshot();
    });

    it.skip('renders idle server', () => {
      const servers = [
        {
          data: {
            allocated: false,
            priority: '1',
            registrationTime: '2010-01-01',
            playlistID: '1',
          },
          userID: '12345',
        },
      ];

      expect(
        render(<ComposedServerList servers={servers} />)
      ).toMatchSnapshot();
    });

    it.skip('renders allocated servers', () => {
      const servers = [
        {
          data: {
            allocated: true,
            priority: '1',
            registrationTime: '2010-01-01',
            freeSlots: '10',
            playlistID: '1',
            usageInfo: {
              maxSlots: 20,
              lobbyID: '54321',
              openStatus: true,
            },
          },
          userID: '12345',
        },
        {
          data: {
            allocated: true,
            priority: '1',
            registrationTime: '2010-01-01',
            freeSlots: '10',
            playlistID: '1',
            usageInfo: {
              maxSlots: 20,
              lobbyID: '09876',
              openStatus: false,
            },
          },
          userID: '67890',
        },
      ];

      expect(
        render(<ComposedServerList servers={servers} />)
      ).toMatchSnapshot();
    });
  });
});
