import React from 'react';
import { withAuthorization } from '../Session';

function Refer() {
  return (
    <div>
      <section className="section is-white">
        <h1>Referral Portal</h1>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Refer);
