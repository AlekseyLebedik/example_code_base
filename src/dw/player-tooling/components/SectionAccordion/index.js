import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    boxShadow: 'none',
    margin: 0,
    '&::before': {
      height: 0,
    },
  },
  summary: {
    minHeight: '30px !important',
    height: 30,
  },
  summaryContent: {
    margin: '0 !important',
  },
  expandIcon: {
    padding: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  details: {
    padding: '0 16px',
    width: '100%',
  },
}));

function isInViewport(element) {
  const parent = element.parentElement.getBoundingClientRect();
  const el = element.getBoundingClientRect();
  const diff = el.top - parent.top;
  return diff < 300 && diff >= 0;
}

export default function SectionAccordion({
  children,
  expandAll,
  id,
  scrollPosition,
  setHighlightedOption,
  title,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(expandAll);
  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll]);

  useEffect(() => {
    const element = document.getElementById(id);
    if (element && isInViewport(element)) {
      setHighlightedOption(id);
    }
  }, [id, scrollPosition, setHighlightedOption]);

  return (
    <>
      <Accordion
        className={classes.root}
        defaultExpanded
        expanded={expanded}
        id={id}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          classes={{
            root: classes.summary,
            content: classes.summaryContent,
            expandIcon: classes.expandIcon,
          }}
          expandIcon={<Icon>expand_more</Icon>}
        >
          <Typography className={classes.heading}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {children}
        </AccordionDetails>
      </Accordion>
      <Divider />
    </>
  );
}

SectionAccordion.propTypes = {
  children: PropTypes.element.isRequired,
  expandAll: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  scrollPosition: PropTypes.number.isRequired,
  setHighlightedOption: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
