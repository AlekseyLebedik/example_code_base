import React from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import { propagateRulesetModalStateSelector } from 'dw/online-configuration/scenes/Achievements/Rulesets/selectors';
import {
  closePropagateRulesetModal,
  propagateRuleset,
} from 'dw/online-configuration/scenes/Achievements/Rulesets/actions';
import { FORM_NAME as PropagateRulesetFormName } from '../PropagateRulesetForm/constants';
import Form from '../PropagateRulesetForm';

const PropagateRulesetModal = ({ rulesetLabel }) => {
  const dispatch = useDispatch();
  const { visible, loading } = useSelector(propagateRulesetModalStateSelector);

  const onCancel = () => dispatch(closePropagateRulesetModal());

  const onSubmit = values => dispatch(propagateRuleset(values));

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button
      key="primary"
      color="primary"
      focusRipple
      onClick={() => dispatch(submit(PropagateRulesetFormName))}
    >
      {loading ? 'Propagating...' : 'Propagate Ruleset'}
    </Button>,
  ];

  return (
    <div className="rulesets__rulesets-details__propagate-ruleset-modal">
      <Dialog
        title="Propagate ruleset"
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '450px' }}
      >
        <Form initialValues={{ label: rulesetLabel }} onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};
PropagateRulesetModal.propTypes = {
  rulesetLabel: PropTypes.string.isRequired,
};

export default PropagateRulesetModal;
