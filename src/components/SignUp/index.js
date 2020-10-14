/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
// import axios from 'axios';

import * as ROUTES from '../../constants/routes';

const styles = {
  form: {
    width: '50%',
    margin: 'auto',
    minWidth: '300px',
  },
  link: {
    textAlign: 'center',
  },
};

const SignUpPage = () => {
  return (
    <div>
      <section className="section is-gray">
        <div className="card" style={styles.form}>
          <div className="card-content">
            <SignUpForm />
          </div>
        </div>
      </section>
    </div>
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
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        setUsername('');
        setEmail('');
        setPasswordOne('');
        setPasswordTwo('');
        setError('');
        props.history.push(ROUTES.LANDING);
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
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            name="username"
            value={username}
            onChange={onChangeUsername}
            type="text"
            placeholder="Full Name"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            name="email"
            value={email}
            onChange={onChangeEmail}
            type="text"
            placeholder="Email Address"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            name="passwordOne"
            value={passwordOne}
            onChange={onChangePasswordOne}
            type="password"
            placeholder="Password"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <input
            className="input"
            name="passwordTwo"
            value={passwordTwo}
            onChange={onChangePasswordTwo}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" disabled={isInvalid} type="submit">
            Sign Up
          </button>
        </div>
      </div>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpLink = () => (
  <div style={styles.link}>
    <br />
    Don't have an account? <Link to={ROUTES.CONTACTUS}>Sign Up</Link>
  </div>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
