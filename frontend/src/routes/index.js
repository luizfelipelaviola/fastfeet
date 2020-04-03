import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import NewDelivery from '~/pages/NewDelivery';
import EditDelivery from '~/pages/EditDelivery';

import Deliverymans from '~/pages/Deliverymans';
import NewDeliveryman from '~/pages/NewDeliveryman';
import EditDeliveryman from '~/pages/EditDeliveryman';

import Recipients from '~/pages/Recipients';
import NewRecipient from '~/pages/NewRecipient';
import EditRecipient from '~/pages/EditRecipient';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route path="/deliveries/new" exact component={NewDelivery} isPrivate />
      <Route
        path="/deliveries/:id/edit"
        exact
        component={EditDelivery}
        isPrivate
      />

      <Route path="/deliverymans" exact component={Deliverymans} isPrivate />
      <Route
        path="/deliverymans/new"
        exact
        component={NewDeliveryman}
        isPrivate
      />
      <Route
        path="/deliverymans/:id/edit"
        exact
        component={EditDeliveryman}
        isPrivate
      />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/new" exact component={NewRecipient} isPrivate />
      <Route
        path="/recipients/:id/edit"
        exact
        component={EditRecipient}
        isPrivate
      />

      <Route path="/problems" exact component={Problems} isPrivate />
    </Switch>
  );
}
