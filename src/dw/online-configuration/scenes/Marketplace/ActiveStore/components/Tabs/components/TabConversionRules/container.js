import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';

import { fetchConversionRules } from './actions';
import TabConversionRulesStateless from './presentational';

const stateToProps = state => ({
  conversionRules:
    state.Scenes.Marketplace.ActiveStoreTabs.TabConversionRules.conversionRules,
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchConversionRules()),
});

function TabConversionRules(props) {
  const [payload, setPayload] = useState({});

  const filteredRules = useMemo(
    () =>
      payload
        ? props.conversionRules.filter(r =>
            r.conversionRuleID.includes(payload.q)
          )
        : props.conversionRules,
    [payload, props.conversionRules]
  );

  useEffect(() => {
    props.onLoad();
  }, []);

  return (
    <TabConversionRulesStateless
      filteredRules={filteredRules}
      onSearch={setPayload}
    />
  );
}

TabConversionRules.propTypes = {
  ...TabConversionRulesStateless.propTypes,
  onLoad: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, TabConversionRules);
