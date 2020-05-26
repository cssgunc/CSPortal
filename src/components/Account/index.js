import React from 'react';
import {withAuthorization} from '../Session'
 
function Account (props) {
  return (
    <div>
      <section className="section is-white">
        <h1>Account: {props.authUser.email}</h1>
      </section>
    </div>
  );
}

const condition = authUser => authUser != null;
 
export default withAuthorization(condition)(Account);