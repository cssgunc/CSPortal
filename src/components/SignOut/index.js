import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }, props) => {
  const { style } = props;
  return (
    <button
      className="button is-light"
      onClick={firebase.doSignOut}
      type="button"
      style={style}
    >
      Sign Out
    </button>
  );
};

export default withFirebase(SignOutButton);
