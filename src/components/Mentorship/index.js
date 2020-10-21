import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function Mentorship() {
  return (
    <div>
      <section className="section is-white">
        <Heading>Mentorship</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Mentorship);
