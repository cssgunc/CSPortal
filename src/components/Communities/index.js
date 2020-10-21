import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function Communities() {
  return (
    <div>
      <section className="section is-white">
        <Heading>Communities</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Communities);
