import React from 'react';
import { shallowUntilTarget } from 'dw/test-utils';
import { shallow } from 'enzyme';

import createStore from 'dw/online-configuration/store';
import { reduxForm, Field, Form } from 'redux-form';
import Dialog from 'dw/core/components/Dialog';
import InputField from 'dw/core/components/FormFields/Input';

import ConnectedModalForm from '../container';
import StatelessModalForm from '../presentational';
import OpenModalButton from '../components/OpenModalButton';

jest.mock('dw/core/components/Dialog', () => 'Dialog');

describe('ModalForm container', () => {
  const formName = 'EXAMPLE_FORM_NAME';
  const { store } = createStore();
  const wrapperClassName = 'modal-form__container';
  const mainProps = {
    formName,
    store,
    wrapperClassName,
  };
  let form;

  beforeEach(() => {
    form = reduxForm({
      form: formName,
    })(props => {
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
    });
  });

  it('modal should be visible', () => {
    const props = {
      visible: true,
      ...mainProps,
    };

    const wrapper = shallowUntilTarget(
      <ConnectedModalForm {...props} FormComponent={form} />,
      StatelessModalForm
    );

    const dialog = wrapper.find(Dialog);

    expect(dialog.props().open).toBe(true);
  });

  it('modal should open on button click', () => {
    const props = {
      openModal: jest.fn(),
      ...mainProps,
    };

    const wrapper = shallowUntilTarget(
      <ConnectedModalForm
        {...props}
        FormComponent={form}
        OpenModalComponent={OpenModalButton}
      />,
      StatelessModalForm
    );

    const btn = wrapper.find('[className="openModal__container"]');
    btn.simulate('click');

    expect(props.openModal).toBeCalled();
  });

  it('modal should cancel on Cancel click', () => {
    const props = {
      openModal: jest.fn(),
      onCancel: jest.fn(),
      ...mainProps,
    };

    const wrapper = shallowUntilTarget(
      <ConnectedModalForm
        {...props}
        FormComponent={form}
        OpenModalComponent={OpenModalButton}
      />,
      StatelessModalForm
    );

    const openBtn = wrapper.find('[className="openModal__container"]');
    openBtn.simulate('click');
    const cancelBtn = shallow(wrapper.find(Dialog).props().actions[0]);
    expect(cancelBtn.hasClass('cancelModal__button')).toBe(true);

    cancelBtn.simulate('click');
    expect(props.onCancel).toBeCalled();
  });

  it('modal should submit on Submit click', () => {
    const props = {
      openModal: jest.fn(),
      onRemoteSubmit: jest.fn(),
      ...mainProps,
    };

    const wrapper = shallowUntilTarget(
      <ConnectedModalForm
        {...props}
        FormComponent={form}
        OpenModalComponent={OpenModalButton}
      />,
      StatelessModalForm
    );

    const openBtn = wrapper.find('[className="openModal__container"]');
    openBtn.simulate('click');
    const submitBtn = shallow(wrapper.find(Dialog).props().actions[1]);
    expect(submitBtn.hasClass('submitModal__button')).toBe(true);

    submitBtn.simulate('click');
    expect(props.onRemoteSubmit).toBeCalled();
  });
});
