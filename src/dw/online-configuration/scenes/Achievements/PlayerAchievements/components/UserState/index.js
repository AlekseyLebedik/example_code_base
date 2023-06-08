import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm, Field, submit, change, Form } from 'redux-form';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { AE_CHANGE_PLAYER_STATE } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import * as V from 'dw/core/components/FormFields/validation';
import MonacoEditor from 'dw/core/components/FormFields/Monaco';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import {
  getUserState,
  putUserState,
} from 'dw/online-configuration/services/achievements';

import Accordion from '../Accordion';
import { useIsClanAchievements } from '../../hooks';
import styles from './index.module.css';

const INITIAL_EDITOR_HEIGHT = 168;

const FORM_NAME = 'AE.UPDATE_PLAYER_STATE';

const isValidJSON = V.isValidJSON({});

const useUserStateLoading = (playerId, context) => {
  const dispatch = useDispatch();
  const isClan = useIsClanAchievements();
  const setUserState = useCallback(
    value => dispatch(change(FORM_NAME, 'userState', value)),
    [dispatch]
  );

  useEffect(() => {
    const loadUserState = async () => {
      try {
        const {
          data: { userState: userStateResponse },
        } = await getUserState({ playerId, context, isClan });
        setUserState(
          userStateResponse
            ? JSON.stringify(JSON.parse(userStateResponse), null, 2)
            : userStateResponse
        );
      } catch (e) {
        setUserState('');
      }
    };
    if (playerId) {
      if (context !== undefined) loadUserState();
    } else {
      setUserState('');
    }
  }, [playerId, context, setUserState]);
  return setUserState;
};

const UserState = ({
  playerId,
  onRefresh,
  submitting,
  handleSubmit,
  expanded,
  toggleExpanded,
}) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const isClan = useIsClanAchievements();
  const clanContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.AE,
      endpoint: ServiceEndpoints.AE.getClanState,
    })
  );
  const userContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.AE,
      endpoint: ServiceEndpoints.AE.getUserState,
      userId: playerId,
    })
  );
  const context = isClan ? clanContext : userContext;
  const putUserContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.AE,
      endpoint: ServiceEndpoints.AE.putUserState,
      userId: playerId,
    })
  );
  const putClanContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.AE,
      endpoint: ServiceEndpoints.AE.putClanState,
    })
  );
  const putContext = isClan ? putClanContext : putUserContext;
  const setUserState = useUserStateLoading(playerId, context);
  const hasChangeUserStatePermission = useCurrentEnvPermission(
    AE_CHANGE_PLAYER_STATE
  );
  const showSuccess = msg =>
    dispatch(GlobalSnackBarActions.show(msg, 'success'));
  const showError = msg => dispatch(GlobalSnackBarActions.show(msg, 'error'));

  const onUpdateUserState = async ({ userState }) => {
    const newUserState = JSON.stringify(JSON.parse(userState), null, 2);
    try {
      await putUserState({
        playerId,
        data: { body: newUserState },
        context: putContext,
        isClan,
      });
      showSuccess('User State successfully updated');
      if (newUserState !== userState) setUserState(newUserState);
      onRefresh('table');
    } catch (e) {
      showError('Something went wrong, check logs for details');
    }
  };
  return (
    <div className={styles.container}>
      <Accordion
        summary="User State"
        action={
          hasChangeUserStatePermission
            ? {
                label: submitting ? 'Saving...' : 'Save',
                onClick: () => dispatch(submit(FORM_NAME)),
                disabled: submitting,
              }
            : undefined
        }
        expanded={expanded}
        onChange={() => toggleExpanded(!expanded)}
      >
        <Form onSubmit={handleSubmit(onUpdateUserState)}>
          <Field
            name="userState"
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

UserState.propTypes = {
  playerId: PropTypes.string,
  onRefresh: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  expanded: PropTypes.bool,
  toggleExpanded: PropTypes.func.isRequired,
};

UserState.defaultProps = {
  playerId: undefined,
  submitting: false,
  expanded: false,
};

export default reduxForm({
  form: FORM_NAME,
  initialValues: { userState: undefined },
})(UserState);
