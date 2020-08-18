import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Directory from '../Directory';
import Refer from '../Refer';
import Resources from '../Resources';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

function App(props) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const handle = props.firebase.auth.onAuthStateChanged((auth) =>
      auth ? setAuthUser(auth) : setAuthUser(null),
    );

    return function cleanup() {
      handle();
    };
  });

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <Navigation />
        <div className="App">
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.DIRECTORY} component={Directory} />
          <Route path={ROUTES.RESOURCES} component={Resources} />
          <Route path={ROUTES.REFER} component={Refer} />
        </div>
      </Router>
    </AuthUserContext.Provider>
  );
}

export default withFirebase(App);
