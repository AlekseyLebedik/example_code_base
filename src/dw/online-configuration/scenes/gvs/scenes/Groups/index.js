import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AsyncComponent from 'dw/core/components/AsyncComponent';
import { GroupsOverridesComponent } from 'dw/online-configuration/scenes/ObjectStore/ObjectGroups/components/Details/components/OverridesList';
import OverridesComponent from './components/VariablesOverrides';

import { gvsUrlPattern } from '../../constants';

const AsyncObjectGroupsPage = AsyncComponent(() =>
  import('dw/online-configuration/scenes/ObjectStore/ObjectGroups')
);

const GroupsComponent = props => (
  <GroupsOverridesComponent.Provider value={OverridesComponent}>
    <AsyncObjectGroupsPage {...props} />
  </GroupsOverridesComponent.Provider>
);

const Groups = () => (
  <Switch>
    <Route path={`${gvsUrlPattern}/:id?`} component={GroupsComponent} />
  </Switch>
);
export default Groups;
