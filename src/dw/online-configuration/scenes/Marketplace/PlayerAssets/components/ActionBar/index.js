/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import { generatePath, Link, withRouter } from 'react-router-dom';
import get from 'lodash/get';
import { useIsClanInventory } from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/hooks';
import { useStyles } from '../../styles';

import styles from './index.module.css';

const PlayerHeading = ({ isClan }) => (isClan ? 'Clan: ' : 'Player: ');

const ActionBar = ({
  label,
  actions,
  match,
  inventoryContext,
  checked,
  handleChecked,
  invalidItems,
  ActionButtonComponent,
  actionButtonComponentProps,
}) => {
  const isClan = useIsClanInventory();
  const link = useMemo(() => {
    if (!label || label === '') {
      return '#';
    }

    if (inventoryContext === 'player' && !isClan) {
      return generatePath('/online-configuration/:titleId/:env/accounts/:id?', {
        ...match.params,
        id: label,
      });
    }
    if (inventoryContext === 'store') {
      return generatePath(
        '/online-configuration/:titleId/:env/marketplace/stores/:id?',
        { ...match.params, id: label }
      );
    }
    return null;
  }, [label, get(match, 'params.titleId'), get(match, 'params.env')]);

  const classes = useStyles();
  return (
    <div className={styles.actions}>
      {ActionButtonComponent && (
        <ActionButtonComponent {...actionButtonComponentProps} />
      )}
      <div className={styles.label}>
        {inventoryContext === 'player' ? (
          <PlayerHeading isClan={isClan} />
        ) : (
          'Store: '
        )}
        <Link to={link}>{label}</Link>
      </div>
      {inventoryContext === 'player' && invalidItems?.length > 1 && (
        <Tooltip title="Show player items not in the current store">
          <span>
            <label id="checkbox">Show Orphaned Items</label>
            <Checkbox
              id="checkbox"
              checked={checked}
              onChange={handleChecked}
              name="orphaneditemscheckbox"
              classes={{ root: classes.rootCheckbox }}
            />
          </span>
        </Tooltip>
      )}
      {actions && actions}
    </div>
  );
};

ActionBar.propTypes = {
  ActionButtonComponent: PropTypes.object,
  actionButtonComponentProps: PropTypes.object,
  actions: PropTypes.node,
  checked: PropTypes.bool,
  handleChecked: PropTypes.func,
  invalidItems: PropTypes.arrayOf(PropTypes.object),
  inventoryContext: PropTypes.string,
  label: PropTypes.string,
  match: PropTypes.object,
};

ActionBar.defaultProps = {
  ActionButtonComponent: undefined,
  actionButtonComponentProps: undefined,
  actions: null,
  checked: false,
  invalidItems: [],
  inventoryContext: 'player',
  label: '',
  match: {},
  handleChecked: undefined,
};

export default withRouter(ActionBar);
