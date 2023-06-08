import React from 'react';
import { Link } from 'react-router-dom';
import StatusTableField from '../StatusTableField';
import { ActionsPanelBase as ActionsPanel } from '../ActionsPanel';

export const testNameRenderer = params => (
  <Link
    to={`/abtesting/view/${params?.data?.titleID}/${params?.data?.environment}/${params?.data?.id}`}
  >
    {params?.data?.name}
  </Link>
);

export const statusTableFieldRenderer = ({ value }) => (
  <StatusTableField status={value} />
);

export const actionsRenderer = params => {
  if (!params.node.group) {
    return <ActionsPanel record={params.data} events={params.context.events} />;
  }
  return '';
};
