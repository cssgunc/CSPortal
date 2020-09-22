/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { SignUpPasswordResetLink } from '../SignUp';

import * as ROUTES from '../../constants/routes';

const SignInPage = () => {
  const styles = {
    form: {
      width: '50%',
      margin: 'auto',
      minWidth: '300px',
    },
  };

  return (
    <div>
      <section className="section is-gray">
        <div className="card" style={styles.form}>
          <div className="card-content">
            <SignInForm />
            <SignUpPasswordResetLink />
          </div>
        </div>
      </section>
    </div>
  );
};

function SignInFormBase(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError(null);
        props.history.push(ROUTES.LANDING);
      })
      .catch((e) => {
        setError(e);
      });

    event.preventDefault();
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const isInvalid = password === '' || email === '';

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

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            name="password"
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder="Enter Password"
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" disabled={isInvalid} type="submit">
            Sign In
          </button>
        </div>
      </div>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
