import React, { lazy, Suspense } from 'react';
import isEmpty from 'lodash/isEmpty';
import LoadingComponent from 'dw/core/components/Loading';
import { ConnectedActivityProvider, useActivityContext } from './context';

const Achievement = lazy(() => import('./components/AchievementDetails'));
const ClientCommand = lazy(() => import('./components/ClientCommandDetails'));
const MOTD = lazy(() => import('./components/MOTDdetails'));
const PubObjects = lazy(() => import('./components/PublisherObjectsDetails'));
const PubStorage = lazy(() => import('./components/PubStorageDetails'));
const PubVars = lazy(() => import('./components/PubVarsDetails'));
const PyScript = lazy(() => import('./components/PyScriptDetails'));
const DefaultDetails = lazy(() => import('./components/DefaultDetails'));
const Thunderpants = lazy(() => import('./components/ThunderpantsDetails'));
const GVS = lazy(() => import('./components/GVS'));

const ActivityDetails = () => {
  const context = useActivityContext();
  switch (context.selectedActivity.type) {
    case 'ae':
      return <Achievement {...context} />;
    case 'client_commands':
      return <ClientCommand {...context} />;
    case 'motd':
      return <MOTD {...context} />;
    case 'publisher_objects':
      return <PubObjects {...context} />;
    case 'pubstorage':
      return <PubStorage {...context} />;
    case 'pubvars':
      return <PubVars {...context} />;
    case 'pyscript':
      return <PyScript {...context} />;
    case 'tp_deployment':
      return <Thunderpants {...context} />;
    case 'gvs':
      return <GVS {...context} />;
    default: {
      return !isEmpty(context.selectedActivity) ? (
        <DefaultDetails
          key={context.selectedActivity.id}
          selectedActivity={context.selectedActivity}
        />
      ) : null;
    }
  }
};

export default props => (
  <ConnectedActivityProvider {...props}>
    <Suspense fallback={<LoadingComponent />}>
      <ActivityDetails />
    </Suspense>
  </ConnectedActivityProvider>
);
