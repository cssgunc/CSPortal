import React from 'react';
import { withFirebase } from '../Firebase';

const styles = {
  button: {
    marginBottom: 0,
  },
};

const SignOutButton = ({ firebase }) => (
  <button
    className="button is-light"
    onClick={firebase.doSignOut}
    type="button"
    style={styles.button}
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
