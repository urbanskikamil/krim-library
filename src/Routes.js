import React, { useState, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';

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

const Routes = () => {
  // const [authenticated, setAuthenticated] = useState(false)
  // let routes = null
  // useEffect(() => {
  //   if (sessionStorage.getItem('session')) {
  //     const auth = JSON.parse(sessionStorage.getItem('session')).isAuthorized
  //     console.log(auth)
  //     setAuthenticated(auth)
  //   }
  // }, [authenticated])


  // console.log('authenticated',authenticated)

  // if (authenticated) {
  //   routes = (
  //     <React.Fragment>
  //       <Redirect
  //         exact
  //         from="/"
  //         to="/documents/thesis"
  //       />
  //       <RouteWithLayout
  //         component={ThesisDocumentsView}
  //         exact
  //         layout={MainLayout}
  //         path="/documents/thesis"
  //       />
  //       <RouteWithLayout
  //         component={StudentsDocumentsView}
  //         exact
  //         layout={MainLayout}
  //         path="/documents/students"
  //       />
  //       <RouteWithLayout
  //         component={PublicationsView}
  //         exact
  //         layout={MainLayout}
  //         path="/documents/publications"
  //       />
  //       <RouteWithLayout
  //         component={DidacticsView}
  //         exact
  //         layout={MainLayout}
  //         path="/documents/didactics"
  //       />      
  //       <RouteWithLayout
  //         component={ExternalView}
  //         exact
  //         layout={MainLayout}
  //         path="/documents/external"
  //       />
  //       <RouteWithLayout
  //         component={AccountView}
  //         exact
  //         layout={MainLayout}
  //         path="/account"
  //       />
  //       <RouteWithLayout
  //         component={AdminView}
  //         exact
  //         layout={MainLayout}
  //         path="/admin"
  //       />
  //       <RouteWithLayout
  //         component={AccessView}
  //         exact
  //         layout={MainLayout}
  //         path="/access"
  //       />
  //       <RouteWithLayout
  //         component={SignUpView}
  //         exact
  //         layout={MinimalLayout}
  //         path="/sign-up"
  //       />
  //       <RouteWithLayout
  //         component={SignInView}
  //         exact
  //         layout={MinimalLayout}
  //         path="/sign-in"
  //       />
  //       <RouteWithLayout
  //         component={NotFoundView}
  //         exact
  //         layout={MinimalLayout}
  //         path="/not-found"
  //       />
  //       <Redirect to="/not-found" />
  //     </React.Fragment>
  //   )
  // }
  // else {
  //   routes = (
  //     <React.Fragment>
  //       <RouteWithLayout
  //         component={SignUpView}
  //         exact
  //         layout={MinimalLayout}
  //         path="/sign-up"
  //       />
  //       <RouteWithLayout
  //         component={SignInView}
  //         exact
  //         layout={MinimalLayout}
  //         path="/sign-in"
  //       />
  //       <Redirect to="/sign-in" />
  //     </React.Fragment>
  //   )
  // }

  return (
    <Switch>
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
