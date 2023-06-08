import React from 'react';
import PropTypes from 'prop-types';
import Table from 'dw/core/components/TableHydrated';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import { SECURITY_REVERT_ACL_CHANGES } from '@demonware/devzone-core/access/PermissionCheck/permissions';

import { COLUMNS } from './constants';

const RevisionHistoryStatelessComponent = ({ revisions, revertRevision }) => {
  const hasRevertPermission = useCurrentEnvPermission(
    SECURITY_REVERT_ACL_CHANGES
  );
  const empty = <div className="empty">No data to display</div>;

  const columns = [...COLUMNS];
  if (hasRevertPermission) {
    const revertColumn = {
      title: 'Revert',
      noSorting: true,
      noFiltering: true,
      render: (text, record) => (
        <ConfirmActionComponent
          component="IconButton"
          tooltip="Revert change"
          tooltipPosition="bottom"
          onClick={() => revertRevision(record.revision)}
          confirm={{
            confirmMsg: 'Are you sure you want to revert this change?',
            title: 'Confirm Revert',
            mainButtonLabel: 'Revert',
          }}
        >
          undo
        </ConfirmActionComponent>
      ),
      width: '10%',
    };
    columns.push(revertColumn);
  }

  const renderTable = () => <Table data={revisions} columns={columns} />;

  return (
    <section className="main-container revisions flex-rows-container">
      <div className="scrollable-content with-inner-padding">
        {revisions.length !== 0 ? renderTable() : empty}
      </div>
    </section>
  );
};

RevisionHistoryStatelessComponent.propTypes = {
  revisions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  revertRevision: PropTypes.func.isRequired,
};

export default RevisionHistoryStatelessComponent;
