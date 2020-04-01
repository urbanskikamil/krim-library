import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import asyncComponent from './AsyncComponent'

const AccountView = asyncComponent(() => import('./views/Account').then(module => module.default));
const SignUpView = asyncComponent(() => import('./views/SignUp').then(module => module.default));
const SignInView = asyncComponent(() => import('./views/SignIn').then(module => module.default));
const NotFoundView = asyncComponent(() => import('./views/NotFound').then(module => module.default));
const ThesisDocumentsView = asyncComponent(() => import('./views/ThesisDocuments').then(module => module.default));
const PublicationsView = asyncComponent(() => import('./views/Publications').then(module => module.default));
const StudentsDocumentsView = asyncComponent(() => import('./views/StudentsDocuments').then(module => module.default));
const DidacticsView = asyncComponent(() => import('./views/Didactics').then(module => module.default));
const ExternalView = asyncComponent(() => import('./views/External').then(module => module.default));
const AdminView = asyncComponent(() => import('./views/Admin').then(module => module.default));
const AccessView = asyncComponent(() => import('./views/Access').then(module => module.default));
// import {
//   Account as AccountView,
//   SignUp as SignUpView,
//   SignIn as SignInView,
//   NotFound as NotFoundView,
//   ThesisDocuments as ThesisDocumentsView,
//   Publications as PublicationsView,
//   StudentsDocuments as StudentsDocumentsView,
//   Didactics as DidacticsView,
//   External as ExternalView,
//   Admin as AdminView,
//   Access as AccessView
// } from './views';

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
//   const [authenticated, setAuthenticated] = useState(false)
//   // let routes = null
//   console.log('props',props)
//   useEffect(() => {
//     if (sessionStorage.getItem('session')) {
//       const auth = JSON.parse(sessionStorage.getItem('session')).isAuthorized
//       console.log(auth)
//       setAuthenticated(auth)
//     }
//   }, [])

//   return (
//   );
// };

export default withRouter(Routes)