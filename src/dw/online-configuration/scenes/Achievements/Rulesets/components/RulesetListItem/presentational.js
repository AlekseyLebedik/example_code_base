import React from 'react';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

import styles from './presentational.module.css';

const muiStyles = theme => {
  const themeColor = theme.palette.common.white;
  return {
    root: {
      padding: 0,
      background: '#f5f5f6',
      borderBottom: `1px solid ${themeColor}`,
      '&:hover': {
        background: `${themeColor}`,
      },
    },
  };
};

const RulesetListItemBase = props => {
  const { item, onClick, selectedRuleset, renderCheckbox } = props;
  const { label, lastUpdateTimestamp, codeSignatureTimestamp, isActive } = item;
  const isSelected = selectedRuleset && selectedRuleset.label === label;
  const isSelectedClass = isSelected ? styles.selected : '';
  const checkboxStyleClass = isSelected
    ? `${styles.checkboxSelected} ${styles.checkboxNormal}`
    : styles.checkboxNormal;
  const [statusLabel, statusClassName] = (isActive && [
    'Active',
    `${styles.Active}`,
  ]) ||
    (codeSignatureTimestamp !== null && [
      'Validated',
      `${styles.Validated}`,
    ]) || ['Uploaded', `${styles.Uploaded}`];
  const validatedLabel = label.length > 80 ? `${label.slice(0, 80)}...` : label;
  return (
    <ListItem
      onClick={onClick}
      className={`${isSelectedClass} ${props.classes.root}`}
      selected={isSelected}
      disableGutters
    >
      <div
        className={`${styles.gridContainer} common__searchable-list ${isSelectedClass}`}
      >
        <div className={styles.checkbox}>
          {renderCheckbox && renderCheckbox(item, checkboxStyleClass)}
        </div>
        <div className={`${styles.label}`} data-cy="rulesetName">
          {validatedLabel}
        </div>
        <div className={`${styles.status}`}>
          <div className={statusClassName}>{statusLabel}</div>
          <div>{lastUpdateTimestamp}</div>
        </div>
      </div>
    </ListItem>
  );
};

RulesetListItemBase.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    lastUpdateTimestamp: PropTypes.string,
    codeSignatureTimestamp: PropTypes.string,
    isActive: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedRuleset: PropTypes.object,
  classes: PropTypes.object.isRequired,
  renderCheckbox: PropTypes.func,
};

RulesetListItemBase.defaultProps = {
  selectedRuleset: null,
  renderCheckbox: null,
};

const RulesetListItem = withStyles(muiStyles, {
  withTheme: true,
})(({ value, onBlur, ...props }) => <RulesetListItemBase {...props} />);

RulesetListItem.displayName = 'RulesetListItem';
RulesetListItem.propTypes = omit(RulesetListItem.propTypes, [
  'theme',
  'classes',
]);
RulesetListItem.defaultProps = omit(RulesetListItem.defaultProps, [
  'theme',
  'classes',
]);

export default RulesetListItem;
