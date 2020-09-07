import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import colors from '../../constants/RTCColors';

function Navigation() {
  const authUser = useContext(AuthUserContext);
  return <div>{authUser ? <NavigationAuthYes /> : <NavigationAuthNo />}</div>;
}

const styles = {
  bar: {
    backgroundColor: colors.black,
  },
  menu: {
    padding: '0',
  },
  start: {
    display: 'flex',
    alignItems: 'center',
  },
  first: {
    marginLeft: '10px',
  },
  lightButton: {
    backgroundColor: colors.lightBlue,
    color: colors.white,
  },
};

const NavigationAuthYes = () => {
  return (
    <div>
      <nav
        className="navbar is-outlined"
        role="navigation"
        aria-label="main navigation"
        style={styles.bar}
      >
        <div id="navbar" className="navbar-menu is-active" style={styles.menu}>
          <div className="navbar-start" style={styles.start}>
            <Link
              className="navbar-item"
              to={ROUTES.LANDING}
              style={styles.first}
            >
              Home
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-item" to={ROUTES.LANDING}>
                About Us
              </Link>
              <div className="navbar-dropdown" style={styles.bar}>
                <Link className="navbar-item" to={ROUTES.MEETTHETEAM}>
                  Meet the Team
                </Link>
                <Link className="navbar-item" to={ROUTES.COMPANYPARTNERS}>
                  Company Partners
                </Link>
                <Link className="navbar-item" to={ROUTES.FELLOWSHIPGUIDE}>
                  Fellowship
                </Link>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-item" to={ROUTES.RESOURCES}>
                Resources
              </Link>
              <div className="navbar-dropdown" style={styles.bar}>
                <Link className="navbar-item" to={ROUTES.OPPORTUNITIES}>
                  Opportunities
                </Link>
                <Link className="navbar-item" to={ROUTES.WEBINARS}>
                  Webinars
                </Link>
                <Link className="navbar-item" to={ROUTES.EVENTS}>
                  Events
                </Link>
                <Link className="navbar-item" to={ROUTES.COMMUNITIES}>
                  Communities
                </Link>
                <Link className="navbar-item" to={ROUTES.MENTORSHIP}>
                  Mentorship
                </Link>
                <hr className="navbar-divider" />
                <Link className="navbar-item" to={ROUTES.CONTACTUS}>
                  Contact Us
                </Link>
              </div>
            </div>
            <Link className="navbar-item" to={ROUTES.DIRECTORY}>
              Directory
            </Link>
            <Link className="navbar-item" to={ROUTES.ACCOUNT}>
              Account
            </Link>
            <Link className="navbar-item" to={ROUTES.ADMIN}>
              Admin
            </Link>
          </div>
          <div className="navbar-end">
            <Link className="navbar-item" to={ROUTES.REFER}>
              <div className="buttons">
                <button
                  className="button is-light"
                  style={styles.lightButton}
                  type="button"
                >
                  Refer
                </button>
              </div>
            </Link>
            <div className="navbar-item">
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const NavigationAuthNo = () => {
  return (
    <div>
      <nav
        className="navbar is-outlined"
        role="navigation"
        aria-label="main navigation"
        style={styles.bar}
      >
        <div
          id="navbarBasicExample"
          className="navbar-menu is-active"
          style={styles.menu}
        >
          <div className="navbar-start" style={styles.start}>
            <Link
              className="navbar-item"
              to={ROUTES.LANDING}
              style={styles.first}
            >
              Home
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-light" to={ROUTES.SIGN_IN}>
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
