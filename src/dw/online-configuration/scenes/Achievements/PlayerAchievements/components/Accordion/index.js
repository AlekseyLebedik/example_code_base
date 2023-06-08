import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Icon from '@material-ui/core/Icon';

import styles from './index.module.css';

const Accordion = ({
  summary,
  children,
  action,
  expanded,
  onChange,
  defaultExpanded,
}) => (
  <MuiAccordion
    expanded={expanded}
    onChange={onChange}
    defaultExpanded={defaultExpanded}
  >
    <AccordionSummary
      expandIcon={<Icon>expand_more</Icon>}
      classes={{
        expanded: styles.summaryExpanded,
        content: styles.summaryContent,
      }}
    >
      <strong>{summary}</strong>
    </AccordionSummary>
    <AccordionDetails classes={{ root: styles.detailsRoot }}>
      {children}
    </AccordionDetails>
    {action && (
      <AccordionActions>
        <Button
          size="small"
          color="primary"
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.label}
        </Button>
      </AccordionActions>
    )}
  </MuiAccordion>
);

Accordion.propTypes = {
  summary: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  action: PropTypes.object,
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  onChange: PropTypes.func,
};

Accordion.defaultProps = {
  action: undefined,
  defaultExpanded: false,
  expanded: undefined,
  onChange: undefined,
};

export default Accordion;
