import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const VariablesSetListItemStateless = props => {
  const { item, onClick, selectedListItem } = props;
  const isSelectedClass =
    selectedListItem && selectedListItem.variableSetId === item.variableSetId
      ? 'selected'
      : '';

  return (
    <div className={`list-item variables-set ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <div className="flex flex-wrap">
          <div className="flex-grow">
            Namespace: <strong>{item.namespace}</strong>
          </div>
          <div className="flex-grow">
            Context: <strong>{item.context}</strong>
          </div>
          <div>
            Group ID: <strong>{item.groupId}</strong>
          </div>
        </div>
      </Card>
    </div>
  );
};

VariablesSetListItemStateless.propTypes = {
  item: PropTypes.shape({
    variableSetId: PropTypes.string,
    namespace: PropTypes.string,
    context: PropTypes.string,
    groupId: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedListItem: PropTypes.shape({
    variableSetId: PropTypes.string,
    namespace: PropTypes.string,
    context: PropTypes.string,
    groupId: PropTypes.string,
  }),
};

VariablesSetListItemStateless.defaultProps = {
  selectedListItem: null,
};

export default VariablesSetListItemStateless;
