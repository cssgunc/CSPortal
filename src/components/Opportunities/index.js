import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function Opportunities() {
  return (
    <div>
      <section className="section is-white">
        <Heading>Opportunities</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Opportunities);
