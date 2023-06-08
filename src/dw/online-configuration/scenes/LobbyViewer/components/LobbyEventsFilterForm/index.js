import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from 'antd';

const FormItem = Form.Item;

class LobbyEventsFilterForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
        };
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { values } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormItem>
          {getFieldDecorator('lobbyId', {
            rules: [{ required: true, message: 'Please input a lobby Id.' }],
            initialValue: values.lobbyId,
          })(
            <Input
              placeholder="Enter Lobby ID"
              onPressEnter={this.handleSubmit}
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

LobbyEventsFilterForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default Form.create()(LobbyEventsFilterForm);
