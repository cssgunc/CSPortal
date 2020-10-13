/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';
import colors from '../../constants/RTCColors';

import * as ROUTES from '../../constants/routes';

const SignInPage = () => {
  const styles = {
    form: {
      width: '50%',
      margin: 'auto',
      minWidth: '300px',
      boxShadow: 'none',
    },
    formSection: {
      backgroundColor: colors.white,
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '100%',
      display: 'flex',
    },
  };

  return (
    <section className="section" style={styles.formSection}>
      <div className="card" style={styles.form}>
        <div className="card-content">
          <SignInForm />
          <SignUpLink />
        </div>
      </div>
    </section>
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
        // TODO: delete line above and uncomment these to force email verification
        // if (props.firebase.auth.currentUser.emailVerified) {
        //   props.history.push(ROUTES.LANDING);
        // } else {
        //   props.firebase.doSignOut();
        //   props.history.push(ROUTES.VERIFY);
        // }
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

  const styles = {
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
    link: {
      color: colors.mediumGray,
      textDecoration: 'underline',
    },
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
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
            name="password"
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder="Password"
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
            style={styles.signInButton}
          >
            Sign In
          </button>
        </div>
      </div>

      <Link to={ROUTES.PASSWORD_FORGET} style={styles.link}>
        Forgot password?
      </Link>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
