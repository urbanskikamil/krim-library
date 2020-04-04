import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  ThesisDocuments as ThesisDocumentsView,
  Publications as PublicationsView,
  StudentsDocuments as StudentsDocumentsView,
  Didactics as DidacticsView,
  External as ExternalView,
  Admin as AdminView,
  Access as AccessView
} from './views';

class Routes extends Component {
  state = {
    authenticated: false,
    user: null
  }

  render() {
    const session = JSON.parse(sessionStorage.getItem('session'))
    let redirect = null

    if (session) {
      if (session.isAuthorized) {
        redirect = null
      }
    }
    else {
      redirect = <Redirect to="/sign-in"/>;
    }

    return (
      <Switch>
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
      {redirect}
      <Redirect
        exact
        from="/"
        to="/documents/thesis"
      />
      <RouteWithLayout
        component={ThesisDocumentsView}
        exact
        layout={MainLayout}
        path="/documents/thesis"
      />
      <RouteWithLayout
        component={StudentsDocumentsView}
        exact
        layout={MainLayout}
        path="/documents/students"
      />
      <RouteWithLayout
        component={PublicationsView}
        exact
        layout={MainLayout}
        path="/documents/publications"
      />
      <RouteWithLayout
        component={DidacticsView}
        exact
        layout={MainLayout}
        path="/documents/didactics"
      />      
      <RouteWithLayout
        component={ExternalView}
        exact
        layout={MainLayout}
        path="/documents/external"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={AdminView}
        exact
        layout={MainLayout}
        path="/admin"
      />
      <RouteWithLayout
        component={AccessView}
        exact
        layout={MainLayout}
        path="/access"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
    )
  }
}

export default withRouter(Routes)