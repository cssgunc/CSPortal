import React from 'react';
import { withFirebase } from '../Firebase';
 
const SignOutButton = ({ firebase }) => (
    <div className="buttons">
      <button className="button is-light" onClick={firebase.doSignOut}> 
        Sign Out
      </button>
    </div>
);
 
export default withFirebase(SignOutButton);