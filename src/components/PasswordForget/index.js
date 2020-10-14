/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
// import PasswordChange from '../PasswordChange';

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
  button: {
    margin: '0 0 0 10px',
  },
};

const PasswordForgetPage = () => {
  return (
    <div>
      <section className="section is-gray">
        <div className="card" style={styles.form}>
          <div className="card-content">
            <PasswordForgetForm />
          </div>
        </div>
      </section>
    </div>
  );
};

function PasswordForgetFormBase(props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (event) => {
    props.firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail('');
        setError('');
        setSent(true);
      })
      .catch((e) => {
        setError(e);
      });

    event.preventDefault();
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const isInvalid = email === '';

  return (
    <form onSubmit={onSubmit}>
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

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" disabled={isInvalid} type="submit">
            Send Reset Email
          </button>
          {sent ? (
            <button
              className="button is-link"
              style={styles.button}
              onClick={() => props.history.push(ROUTES.SIGN_IN)}
              type="button"
            >
              Sign In
            </button>
          ) : null}
        </div>
      </div>

      {error && <p>{error.message}</p>}

      {sent ? <p>Please check your email!</p> : null}
    </form>
  );
}

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase));

export default PasswordForgetPage;
