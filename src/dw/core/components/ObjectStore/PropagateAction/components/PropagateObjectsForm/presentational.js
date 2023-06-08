import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form, formValues } from 'redux-form';

import MenuItem from '@material-ui/core/MenuItem';
import { hasData } from 'dw/core/helpers/object';
import { useCancellablePromise } from 'dw/core/hooks';
import { fetchContextsForService } from 'dw/core/components/ContextSelector/services';
import { getObjectGroups } from 'dw/online-configuration/services/objectStore';
import {
  requiredContextSelector,
  usesMulticontextPropsSelector,
} from 'dw/core/components/ContextSelector/selectors';
import { CONTEXT_TYPE_ANY } from 'dw/core/components/ContextSelector/constants';
import * as V from 'dw/core/components/FormFields/validation';
import TitleEnvSelect from 'dw/core/components/TitleEnvSelect';
import Select from 'dw/core/components/FormFields/Select';
import ContextComponentBase from 'dw/online-configuration/components/TitleEnvContext';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import { OBJECTS_MAX_SIZE } from './constants';
import styles from './presentational.module.css';

const MultipleContextComponentBase = ({ environment, ...props }) => {
  if (environment) {
    const { key: env, label } = environment;
    return (
      <ContextComponentBase
        {...props}
        environment={env}
        key={env}
        envLabel={label}
        name={`${props.input.name}.${env}`}
      />
    );
  }
  return null;
};

const MultipleContextComponent = formValues('environment')(
  MultipleContextComponentBase
);

MultipleContextComponentBase.propTypes = {
  environment: PropTypes.object,
  input: PropTypes.object,
};

MultipleContextComponentBase.defaultProps = {
  environment: undefined,
  input: undefined,
};

export const GroupsSelectBase = props => {
  const [groups, setGroups] = useState([]);
  const { environment } = props;
  const { key: env } = environment;
  const [titleId, envType] = env.split(':');
  const isMulticontext = useSelector(state =>
    usesMulticontextPropsSelector(state, { titleId, envType })
  );
  const endpointContext = useSelector(state =>
    requiredContextSelector(state, {
      serviceName: Services.Groups,
      endpoint: ServiceEndpoints.Groups.getGroups,
    })
  );
  const cancellablePromise = useCancellablePromise();
  const getAvailableGroupContext = useCallback(async () => {
    const {
      data: { data },
    } = await cancellablePromise(fetchContextsForService, {
      titleId,
      envType,
      serviceName: Services.Groups,
    });
    const filteredData =
      isMulticontext && endpointContext
        ? data.filter(
            d => d.type === endpointContext.type || d.type === CONTEXT_TYPE_ANY
          )
        : data;
    if (hasData(filteredData)) {
      const [currentContext] = filteredData;
      try {
        const {
          data: { groups: objectGroups },
        } = await cancellablePromise(getObjectGroups, {
          titleId,
          envType,
          context: currentContext.name,
        });
        setGroups(objectGroups);
      } catch (e) {
        if (e.isCanceled) return;
        setGroups([]);
      }
    }
  }, [environment]);

  useEffect(() => {
    if (environment) {
      getAvailableGroupContext();
    }
  }, [environment]);

  return (
    <Select {...props} disabled={!hasData(groups)}>
      {groups &&
        groups.map(group => (
          <MenuItem key={group.groupID} value={group.groupID}>
            {group.groupName}
          </MenuItem>
        ))}
    </Select>
  );
};

GroupsSelectBase.propTypes = {
  environment: PropTypes.object.isRequired,
};

const GroupsSelect = ({ environment, ...props }) => {
  if (environment) {
    return <GroupsSelectBase environment={environment} {...props} />;
  }
  return (
    <Select {...props} disabled>
      <MenuItem />
    </Select>
  );
};

GroupsSelect.propTypes = {
  environment: PropTypes.object,
};
GroupsSelect.defaultProps = {
  environment: undefined,
};

const GroupsSelectComponent = formValues('environment')(GroupsSelect);

const PropagateObjectsForm = props => {
  const {
    handleSubmit,
    externalSubmit,
    initialValues: { objects },
    change,
    touch,
    untouch,
  } = props;
  const objectsLength = objects.reduce(
    (a, b) => a + parseInt(b.contentLength || 0, 10),
    0
  );
  const maxSize = objectsLength > OBJECTS_MAX_SIZE;

  return (
    <Form onSubmit={handleSubmit(externalSubmit)}>
      {maxSize && (
        <div className={styles.maxSize}>
          Size of objects to propagate should not be greater than 50MB.
        </div>
      )}
      <dl className={styles.objectsBlock}>
        {objects.map((obj, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <dd key={`${obj.fileName}-${idx}`} className={styles.obj}>
            {obj.fileName}
          </dd>
        ))}
      </dl>
      <Field
        name="environment"
        component={TitleEnvSelect}
        label="Environment"
        validate={[V.required]}
        className={styles.environment}
        displayEnvsFromCurrentProject
        excludeCurrent
        labelInValue
        didabled={maxSize}
        sameProjectOnTop
      />
      <Field
        name="context"
        component={MultipleContextComponent}
        validate={[V.required]}
        change={change}
        touch={touch}
        untouch={untouch}
        serviceName={Services.ObjectStore}
        endpoint={ServiceEndpoints.ObjectStore.createPublisherObject}
      />
      <Field
        name="groupID"
        component={GroupsSelectComponent}
        label="Object Group"
        fullWidth
      />
      <Field name="acl" component={Select} label="ACL" fullWidth>
        <MenuItem value="public">Public</MenuItem>
        <MenuItem value="private">Private</MenuItem>
      </Field>
      <p className={styles.warning}>
        This will overwrite any Objects with the same name in the target
        environment.
      </p>
    </Form>
  );
};

PropagateObjectsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  touch: PropTypes.func.isRequired,
  untouch: PropTypes.func.isRequired,
};

PropagateObjectsForm.defaultProps = {
  initialValues: {},
};

export default PropagateObjectsForm;
