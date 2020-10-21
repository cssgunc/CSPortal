/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const styles = {
  form: {
    width: '50%',
    margin: 'auto',
    minWidth: '300px',
  }
};

const UpdateEmailPage = () => {
  return (
    <div>
      <section className="section is-gray">
        <div className="card" style={styles.form}>
          <div className="card-content">
            <UpdateEmailForm />
          </div>
        </div>
      </section>
    </div>
  );
};

function UpdateEmailFormBase(props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (event) => {
    props.firebase
      .doUpdateEmail(email)
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
        <label className="label">Please enter your new email:</label>
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
            Send Update Email
          </button>
        </div>
      </div>

      {error && <p>{error.message}</p>}

      {sent ? <p>A verification email has been sent to the provided email address. Please verify your email and sign in with your new email.</p> : null}
    </form>
  );
}

const UpdateEmailForm = withRouter(withFirebase(UpdateEmailFormBase));

export default UpdateEmailPage;
