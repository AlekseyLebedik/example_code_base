/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';

// eslint-disable-next-line
import * as monacoEditor from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';

window.monacoEditor = monacoEditor;
window.MonacoEditor = MonacoEditor;

storiesOf('Welcome', module).add('start here', () => (
  <div style={{ padding: 10 }}>
    <h1>Devzone storybook</h1>
    <hr />
    <h2>Getting started</h2>
    <p>
      To learn how to write stories, please try the official{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://storybook.js.org/basics/writing-stories/"
      >
        docs
      </a>
    </p>
    <p>
      There are currently some basic stories. You can use one of them as a start
      for your own stories
    </p>
    <p>
      Some of the current uses are: Presentational components, showing storybook
      source, adding extra info, adding knobs (for live tweaking of your
      component), redux-form and Apollo/GraphQL support
    </p>
    <hr />
    <h2>Addons</h2>
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/storybookjs/storybook/tree/v5.1.9/addons/actions"
        >
          Actions Addon
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/storybookjs/storybook/tree/v5.1.10/addons/info"
        >
          Info Addon
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/storybookjs/storybook/tree/v5.1.9/addons/knobs"
        >
          Knobs Addon
        </a>
      </li>
    </ul>
  </div>
));
