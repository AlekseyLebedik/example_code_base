import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Clipboard from 'react-clipboard.js';
import Dialog from 'dw/core/components/Dialog';
import LoadingComponent from 'dw/core/components/Loading';
import Icon from '@material-ui/core/Icon';
import {
  checkRulesetModalStateSelector,
  invalidCurrencyIDsSelector,
  invalidItemIDsSelector,
  invalidProductIDsSelector,
  selectedRuleset as selectedRulesetSelector,
} from 'dw/online-configuration/scenes/Achievements/Rulesets/selectors';
import {
  activateRuleset,
  closeCheckRulesetModal,
} from 'dw/online-configuration/scenes/Achievements/Rulesets/actions';
import styles from './index.module.css';

const CheckRulesetModal = () => {
  const dispatch = useDispatch();
  const selectedRuleset = useSelector(selectedRulesetSelector);
  const invalidCurrencyIDs = useSelector(invalidCurrencyIDsSelector);
  const invalidItemIDs = useSelector(invalidItemIDsSelector);
  const invalidProductIDs = useSelector(invalidProductIDsSelector);
  const { visible, loading, activating, failed } = useSelector(
    checkRulesetModalStateSelector
  );

  const onClose = () => dispatch(closeCheckRulesetModal());

  const footerButtons = useMemo(
    () => [
      <div key="footer_buttons">
        <Button key="close" onClick={onClose}>
          Close
        </Button>
        {activating && (
          <Button
            key="activate"
            color="primary"
            onClick={() => dispatch(activateRuleset(selectedRuleset))}
          >
            Activate
          </Button>
        )}
      </div>,
    ],
    [activating]
  );

  const invalidIdList = [
    <div key="invalid_id_list">
      {activating && (
        <div className={styles.text}>
          Are you sure you want to activate this ruleset? This will deactivate
          the currently active ruleset. Activated ruleset may take up to 5
          minutes to apply.
        </div>
      )}
      {!failed && (
        <div>
          {invalidCurrencyIDs.length === 0 &&
          invalidItemIDs.length === 0 &&
          invalidProductIDs.length === 0 ? (
            'All IDs are valid for the current active store.'
          ) : (
            <div>
              <div className={styles.warning}>
                There are a number of invalid IDs in the current ruleset
              </div>
              <List>
                {Object.entries({
                  'Invalid currency IDs': invalidCurrencyIDs,
                  'Invalid item IDs': invalidItemIDs,
                  'Invalid product IDs': invalidProductIDs,
                }).map(
                  ([key, val]) =>
                    val.length > 0 && (
                      <ListItem key={`list_item_${key}`} disableGutters>
                        <ListItemText
                          primary={key}
                          secondary={val.join(', ')}
                        />
                        <Clipboard
                          component="span"
                          data-clipboard-text={val.join(', ')}
                        >
                          <Icon>save</Icon>
                        </Clipboard>
                      </ListItem>
                    )
                )}
              </List>
            </div>
          )}
        </div>
      )}
    </div>,
  ];

  return (
    <Dialog
      disableEnforceFocus
      title={
        activating ? 'Confirm Activation' : 'Check Ruleset Against Active Store'
      }
      actions={footerButtons}
      modal
      open={visible}
      onRequestClose={onClose}
      contentStyle={{ width: '450px', maxHeight: '350px', overflow: 'auto' }}
    >
      <div> {loading ? <LoadingComponent size={40} /> : invalidIdList} </div>
    </Dialog>
  );
};

export default CheckRulesetModal;
