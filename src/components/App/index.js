import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
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
import Opportunities from '../Opportunities';
import Webinars from '../Webinars';
import Events from '../Events';
import CompanyPartners from '../CompanyPartners';
import ContactUs from '../ContactUs';
import Communities from '../Communities';
import MeetTheTeam from '../MeetTheTeam';
import Mentorship from '../Mentorship';
import FellowshipGuide from '../FellowshipGuide';
import VerifyPage from '../Verify';
import Footer from '../Footer';

function App(props) {
  const [authUser, setAuthUser] = useState(null);
  const [small, setSmall] = useState(window.innerWidth < 500);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setSmall(window.innerWidth < 500);
    };

    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  useEffect(() => {
    const handle = props.firebase.auth.onAuthStateChanged((auth) =>
      auth ? setAuthUser(auth) : setAuthUser(null),
    );

    return function cleanup() {
      handle();
    };
  });

  const styles = {
    app: {
      textAlign: 'left',
      paddingBottom: small ? '125px' : '75px',
    },
  };

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <Navigation />
        <div className="App" style={styles.app}>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.VERIFY} component={VerifyPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.DIRECTORY} component={Directory} />
          <Route path={ROUTES.RESOURCES} component={Resources} />
          <Route path={ROUTES.REFER} component={Refer} />
          <Route path={ROUTES.OPPORTUNITIES} component={Opportunities} />
          <Route path={ROUTES.WEBINARS} component={Webinars} />
          <Route path={ROUTES.EVENTS} component={Events} />
          <Route path={ROUTES.COMPANYPARTNERS} component={CompanyPartners} />
          <Route path={ROUTES.CONTACTUS} component={ContactUs} />
          <Route path={ROUTES.COMMUNITIES} component={Communities} />
          <Route path={ROUTES.MEETTHETEAM} component={MeetTheTeam} />
          <Route path={ROUTES.MENTORSHIP} component={Mentorship} />
          <Route path={ROUTES.FELLOWSHIPGUIDE} component={FellowshipGuide} />
        </div>
        <Footer />
      </Router>
    </AuthUserContext.Provider>
  );
}

export default withFirebase(App);
