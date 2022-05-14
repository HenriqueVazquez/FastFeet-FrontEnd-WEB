/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';
import { store } from '~/store';

export function PrivateRoute({ children }) {
  const { signed } = store.getState().auth;

  return signed ? (
    <DefaultLayout>{children}</DefaultLayout>
  ) : (
    <AuthLayout>
      <Navigate to="/" />
    </AuthLayout>
  );
}

export function SignInRoute({ children }) {
  const { signed } = store.getState().auth;

  return signed ? (
    <AuthLayout>
      <Navigate to="/deliveries" />
    </AuthLayout>
  ) : (
    <AuthLayout>{children}</AuthLayout>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

SignInRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
