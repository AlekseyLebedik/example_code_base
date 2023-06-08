import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Tabs } from 'antd';
import Tooltip from '@material-ui/core/Tooltip';
import download from 'downloadjs';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import KeyValue from 'dw/core/components/KeyValue';
import ProgressWhenEmpty from 'dw/core/components/ProgressWhenEmpty';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import { ACTIVATE_ACHIEVEMENTS_RULESETS } from '@demonware/devzone-core/access/PermissionCheck/permissions';

import { selectedRuleset as selectedRulesetSelector } from '../../selectors';
import {
  openCheckRulesetModal,
  openPropagateRulesetModal,
} from '../../actions';
import PropagateRulesetModal from './components/PropagateRulesetModal';
import CheckRulesetModal from './components/CheckRulesetModal';
import { DETAIL_FIELD_FORMATS } from './constants';

import './index.css';

const { MonacoEditor } = window;
const { TabPane } = Tabs;

const TabsComponent = ({ tabBarExtraContent, selectedRuleset }) => {
  const { code, ...withoutCode } = selectedRuleset;
  if (withoutCode.isActive && !withoutCode.activationTimestamp)
    withoutCode.activationTimestamp = withoutCode.lastUpdateTimestamp;

  return (
    <Tabs defaultActiveKey="details" tabBarExtraContent={tabBarExtraContent}>
      <TabPane tab="Details" key="details">
        <div className="details">
          <ProgressWhenEmpty
            propsToEval={[withoutCode]}
            size={30}
            thickness={2}
          >
            <KeyValue
              item={withoutCode}
              size={4}
              customFormats={DETAIL_FIELD_FORMATS}
            />
          </ProgressWhenEmpty>
        </div>
      </TabPane>
      <TabPane tab="Code" key="code">
        <MonacoEditor
          language="python"
          value={selectedRuleset.code}
          options={{ readOnly: true }}
        />
      </TabPane>
    </Tabs>
  );
};

TabsComponent.propTypes = {
  selectedRuleset: PropTypes.object.isRequired,
  tabBarExtraContent: PropTypes.element,
};
TabsComponent.defaultProps = { tabBarExtraContent: undefined };

const ActionButtons = () => {
  const dispatch = useDispatch();
  const selectedRuleset = useSelector(selectedRulesetSelector);
  const { isActive } = selectedRuleset;
  const isValidated = selectedRuleset.codeSignatureTimestamp !== null;
  const openCheckRulesetModalHandler = activating =>
    dispatch(openCheckRulesetModal(selectedRuleset.label, activating));

  return (
    <div className={classNames('extra-tab-content')}>
      {!isActive && isValidated && (
        <Tooltip title="Activate">
          <IconButton
            color="inherit"
            onClick={() => openCheckRulesetModalHandler(true)}
          >
            <Icon>settings_power</Icon>
          </IconButton>
        </Tooltip>
      )}
      {isValidated && (
        <Tooltip title="Check">
          <IconButton
            color="inherit"
            onClick={() => openCheckRulesetModalHandler(false)}
          >
            <Icon>ruleset_check</Icon>
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Propagate">
        <IconButton
          color="inherit"
          onClick={() => dispatch(openPropagateRulesetModal())}
        >
          <Icon>call_split</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Download">
        <span>
          <IconButton
            color="inherit"
            onClick={() =>
              download(
                selectedRuleset.code,
                `${selectedRuleset.label}.json.txt`
              )
            }
            disabled={!selectedRuleset.code}
          >
            <Icon>file_download</Icon>
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};

const RulesetDetails = () => {
  const selectedRuleset = useSelector(selectedRulesetSelector);
  const hasActivateRulesetsPermission = useCurrentEnvPermission(
    ACTIVATE_ACHIEVEMENTS_RULESETS
  );

  const Maincomponent = () => (
    <div className="details__container ruleset flex-rows-container">
      <PropagateRulesetModal rulesetLabel={selectedRuleset.label} />
      <CheckRulesetModal />
      <div
        className={classNames(
          'tabs scrollable-content',
          'tabs-container-reworked'
        )}
      >
        <TabsComponent
          selectedRuleset={selectedRuleset}
          tabBarExtraContent={
            hasActivateRulesetsPermission ? <ActionButtons /> : undefined
          }
        />
      </div>
    </div>
  );

  const emptyComponent = (
    <div className="ruleset-details__empty-container">
      Select a Ruleset to see more details
    </div>
  );

  return !selectedRuleset ? emptyComponent : Maincomponent();
};

export default RulesetDetails;
