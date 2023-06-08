/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import { Field, Form } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Input from 'dw/core/components/FormFields/Input';
import Select from 'dw/core/components/FormFields/Select';
import Monaco from 'dw/core/components/FormFields/Monaco';

import createStore from 'dw/online-configuration/store';

import formDecorator from 'stories/helpers/formDecorator';
import reduxDecorator from 'stories/helpers/reduxDecorator';

const { store } = createStore();

const stories = storiesOf('core/Forms', module)
  .addDecorator(formDecorator)
  .addDecorator(reduxDecorator(store));

stories.add('sample', () => (
  <Form onSubmit={action('submit')}>
    <div>This is an example form</div>
    <div>For more input types and options, got to material-ui demo</div>
    <hr />
    <Field name="select" component={Select} label="Field Label" fullWidth>
      <MenuItem value="value">Text</MenuItem>
      <MenuItem value="value2">Text 2</MenuItem>
    </Field>
    <Field
      name="textInput"
      component={Input}
      label="Label for text input"
      fullWidth
    />
    <div>
      <Button color="primary" onClick={action('click')}>
        Save
      </Button>
      <Button onClick={action('click')}>Cancel</Button>
    </div>
  </Form>
));

stories.add('Monaco', () => (
  <Field
    name="monacoInput"
    component={Monaco}
    label="Script"
    height={300}
    width={Infinity}
    options={{
      folding: false,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
    }}
    language={select(
      'language',
      ['mysql', 'pgsql', 'sql', 'json', 'python'],
      'python'
    )}
    fullWidth
  />
));
