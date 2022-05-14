import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Delivery from '~/pages/Delivery';
import DeliveryForm from '~/pages/Delivery/Form';
import Deliverymen from '~/pages/Deliverymen';
import DeliverymenForm from '~/pages/Deliverymen/Form';
import Problems from '~/pages/Problems';
import Recipients from '~/pages/Recipients';
import RecipientsForm from '~/pages/Recipients/Form';
import SingIn from '~/pages/SingIn';
import { PrivateRoute, SignInRoute } from '~/routes/PrivateRoute';

export default function Routes() {
  return (
    <Switch>
      <Route
        path="/"
        element={
          <SignInRoute>
            <SingIn />
          </SignInRoute>
        }
      />
      <Route
        path="/deliveries"
        element={
          <PrivateRoute>
            <Delivery />
          </PrivateRoute>
        }
      />
      <Route
        path="/delivery"
        element={
          <PrivateRoute>
            <DeliveryForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/delivery/:id"
        element={
          <PrivateRoute>
            <DeliveryForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/deliverymen"
        element={
          <PrivateRoute>
            <Deliverymen />
          </PrivateRoute>
        }
      />
      <Route
        path="/deliveryman"
        element={
          <PrivateRoute>
            <DeliverymenForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/deliveryman/:id"
        element={
          <PrivateRoute>
            <DeliverymenForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/recipients"
        element={
          <PrivateRoute>
            <Recipients />
          </PrivateRoute>
        }
      />
      <Route
        path="/recipient"
        element={
          <PrivateRoute>
            <RecipientsForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/recipient/:id"
        element={
          <PrivateRoute>
            <RecipientsForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/deliveries/problems"
        element={
          <PrivateRoute>
            <Problems />
          </PrivateRoute>
        }
      />
    </Switch>
  );
}
