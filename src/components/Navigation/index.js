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

const NavigationAuthYes = () => (
  <div>
    <nav
      className="navbar is-outlined"
      role="navigation"
      aria-label="main navigation"
      style={{ backgroundColor: colors.black }}
    >
      <div
        id="navbar"
        className="navbar-menu is-active"
        style={{ padding: '0' }}
      >
        <div
          className="navbar-start"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Link
            className="navbar-item"
            to={ROUTES.LANDING}
            style={{ marginLeft: '10px' }}
          >
            Home
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-item" to={ROUTES.LANDING}>
              About Us
            </Link>
            <div
              className="navbar-dropdown"
              style={{ backgroundColor: colors.black }}
            >
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
            <div
              className="navbar-dropdown"
              style={{ backgroundColor: colors.black }}
            >
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
                style={{
                  backgroundColor: colors.lightBlue,
                  color: colors.white,
                }}
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

const NavigationAuthNo = () => (
  <div>
    <nav
      className="navbar is-outlined"
      role="navigation"
      aria-label="main navigation"
      style={{ backgroundColor: colors.black }}
    >
      <div
        id="navbarBasicExample"
        className="navbar-menu is-active"
        style={{ padding: '0' }}
      >
        <div
          className="navbar-start"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Link
            className="navbar-item"
            to={ROUTES.LANDING}
            style={{ marginLeft: '10px' }}
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

export default Navigation;
