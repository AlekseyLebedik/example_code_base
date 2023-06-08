import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { hasData } from 'dw/core/helpers/object';
import { makeCancelable } from 'dw/core/helpers/promise';
import { fetchContextsForService } from 'dw/core/components/ContextSelector/services';
import {
  requiredContextSelector,
  usesMulticontextPropsSelector,
} from 'dw/core/components/ContextSelector/selectors';
import { CONTEXT_TYPE_ANY } from 'dw/core/components/ContextSelector/constants';
import Select from 'dw/core/components/Select';

import styles from './index.module.css';

const TitleEnvPlayerContext = ({
  onChange,
  environment,
  playerId,
  serviceName,
  endpoint,
}) => {
  const [titleId, envType] = environment.split(':');
  const [selectedContext, setSelectedContext] = useState();
  const [contexts, setContexts] = useState([]);
  const isMulticontext = useSelector(state =>
    usesMulticontextPropsSelector(state, { titleId, envType })
  );
  const endpointContext = useSelector(state =>
    requiredContextSelector(state, {
      serviceName,
      endpoint,
    })
  );

  useEffect(() => {
    if (playerId) {
      // eslint-disable-next-line no-use-before-define
      getAvailableContext();
    } else {
      setContexts([]);
    }
  }, [playerId]);

  const setContext = (id, value = undefined) => {
    setSelectedContext(id);
    if (!value) {
      const selectedCtx = contexts.find(ctx => ctx.id === id);
      // eslint-disable-next-line no-param-reassign
      value = selectedCtx.name;
    }
    onChange(value);
  };

  const getAvailableContext = useCallback(async () => {
    const getContextsPromise = makeCancelable(
      fetchContextsForService({
        titleId,
        envType,
        serviceName,
        userId: playerId,
      })
    );
    const {
      data: { data },
    } = await getContextsPromise.promise;

    const filteredData =
      isMulticontext && endpointContext
        ? data.filter(
            d => d.type === endpointContext.type || d.type === CONTEXT_TYPE_ANY
          )
        : data;
    setContexts(filteredData);
    if (hasData(filteredData)) {
      const [currentContext] = filteredData;
      setContext(currentContext.id, currentContext.name);
    }
  }, [
    endpointContext,
    envType,
    isMulticontext,
    playerId,
    serviceName,
    setContext,
    titleId,
  ]);

  if (contexts.length === 0) {
    return null;
  }
  if (contexts.length > 1) {
    const options = contexts.map(ctx => ({ label: ctx.name, value: ctx.id }));
    return (
      <Select
        options={options}
        value={selectedContext}
        fullWidth
        onChange={e => setContext(e.target.value)}
        label="Enter context"
      />
    );
  }
  return (
    <div className={styles.context}>
      Selected target context <strong>{contexts[0].name}</strong>
    </div>
  );
};

TitleEnvPlayerContext.propTypes = {
  environment: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  playerId: PropTypes.string,
};
TitleEnvPlayerContext.defaultProps = {
  playerId: undefined,
};

export default TitleEnvPlayerContext;
