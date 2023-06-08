import React from 'react';
import Badge from '../../../../components/Badge';

export default props => {
  const badge = props.value;
  return badge && badge.length !== 0
    ? badge.map(v => (
        <Badge key={v} color="basic">
          {v}
        </Badge>
      ))
    : 'None';
};
