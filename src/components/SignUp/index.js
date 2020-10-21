/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import colors from '../../constants/RTCColors';

import * as ROUTES from '../../constants/routes';

const styles = {
  formContainer: {
    width: '50%',
    margin: 'auto',
    minWidth: '300px',
    boxShadow: 'none',
  },
  formSection: {
    backgroundColor: colors.white,
    width: '100%',
    display: 'flex',
    paddingTop: '100px',
    paddingBottom: '100px',
    overflow: 'auto',
  },
  linkContainer: {
    textAlign: 'center',
    color: colors.mediumGray,
    marginTop: '40px',
  },
  link: {
    color: colors.gray,
    textDecoration: 'underline',
  },
  signUpButton: {
    backgroundColor: colors.lightBlue,
    color: colors.white,
    marginBottom: '10px',
  },
  input: {
    borderRadius: '0px',
    border: 'none',
    boxShadow: 'none',
    borderBottom: `2px solid ${colors.mediumGray}`,
    paddingLeft: '0px',
    marginBottom: '40px',
    marginTop: '0px',
  },
  signInButton: {
    backgroundColor: colors.lightBlue,
    color: colors.white,
    marginBottom: '10px',
  },
  form: {
    maxWidth: '350px',
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
  },
  error: {
    marginTop: '20px',
  },
};

const SignUpPage = () => {
  return (
    <section className="section" style={styles.formSection}>
      <div className="card" style={styles.formContainer}>
        <div className="card-content">
          <SignUpForm />
        </div>
      </div>
    </section>
  );
};

function SignUpFormBase(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    props.firebase
      .doCreateUserWithEmailAndPassword(username, email, passwordOne)
      .then(() => {
        setUsername('');
        setEmail('');
        setPasswordOne('');
        setPasswordTwo('');
        setError('');
        props.history.push(ROUTES.VERIFY);
      })
      .catch((e) => {
        setError(e);
      });

    event.preventDefault();
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePasswordOne = (event) => {
    setPasswordOne(event.target.value);
  };
  const onChangePasswordTwo = (event) => {
    setPasswordTwo(event.target.value);
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            name="username"
            value={username}
            onChange={onChangeUsername}
            type="text"
            placeholder="Full Name"
            style={styles.input}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            name="email"
            value={email}
            onChange={onChangeEmail}
            type="text"
            placeholder="Email Address"
            style={styles.input}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            name="passwordOne"
            value={passwordOne}
            onChange={onChangePasswordOne}
            type="password"
            placeholder="Password"
            style={styles.input}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            name="passwordTwo"
            value={passwordTwo}
            onChange={onChangePasswordTwo}
            type="password"
            placeholder="Confirm Password"
            style={styles.input}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button
            className="button is-link is-fullwidth"
            disabled={isInvalid}
            type="submit"
            style={styles.signUpButton}
          >
            Sign Up
          </button>
        </div>
      </div>
      {error && (
        <article className="message is-warning" style={styles.error}>
          <div className="message-body">{error.message}</div>
        </article>
      )}
    </form>
  );
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpLink = () => (
  <div style={styles.linkContainer}>
    Don't have an account?{' '}
    <Link to={ROUTES.SIGN_UP} style={styles.link}>
      Sign Up
    </Link>
  </div>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
