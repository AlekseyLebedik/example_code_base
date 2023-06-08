import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';
import Icon from '@material-ui/core/Icon';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';

import StatusTableField from 'abtesting/components/StatusTableField';
import ViewConfig from 'abtesting/scenes/ABTestForm/components/ViewConfig';
import ABTestViewLink from 'abtesting/components/ABTestViewLink';
import { COLUMN_DEFINITIONS } from 'abtesting/scenes/ABTestGroups/constants';

import styles from './index.module.css';

const nameRenderer = props => <ABTestViewLink test={props.data} />;
nameRenderer.propTypes = {
  data: PropTypes.object,
};
nameRenderer.defaultProps = {
  data: {},
};

const statusRenderer = ({ value }) => (
  <div className={styles.status}>
    <StatusTableField status={value} />
  </div>
);
statusRenderer.propTypes = {
  value: PropTypes.string,
};
statusRenderer.defaultProps = {
  value: '',
};

const configRenderer = ({ value }) => (
  <div className={styles.configContainer}>
    {value.map(
      config =>
        config && (
          <div className={styles.config} key={config.configID}>
            <ViewConfig config={config} configName={config.name} />
          </div>
        )
    )}
  </div>
);
configRenderer.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
};
configRenderer.defaultProps = {
  value: [],
};

const DetailCellRenderer = props => {
  const { cohorts } = props.data;
  return (
    <div className={styles.detailsRow}>
      <div className={styles.agGridContainerWithBorder}>
        <AgGridReact
          reactNext
          id="detailGrid"
          domLayout="autoHeight"
          components={{ configRenderer }}
          columnDefs={COLUMN_DEFINITIONS.detail}
          rowData={cohorts}
          suppressCellFocus
          suppressRowTransform
        />
      </div>
    </div>
  );
};

DetailCellRenderer.propTypes = {
  data: PropTypes.shape({ cohorts: PropTypes.arrayOf(PropTypes.object) }),
};
DetailCellRenderer.defaultProps = {
  data: {},
};

const ABTestsList = ({
  expanded,
  items,
  onGridReady,
  getRowHeight,
  onFilterChange,
  onFirstDataRendered,
}) => (
  <Accordion className={styles.expanderContainer} defaultExpanded={expanded}>
    <AccordionSummary
      expandIcon={<Icon>expand_more</Icon>}
      classes={{
        content: styles.titleContent,
        expandIcon: styles.expandIcon,
      }}
    >
      <div className={styles.primaryHeading}>Tests</div>
      <div className={styles.secondaryHeading}>
        {items.length > 0
          ? `${items.length} ${items.length === 1 ? 'Test' : 'Tests'}`
          : 'No Tests'}
      </div>
    </AccordionSummary>
    <AccordionDetails classes={{ root: styles.details }}>
      <div className={styles.container}>
        <TextField
          onChange={e => onFilterChange(e.target.value)}
          label="search tests"
          className={styles.partialSearch}
        />
        <div className={styles.agGridContainer}>
          <AgGridReact
            reactNext
            rowData={items}
            components={{
              nameRenderer,
              statusRenderer,
              configRenderer,
              DetailCellRenderer,
            }}
            columnDefs={COLUMN_DEFINITIONS.master}
            domLayout="autoHeight"
            masterDetail
            detailCellRenderer="DetailCellRenderer"
            onGridReady={onGridReady}
            getRowHeight={getRowHeight}
            onFirstDataRendered={onFirstDataRendered}
            groupDefaultExpanded={1}
            suppressCellFocus
            suppressMenuHide
            statusBar={{
              statusPanels: [
                {
                  statusPanel: 'agTotalRowCountComponent',
                  align: 'left',
                },
              ],
            }}
          />
        </div>
      </div>
    </AccordionDetails>
  </Accordion>
);

ABTestsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGridReady: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFirstDataRendered: PropTypes.func.isRequired,
  getRowHeight: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
};

ABTestsList.defaultProps = {
  expanded: true,
};

export default ABTestsList;
