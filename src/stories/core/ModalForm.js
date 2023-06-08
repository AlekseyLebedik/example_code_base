/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import ModalForm from 'dw/core/components/ModalForm';
import { OpenModalButton } from 'dw/core/components/ModalForm/components';

import {
  reduxForm,
  Field,
  Form,
  propTypes as reduxFormPropTypes,
} from 'redux-form';

import createOnlineConfigurationStore from 'dw/online-configuration/store';
import formDecorator from 'stories/helpers/formDecorator';
import reduxDecorator from 'stories/helpers/reduxDecorator';

import CircularProgress from '@material-ui/core/CircularProgress';
import InputField from 'dw/core/components/FormFields/Input';

const { store } = createOnlineConfigurationStore();
const FORM_NAME = 'FORM_TEST';
const stories = storiesOf('core/ModalForm', module)
  .addDecorator(formDecorator)
  .addDecorator(reduxDecorator(store))
  .addDecorator(withInfo());

const statelessForm = props => {
  const { handleSubmit, onSubmit } = props;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="text"
        component={InputField}
        type="text"
        label="Input text"
        fullWidth
      />
    </Form>
  );
};

statelessForm.propTypes = {
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.onSubmit,
};

statelessForm.defaultProps = {};

const form = reduxForm({
  form: FORM_NAME,
})(statelessForm);

stories.add('default', () => (
  <>
    <ModalForm
      formName={FORM_NAME}
      FormComponent={form}
      OpenModalComponent={OpenModalButton}
      title="ModalForm default example"
      store={store}
    />
  </>
));

stories.add('Custom buttons text', () => (
  <ModalForm
    formName={FORM_NAME}
    FormComponent={form}
    OpenModalComponent={OpenModalButton}
    title="Custom buttons modal form"
    submittingText={<CircularProgress size={20} />}
    submitText="Upload"
  />
));

stories.add('Overwrite modal state modifiers', () => {
  let VISIBLE = false;
  let LOADING = false;
  let PRISTINE = true;
  return (
    <>
      <ModalForm
        formName={FORM_NAME}
        FormComponent={form}
        OpenModalComponent={OpenModalButton}
        title="ModalForm overwritting form state handlers"
        visible={VISIBLE}
        loading={LOADING}
        pristine={PRISTINE}
      />
      <button
        type="button"
        onClick={() => {
          VISIBLE = !VISIBLE;
        }}
      >
        Visible
      </button>
      <button
        type="button"
        onClick={() => {
          LOADING = !LOADING;
        }}
      >
        Loading
      </button>
      <button
        type="button"
        onClick={() => {
          PRISTINE = !PRISTINE;
        }}
      >
        Pristine
      </button>
    </>
  );
});

stories.add('Overwrite modal handler functions', () => (
  <ModalForm
    formName={FORM_NAME}
    FormComponent={form}
    OpenModalComponent={OpenModalButton}
    title="ModalForm overwritting form state handlers"
    onCancel={() => {
      action('Cancel button clicked!');
    }}
    onRemoteSubmit={() => {
      action('Submit button clicked!');
    }}
  />
));

stories.add('Overwritte Form component onSubmit function', () => (
  <ModalForm
    formName={FORM_NAME}
    FormComponent={form}
    OpenModalComponent={OpenModalButton}
    onFormSubmit={() => {
      action('Form component submitted!');
    }}
    title="ModalForm overwritting Form component onSubmit function"
  />
));

// TODO: Show how to integrate properly with DropZone core/component
// stories.add('Integrate with DropZone', () => (
//     <ModalForm
//       formName="FORM_NAME"
//       FormComponent={form}
//       onFormSubmit={() => {
//         action('Form component submitted!');
//       }}
//       title="ModalForm example"
//       visible
//     />
//   ));

stories.add('Styling - Custom dialog style', () => (
  <ModalForm
    formName={FORM_NAME}
    FormComponent={form}
    OpenModalComponent={OpenModalButton}
    title="ModalForm with custom dialog style"
    dialogContentStyle={{ width: '500px' }}
    visible
  />
));

stories.add('Styling - Full width', () => (
  <ModalForm
    formName={FORM_NAME}
    FormComponent={form}
    OpenModalComponent={OpenModalButton}
    title="ModalForm with full width"
    fullWidth
    visible
  />
));

stories.add('Styling - Custom max width breakpoint', () => (
  <ModalForm
    formName={FORM_NAME}
    FormComponent={form}
    OpenModalComponent={OpenModalButton}
    title="ModalForm with custom max width"
    maxWidth="md"
    visible
  />
));

stories.add('Styling - Specify wrapper className', () => (
  <ModalForm
    formName={FORM_NAME}
    FormComponent={form}
    OpenModalComponent={OpenModalButton}
    title="ModalForm specifying container class for Form"
    wrapperClassName="modal_form--container"
    visible
  />
));
