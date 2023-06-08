import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm, Field, submit, change, Form } from 'redux-form';
import sortBy from 'lodash/sortBy';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import Select from 'dw/core/components/FormFields/Select';
import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';
import MonacoEditor from 'dw/core/components/FormFields/Monaco';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import { sendUserEvent } from 'dw/online-configuration/services/achievements';

import { useIsClanAchievements } from '../../hooks';
import Accordion from '../Accordion';
import styles from './index.module.css';

const INITIAL_EDITOR_HEIGHT = 132;

const FORM_NAME = 'AE.SEND_PLAYER_EVENT';

const isValidJSON = V.isValidJSON({});

const SendEvent = ({
  playerId,
  events,
  event,
  onRefresh,
  handleSubmit,
  submitting,
}) => {
  const editorRef = useRef();
  const isClan = useIsClanAchievements();
  const postUserContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.AE,
      endpoint: ServiceEndpoints.AE.postUserEvent,
    })
  );
  const postClanContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.AE,
      endpoint: ServiceEndpoints.AE.postClanEvent,
    })
  );
  const postContext = isClan ? postClanContext : postUserContext;
  const dispatch = useDispatch();
  const changeValue = (field, value) =>
    dispatch(change(FORM_NAME, field, value));
  const showSuccess = msg =>
    dispatch(GlobalSnackBarActions.show(msg, 'success'));
  const showError = msg => dispatch(GlobalSnackBarActions.show(msg, 'error'));
  const options = useMemo(
    () =>
      sortBy(
        events.map(e => ({ value: e, label: e })),
        'value'
      ),
    [events]
  );
  const onSendEvent = async values => {
    try {
      const sendUserEventResult = await sendUserEvent({
        playerId,
        data: { ...values, values: JSON.parse(values.values) },
        context: postContext,
        isClan,
      });
      showSuccess(
        `Event successfully sent  (TransactionId : ${sendUserEventResult.headers['dw-transaction']})`
      );
      onRefresh('all');
    } catch (e) {
      showError('Something went wrong, check logs for details');
    }
  };
  useEffect(() => {
    let name = '';
    let values = '{}';
    if (event) {
      ({ name, data: values } = event);
    }
    changeValue('name', name);
    changeValue('values', values);
  }, [event]);
  const NameComponent = options.length > 0 ? Select : Input;
  return (
    <div className={styles.container}>
      <Accordion
        summary="Send Event"
        action={{
          label: submitting ? 'Sending ...' : 'Send',
          onClick: () => dispatch(submit(FORM_NAME)),
          disabled: submitting,
        }}
      >
        <Form onSubmit={handleSubmit(onSendEvent)}>
          <Field
            name="name"
            component={NameComponent}
            options={options.length > 0 ? options : undefined}
            className={styles.name}
            label="Event Name"
            validate={[V.required]}
            fullWidth
          />
          <Field
            name="values"
            component={MonacoEditor}
            editorRef={editorRef}
            language="json"
            height={INITIAL_EDITOR_HEIGHT}
            width={Infinity}
            options={{
              folding: false,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
            validate={[V.required, isValidJSON]}
            resizable
          />
        </Form>
      </Accordion>
    </div>
  );
};

SendEvent.propTypes = {
  playerId: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.string),
  event: PropTypes.object,
  onRefresh: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

SendEvent.defaultProps = {
  playerId: undefined,
  events: [],
  event: undefined,
  submitting: false,
};

export default reduxForm({
  form: FORM_NAME,
  initialValues: { name: '', values: '{}' },
})(SendEvent);
