import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, FieldArray } from 'redux-form';
import { Col, Row } from 'antd';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';
import KeyValueField from '../KeyValueField';
import { IS_MAJOR_UPDATE_HELP } from '../VariablesSetDetails/constants';
import { MIN_GROUP_ID, MAX_GROUP_ID } from '../../constants';
import './presentational.css';

const validateGroupId = V.intRangeValidator(MIN_GROUP_ID, MAX_GROUP_ID);

const validateVersion = value => {
  const intValue = parseInt(value, 10);
  return intValue < 0 ? 'Should be number greater or equal to 0' : undefined;
};

const validateVariables = values => {
  if (values) {
    const keys = {};
    const errors = values.map(() => null);
    values.forEach(({ key = '', value }, index) => {
      if (key || value) {
        if (!Object.keys(keys).includes(key)) {
          keys[key] = [];
        }
        keys[key].push(index);
      }
    });
    Object.values(keys).forEach(indexes => {
      if (indexes.length > 1) {
        indexes.forEach(idx => {
          errors[idx] = { key: 'Keys should be unique' };
        });
      }
    });
    if (errors.some(e => e)) {
      return errors;
    }
  }
  return null;
};

export const ConfirmOverride = props => {
  const {
    meta: { error },
  } = props;
  return error ? (
    <FormControl error={!!error}>
      <Checkbox {...props} />
    </FormControl>
  ) : null;
};

ConfirmOverride.propTypes = {
  meta: PropTypes.object.isRequired,
};

const AddVariablesSetForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-listItem-form variables-sets">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Row gutter={16}>
          <Col span={24}>
            <Field
              component={ConfirmOverride}
              name="confirmed"
              label="Override existing Variable Set"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Field
              name="namespace"
              component={Input}
              label="Namespace"
              validate={[V.required]}
              maxLength={20}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Field
              name="context"
              component={Input}
              label="Context"
              maxLength={16}
              fullWidth
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Field
              name="groupId"
              component={Input}
              type="number"
              label="Group ID"
              min={MIN_GROUP_ID}
              max={MAX_GROUP_ID}
              validate={[V.required, validateGroupId]}
              fullWidth
            />
          </Col>
          <Col span={12}>
            <div className="flex items-center">
              <Tooltip title={IS_MAJOR_UPDATE_HELP}>
                <Icon>help_outline</Icon>
              </Tooltip>
              <Field
                name="isMajorUpdate"
                component={Checkbox}
                label="Is Major Update"
                labelPlacement="start"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Field
              name="majorVersion"
              component={Input}
              type="number"
              label="Major Version"
              validate={[V.required, validateVersion]}
              min={0}
              fullWidth
            />
          </Col>
          <Col span={12}>
            <Field
              name="minorVersion"
              component={Input}
              type="number"
              label="Minor Version"
              validate={[V.required, validateVersion]}
              min={0}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FieldArray
              name="variables"
              component={KeyValueField}
              validate={validateVariables}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

AddVariablesSetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddVariablesSetForm;
