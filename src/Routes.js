import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

//import ThesisDocuments from './views/ThesisDocuments/ThesisDocuments'
import ExternalDocuments from './views/ExternalDocuments/ExternalDocuments'
import StudentsDocuments from './views/StudentsDocuments/StudentsDocuments'


import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  ThesisDocuments as ThesisDocumentsView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/documents/thesis"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboardd"
      />
      <RouteWithLayout
        component={ThesisDocumentsView}
        exact
        layout={MainLayout}
        path="/documents/thesis"
      />
      <RouteWithLayout
        component={StudentsDocuments}
        exact
        layout={MainLayout}
        path="/students"
      />
      {/* <RouteWithLayout
        component={WorkersDocuments}
        exact
        layout={MainLayout}
        path="/internal"
      /> */}
      <RouteWithLayout
        component={ExternalDocuments}
        exact
        layout={MainLayout}
        path="/external"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
