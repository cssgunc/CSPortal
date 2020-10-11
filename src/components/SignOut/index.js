import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button
    className="button is-light"
    onClick={firebase.doSignOut}
    type="button"
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
