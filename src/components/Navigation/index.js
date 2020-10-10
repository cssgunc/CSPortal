import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
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
    marginRight: '12px',
    backgroundColor: colors.black,
    border: 'none',
  },
  burgerLine: {
    width: '20px',
  },
  dropdown: {
    backgroundColor: colors.black,
  },
  menu: {
    padding: '0px 0px 0px 13px',
    backgroundColor: colors.black,
  },
  start: {
    alignItems: 'center',
  },
  lightButton: {
    backgroundColor: colors.lightBlue,
    color: colors.white,
  },
  signInBar: {
    width: '100%',
  },
  signInContainer: {
    marginLeft: 'auto',
    height: '100%',
  },
  signInButton: {
    marginBottom: '0',
    backgroundColor: colors.green,
    color: colors.white,
  },
};

const NavigationAuthYes = () => {
  const [openMenu, setOpenMenu] = useState(false);

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
            onClick={() => setOpenMenu(!openMenu)}
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
          <div className="navbar-start" style={styles.start}>
            <Link className="navbar-item" to={ROUTES.LANDING}>
              Home
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-item" to={ROUTES.LANDING}>
                About Us
              </Link>
              <div className="navbar-dropdown" style={styles.dropdown}>
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
              <div className="navbar-dropdown" style={styles.dropdown}>
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
            {/* <Link className="navbar-item" to={ROUTES.ADMIN}>
              Admin
            </Link> */}
          </div>
          <div className="navbar-end is-active">
            <div className="buttons">
              <Link className="navbar-item" to={ROUTES.REFER}>
                <button
                  className="button is-light"
                  style={styles.lightButton}
                  type="button"
                >
                  Refer
                </button>
              </Link>
              <div className="navbar-item">
                <SignOutButton />
              </div>
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
                style={styles.signInButton}
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
