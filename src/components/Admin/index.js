import React from 'react';
import {withAuthorization} from '../Session'
 
function Admin (props) {
  console.log(this.props)
  return (
    <div>
      <section className="section is-white">
        <h1>Admin</h1>
      </section>
    </div>
  );
}

const condition = authUser => authUser != null;

export default withAuthorization(condition)(Admin);