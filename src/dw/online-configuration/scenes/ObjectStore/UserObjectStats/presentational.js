import React from 'react';
import PropTypes from 'prop-types';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { hasData } from 'dw/core/helpers/object';
import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';
import StatsTable from './components/StatsTable';
import {
  downloadRenderer,
  editStatisticsRenderer,
  otherStatisticsRenderer,
  playerIdRenderer,
  TagCellRenderer,
} from './cellRenderers';
import styles from './index.module.css';

function UserObjectStatsPresentational({
  statisticsValue,
  categoryValue,
  setCategoryValue,
  setStatisticsValue,
  onLoadData,
  formatDateTime,
  onSelectionChanged,
  selectedRow,
  deleteSelectedObject,
  currentTitle,
  currentEnv,
}) {
  const tableDefinitions = {
    components: {
      downloadRenderer,
      editStatisticsRenderer,
      otherStatisticsRenderer,
      playerIdRenderer,
      tagCellRenderer: TagCellRenderer,
    },
  };
  return (
    <>
      <div className={styles.headerContainer}>
        <AutocompleteGeneral
          classes={{ root: styles.dropdown }}
          name="categories"
          placeholder="Select Category"
          value={categoryValue}
          options={['CAP']}
          variant="contrast"
          onChange={val => setCategoryValue(val)}
        />
        <span className={styles.andText}>and</span>
        <AutocompleteGeneral
          classes={{ root: styles.dropdown }}
          name="statistics"
          value={statisticsValue}
          placeholder="Select Statistic"
          options={['Reports', 'Downloads', 'Popularity', 'Upvotes', 'Plays']}
          variant="contrast"
          onChange={val => setStatisticsValue(val)}
        />
        <div className={styles.iconContainer}>
          <ConfirmActionComponent
            component="IconButton"
            color="inherit"
            tooltipProps={
              hasData(selectedRow)
                ? {
                    title: 'Delete Selected',
                    placement: 'bottom',
                  }
                : null
            }
            onClick={deleteSelectedObject}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg:
                'Are you sure you want to delete the selected object?',
              mainButtonLabel: 'Delete',
              destructive: true,
              'data-cy': 'confirmDeleteButon',
            }}
            disabled={!hasData(selectedRow)}
            data-cy="deleteButton"
          >
            delete
          </ConfirmActionComponent>
        </div>
      </div>

      <StatsTable
        selectedRow={selectedRow}
        onSelectionChanged={onSelectionChanged}
        categoryValue={categoryValue}
        statisticsValue={statisticsValue}
        onLoadData={onLoadData}
        formatDateTime={formatDateTime}
        tableDefinitions={tableDefinitions}
        currentTitle={currentTitle}
        currentEnv={currentEnv}
      />
    </>
  );
}
UserObjectStatsPresentational.propTypes = {
  statisticsValue: PropTypes.string.isRequired,
  categoryValue: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  onSelectionChanged: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
  deleteSelectedObject: PropTypes.func.isRequired,
  currentTitle: PropTypes.object.isRequired,
  currentEnv: PropTypes.object.isRequired,
  setCategoryValue: PropTypes.func.isRequired,
  setStatisticsValue: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

export default UserObjectStatsPresentational;
