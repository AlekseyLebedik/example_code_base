import React from 'react';

import UnitLayout from 'dw/core/components/UnitLayout';

import NavigationBar from '../NavigationBar';

export default function App() {
  return (
    <div>
      <UnitLayout NavbarComponent={NavigationBar}>
        <h1>Welcome to your new unit!</h1>

        {/*
        Here you are free to organize your unit the way you want.

        You need multiple routes?
          <Switch>
            <Route path={`{match.path}/route-1`} render={() => <h2>Route 1</h2>} />
            <Route path={`{match.path}/route-2`} render={() => <h2>Route 2</h2>} />
          </Switch>

        Tips: prefix every route with match.path to have a relative route. You will need to
        connect this components with `withRouter` to have access to the `match` props

        You need something more dynamic? You can build a route-helpers like we do
        in Online Configuration.

        You only have one route? Take a look at the Reporting Unit, where we only
        have one scene.
        */}
      </UnitLayout>
    </div>
  );
}
