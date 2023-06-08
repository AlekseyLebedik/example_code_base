/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Button from '@material-ui/core/Button';
import { ContextProvider } from '@demonware/devzone-core/AppStore';

import GlobalSnackBar, {
  GlobalSnackBarActions,
} from '@demonware/devzone-core/components/GlobalSnackBar';

const messageDefault = 'Message test';
storiesOf('core/GlobalSnackBar')
  .addDecorator(withInfo())
  .add('info', () => (
    <ContextProvider>
      <div>
        <Button
          onClick={() =>
            window.globalAppStore.dispatch(
              GlobalSnackBarActions.show(text('message', messageDefault))
            )
          }
        >
          Show info
        </Button>
        <GlobalSnackBar />
      </div>
    </ContextProvider>
  ))
  .add('error', () => (
    <ContextProvider>
      <div>
        <Button
          onClick={() =>
            window.globalAppStore.dispatch(
              GlobalSnackBarActions.show(
                text('message', messageDefault),
                'error'
              )
            )
          }
        >
          Show error
        </Button>
        <GlobalSnackBar />
      </div>
    </ContextProvider>
  ))
  .add('success', () => (
    <ContextProvider>
      <div>
        <Button
          onClick={() =>
            window.globalAppStore.dispatch(
              GlobalSnackBarActions.show(
                text('message', messageDefault),
                'success'
              )
            )
          }
        >
          Show sucess
        </Button>
        <GlobalSnackBar />
      </div>
    </ContextProvider>
  ));
