import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import ProfileIcon from '../ProfileIcon';
import colors from '../../constants/RTCColors';
import logo from '../../constants/RTC_Color_Logo.png';

function Navigation() {
  const authUser = useContext(AuthUserContext);
  return <div>{authUser ? <NavigationAuthYes /> : <NavigationAuthNo />}</div>;
}

const styles = {
  bar: {
    backgroundColor: colors.black,
    height: '75px',
    paddingLeft: '20px',
  },
  barMobile: {
    height: '100%',
  },
  burger: {
    height: '100%',
    color: colors.white,
    backgroundColor: colors.black,
    border: 'none',
  },
  burgerLine: {
    width: '20px',
  },
  button: {
    marginBottom: 0,
  },
  dropdown: {
    backgroundColor: colors.black,
  },
  menu: {
    padding: '0px 13px 0px 13px',
    backgroundColor: colors.black,
  },
  center: {
    alignItems: 'center',
  },
  lightButton: {
    backgroundColor: colors.lightBlue,
    color: colors.white,
  },
  profileIcon: {
    alignItems: 'center',
    border: 'none',
  },
  signInBar: {
    width: '100%',
  },
  signInContainer: {
    marginLeft: 'auto',
    height: '100%',
  },
  signInButton: {
    backgroundColor: colors.green,
    color: colors.white,
  },
};

const NavigationAuthYes = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const closeMenu = () => setOpenMenu(false);
  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <div>
      <nav
        className="navbar is-outlined"
        role="navigation"
        aria-label="main navigation"
        style={styles.bar}
      >
        <div className="navbar-brand" style={styles.barMobile}>
          <Link className="navbar-item" to={ROUTES.LANDING}>
            <img src={logo} alt="Rewriting the Code Portal Home" />
          </Link>
          <button
            className={`navbar-burger ${openMenu ? 'is-active' : ''}`}
            type="button"
            style={styles.burger}
            onClick={toggleMenu}
            tabIndex={0}
          >
            <span aria-hidden="true" style={styles.burgerLine} />
            <span aria-hidden="true" style={styles.burgerLine} />
            <span aria-hidden="true" style={styles.burgerLine} />
          </button>
        </div>
        <div
          id="navbarMenu"
          className={`navbar-menu ${openMenu ? 'is-active' : ''}`}
          style={styles.menu}
        >
          <div className="navbar-start" style={styles.center}>
            <Link
              className="navbar-item"
              to={ROUTES.LANDING}
              onClick={closeMenu}
            >
              Home
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link
                className="navbar-item"
                to={ROUTES.LANDING}
                onClick={closeMenu}
              >
                About Us
              </Link>
              <div className="navbar-dropdown" style={styles.dropdown}>
                <Link
                  className="navbar-item"
                  to={ROUTES.MEETTHETEAM}
                  onClick={closeMenu}
                >
                  Meet the Team
                </Link>
                <Link
                  className="navbar-item"
                  to={ROUTES.COMPANYPARTNERS}
                  onClick={closeMenu}
                >
                  Company Partners
                </Link>
                <Link
                  className="navbar-item"
                  to={ROUTES.FELLOWSHIPGUIDE}
                  onClick={closeMenu}
                >
                  Fellowship
                </Link>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link
                className="navbar-item"
                to={ROUTES.RESOURCES}
                onClick={closeMenu}
              >
                Resources
              </Link>
              <div className="navbar-dropdown" style={styles.dropdown}>
                <Link
                  className="navbar-item"
                  to={ROUTES.OPPORTUNITIES}
                  onClick={closeMenu}
                >
                  Opportunities
                </Link>
                <Link
                  className="navbar-item"
                  to={ROUTES.WEBINARS}
                  onClick={closeMenu}
                >
                  Webinars
                </Link>
                <Link
                  className="navbar-item"
                  to={ROUTES.EVENTS}
                  onClick={closeMenu}
                >
                  Events
                </Link>
                <Link
                  className="navbar-item"
                  to={ROUTES.COMMUNITIES}
                  onClick={closeMenu}
                >
                  Communities
                </Link>
                <Link
                  className="navbar-item"
                  to={ROUTES.MENTORSHIP}
                  onClick={closeMenu}
                >
                  Mentorship
                </Link>
                <hr className="navbar-divider" />
                <Link
                  className="navbar-item"
                  to={ROUTES.CONTACTUS}
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <Link
              className="navbar-item"
              to={ROUTES.DIRECTORY}
              onClick={closeMenu}
            >
              Directory
            </Link>
            <Link
              className="navbar-item is-hidden-desktop"
              to={ROUTES.ACCOUNT}
              onClick={closeMenu}
            >
              Account
            </Link>
            {/* <Link className="navbar-item" to={ROUTES.ADMIN} onClick={closeMenu}>
              Admin
            </Link> */}
          </div>
          <div className="navbar-end is-active" style={styles.center}>
            <div className="buttons" style={styles.button}>
              <Link
                className="navbar-item"
                to={ROUTES.REFER}
                onClick={closeMenu}
              >
                <button
                  className="button is-light"
                  style={{ ...styles.lightButton, ...styles.button }}
                  type="button"
                >
                  Refer
                </button>
              </Link>
              <div className="navbar-item is-hidden-desktop">
                <SignOutButton />
              </div>
            </div>
            <button
              className="navbar-item has-dropdown is-hoverable"
              style={styles.profileIcon}
              type="button"
            >
              <ProfileIcon />
              <div
                className="navbar-dropdown is-right is-hidden-touch"
                style={styles.dropdown}
              >
                <Link
                  className="navbar-item"
                  to={ROUTES.ACCOUNT}
                  onClick={closeMenu}
                >
                  Account
                </Link>
                <div className="navbar-item">
                  <SignOutButton />
                </div>
              </div>
            </button>
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
          className="navbar-brand"
          style={{ ...styles.barMobile, ...styles.signInBar }}
        >
          <Link className="navbar-item" to={ROUTES.LANDING}>
            <img src={logo} alt="Rewriting the Code Portal Home" />
          </Link>
          <div className="navbar-end" style={styles.signInContainer}>
            <div className="navbar-item" style={styles.signInContainer}>
              <Link
                className="button is-light"
                to={ROUTES.SIGN_IN}
                style={{ ...styles.signInButton, ...styles.button }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
