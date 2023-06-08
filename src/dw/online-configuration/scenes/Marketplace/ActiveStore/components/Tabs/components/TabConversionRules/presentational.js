import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import AsyncComponent from 'dw/core/components/AsyncComponent';
import Search from 'dw/core/components/Search';

import './presentational.css';

const Monaco = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MonacoEditor" */ 'dw/core/components/FormFields/Monaco'
  )
);

const TabConversionRulesStateless = props => {
  const { filteredRules, onSearch } = props;

  const empty = () => <div className="empty">No data to display</div>;
  const hasRules = filteredRules.length !== 0;

  const renderRules = () => {
    const rule = r => (
      <div className="rule" key={`rule-${r.conversionRuleID}`}>
        <div className="rule-id">Rule ID: {r.conversionRuleID}</div>
        <div className="rule-description">Description: {r.description}</div>
        <div className="rule-code">
          <Monaco
            height={200}
            options={{
              fontSize: 12,
              minimap: { enabled: false },
              readOnly: true,
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              wrappingIndent: 'indent',
            }}
            language="json"
            value={JSON.stringify(r, undefined, 2)}
          />
        </div>
      </div>
    );

    return <div className="rules">{filteredRules.map(rule)}</div>;
  };

  const search = (
    <Row>
      <Col span={24}>
        <Search placeholder="Filter by Rule ID" onSearch={onSearch} />
      </Col>
    </Row>
  );

  return (
    <div className="active-store__tab-conversion-rules">
      {search}
      <Row>
        <Col span={24}>{hasRules ? renderRules() : empty()}</Col>
      </Row>
    </div>
  );
};

TabConversionRulesStateless.propTypes = {
  filteredRules: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
};
TabConversionRulesStateless.defaultProps = {
  filteredRules: [],
};

export default TabConversionRulesStateless;
