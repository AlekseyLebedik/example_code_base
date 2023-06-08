import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { Table } from 'antd';

import './index.css';

const TooltipWithTable = props => {
  const { label, elements, columns } = props;

  const tooltipTable = (
    <Table
      className="tooltip-table"
      columns={columns}
      dataSource={elements}
      size="small"
      fontSize="small"
      pagination={false}
    />
  );

  return (
    <div className="tooltip-with-table__main-container">
      <Tooltip
        classes={{
          tooltip: 'tooltip-with-table__tooltip',
        }}
        title={tooltipTable}
      >
        <span className="tooltip-with-table__label">{label}</span>
      </Tooltip>
    </div>
  );
};

TooltipWithTable.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
};

export default TooltipWithTable;
