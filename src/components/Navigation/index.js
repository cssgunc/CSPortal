import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut'
import { AuthUserContext } from '../Session';

function Navigation (props) {
  return (
    <AuthUserContext.Consumer>
      {authUser => 
      <div>
        {authUser ? <NavigationAuthYes /> : <NavigationAuthNo />}
      </div>}
    </AuthUserContext.Consumer>
  )
}

 
const NavigationAuthYes = () => (
  <div>
    <nav className="navbar is-outlined" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu is-active" style={{padding: '0'}}>
        <div className="navbar-start" style={{display: 'flex', alignItems: 'center'}}>
            <Link className="navbar-item" to={ROUTES.LANDING} style={{marginLeft: '10px'}}>Home</Link>
            <Link className="navbar-item" to={ROUTES.ACCOUNT}>Account</Link>
            <Link className="navbar-item" to={ROUTES.ADMIN}>Admin</Link>
            <div className="navbar-item">
              <SignOutButton />    
            </div>
        </div>
      </div>
    </nav>
  </div>
);

const NavigationAuthNo = () => (
  <div>
    <nav className="navbar is-outlined" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu is-active" style={{padding: '0'}}>
        <div className="navbar-start" style={{display: 'flex', alignItems: 'center'}}>
          <Link className="navbar-item" to={ROUTES.LANDING} style={{marginLeft: '10px'}}>Home</Link>
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-light" to={ROUTES.SIGN_IN}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Navigation;